/* eslint-disable */
require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _express = __webpack_require__(1);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _fsExtra = __webpack_require__(2);
	
	var _fsExtra2 = _interopRequireDefault(_fsExtra);
	
	var _log = __webpack_require__(3);
	
	var _log2 = _interopRequireDefault(_log);
	
	var _morgan = __webpack_require__(4);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _path = __webpack_require__(5);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _http = __webpack_require__(6);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _https = __webpack_require__(7);
	
	var _https2 = _interopRequireDefault(_https);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DEFAULT_LOG_NAME = 'static-server.txt';
	
	var StaticServerLauncher = function () {
	  function StaticServerLauncher() {
	    _classCallCheck(this, StaticServerLauncher);
	  }
	
	  _createClass(StaticServerLauncher, [{
	    key: 'onPrepare',
	    value: function onPrepare(_ref) {
	      var _this = this;
	
	      var folders = _ref.staticServerFolders,
	          _ref$staticServerLog = _ref.staticServerLog,
	          logging = _ref$staticServerLog === undefined ? false : _ref$staticServerLog,
	          _ref$staticServerPort = _ref.staticServerPort,
	          port = _ref$staticServerPort === undefined ? 4567 : _ref$staticServerPort,
	          _ref$staticServerMidd = _ref.staticServerMiddleware,
	          middleware = _ref$staticServerMidd === undefined ? [] : _ref$staticServerMidd;
	
	      if (!folders) {
	        return Promise.resolve();
	      }
	
	      this.server = (0, _express2.default)();
	      this.folders = folders;
	      this.port = port;
	
	      if (logging) {
	        var stream = void 0;
	        if (typeof logging === 'string') {
	          var file = _path2.default.join(logging, DEFAULT_LOG_NAME);
	          _fsExtra2.default.createFileSync(file);
	          stream = _fsExtra2.default.createWriteStream(file);
	        }
	        this.log = new _log2.default('debug', stream);
	        this.server.use((0, _morgan2.default)('tiny', { stream: stream }));
	      } else {
	        this.log = new _log2.default('emergency');
	      }
	
	      (Array.isArray(folders) ? folders : [folders]).forEach(function (folder) {
	        _this.log.debug('Mounting folder `%s` at `%s`', _path2.default.resolve(folder.path), folder.mount);
	        _this.server.use(folder.mount, _express2.default.static(folder.path));
	      });
	
	      middleware.forEach(function (ware) {
	        _this.server.use(ware.mount, ware.middleware);
	      });
	
	      return new Promise(function (resolve, reject) {
	        _http2.default.createServer(_this.server).listen(4566, function (err) {
	          if (err) {
	            reject(err);
	          }
	
	          _this.log.info('Static server running at https://localhost:4566');
	        });
	
	        _https2.default.createServer({
	          key: _fsExtra2.default.readFileSync('key.pem'),
	          cert: _fsExtra2.default.readFileSync('cert.pem')
	        }, _this.server).listen(_this.port, function (err) {
	          if (err) {
	            reject(err);
	          }
	
	          _this.log.info('Static secure server running at https://localhost:' + port);
	          resolve();
	        });
	      });
	    }
	  }]);
	
	  return StaticServerLauncher;
	}();
	
	exports.default = StaticServerLauncher;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("fs-extra");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("log");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("morgan");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("http");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("https");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTdhODRkMzAyMDA1YTQyMmExZTUiLCJ3ZWJwYWNrOi8vLy4vbGF1bmNoZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzLWV4dHJhXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibG9nXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9yZ2FuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwc1wiIl0sIm5hbWVzIjpbIkRFRkFVTFRfTE9HX05BTUUiLCJTdGF0aWNTZXJ2ZXJMYXVuY2hlciIsImZvbGRlcnMiLCJzdGF0aWNTZXJ2ZXJGb2xkZXJzIiwic3RhdGljU2VydmVyTG9nIiwibG9nZ2luZyIsInN0YXRpY1NlcnZlclBvcnQiLCJwb3J0Iiwic3RhdGljU2VydmVyTWlkZGxld2FyZSIsIm1pZGRsZXdhcmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNlcnZlciIsInN0cmVhbSIsImZpbGUiLCJqb2luIiwiY3JlYXRlRmlsZVN5bmMiLCJjcmVhdGVXcml0ZVN0cmVhbSIsImxvZyIsInVzZSIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJmb2xkZXIiLCJkZWJ1ZyIsInBhdGgiLCJtb3VudCIsInN0YXRpYyIsIndhcmUiLCJyZWplY3QiLCJjcmVhdGVTZXJ2ZXIiLCJsaXN0ZW4iLCJlcnIiLCJpbmZvIiwia2V5IiwicmVhZEZpbGVTeW5jIiwiY2VydCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FB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O0FBQ0QsVUFWRDtBQVdELFFBcEJNLENBQVA7QUFxQkQ7Ozs7OzttQkExRGtCVixvQjs7Ozs7O0FDWHJCLHFDOzs7Ozs7QUNBQSxzQzs7Ozs7O0FDQUEsaUM7Ozs7OztBQ0FBLG9DOzs7Ozs7QUNBQSxrQzs7Ozs7O0FDQUEsa0M7Ozs7OztBQ0FBLG1DIiwiZmlsZSI6ImxhdW5jaGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTdhODRkMzAyMDA1YTQyMmExZTUiLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgTG9nIGZyb20gJ2xvZyc7XG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IGh0dHBzIGZyb20gJ2h0dHBzJztcblxuXG5jb25zdCBERUZBVUxUX0xPR19OQU1FID0gJ3N0YXRpYy1zZXJ2ZXIudHh0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGljU2VydmVyTGF1bmNoZXIge1xuICBvblByZXBhcmUoe1xuICAgIHN0YXRpY1NlcnZlckZvbGRlcnM6IGZvbGRlcnMsXG4gICAgc3RhdGljU2VydmVyTG9nOiBsb2dnaW5nID0gZmFsc2UsXG4gICAgc3RhdGljU2VydmVyUG9ydDogcG9ydCA9IDQ1NjcsXG4gICAgc3RhdGljU2VydmVyTWlkZGxld2FyZTogbWlkZGxld2FyZSA9IFtdXG4gIH0pIHtcbiAgICBpZiAoIWZvbGRlcnMpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlcnZlciA9IGV4cHJlc3MoKTtcbiAgICB0aGlzLmZvbGRlcnMgPSBmb2xkZXJzO1xuICAgIHRoaXMucG9ydCA9IHBvcnQ7XG5cbiAgICBpZiAobG9nZ2luZykge1xuICAgICAgbGV0IHN0cmVhbTtcbiAgICAgIGlmICh0eXBlb2YgbG9nZ2luZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgZmlsZSA9IHBhdGguam9pbihsb2dnaW5nLCBERUZBVUxUX0xPR19OQU1FKTtcbiAgICAgICAgZnMuY3JlYXRlRmlsZVN5bmMoZmlsZSk7XG4gICAgICAgIHN0cmVhbSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGZpbGUpO1xuICAgICAgfVxuICAgICAgdGhpcy5sb2cgPSBuZXcgTG9nKCdkZWJ1ZycsIHN0cmVhbSk7XG4gICAgICB0aGlzLnNlcnZlci51c2UobW9yZ2FuKCd0aW55JywgeyBzdHJlYW0gfSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvZyA9IG5ldyBMb2coJ2VtZXJnZW5jeScpO1xuICAgIH1cblxuICAgIChBcnJheS5pc0FycmF5KGZvbGRlcnMpID8gZm9sZGVycyA6IFsgZm9sZGVycyBdKS5mb3JFYWNoKChmb2xkZXIpID0+IHtcbiAgICAgIHRoaXMubG9nLmRlYnVnKCdNb3VudGluZyBmb2xkZXIgYCVzYCBhdCBgJXNgJywgcGF0aC5yZXNvbHZlKGZvbGRlci5wYXRoKSwgZm9sZGVyLm1vdW50KTtcbiAgICAgIHRoaXMuc2VydmVyLnVzZShmb2xkZXIubW91bnQsIGV4cHJlc3Muc3RhdGljKGZvbGRlci5wYXRoKSk7XG4gICAgfSk7XG5cbiAgICBtaWRkbGV3YXJlLmZvckVhY2goKHdhcmUpID0+IHtcbiAgICAgIHRoaXMuc2VydmVyLnVzZSh3YXJlLm1vdW50LCB3YXJlLm1pZGRsZXdhcmUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGh0dHAuY3JlYXRlU2VydmVyKHRoaXMuc2VydmVyKS5saXN0ZW4oNDU2NiwgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvZy5pbmZvKGBTdGF0aWMgc2VydmVyIHJ1bm5pbmcgYXQgaHR0cHM6Ly9sb2NhbGhvc3Q6NDU2NmApO1xuICAgICAgfSk7XG5cbiAgICAgIGh0dHBzLmNyZWF0ZVNlcnZlcih7XG4gICAgICAgIGtleTogZnMucmVhZEZpbGVTeW5jKCdrZXkucGVtJyksXG4gICAgICAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYygnY2VydC5wZW0nKVxuICAgICAgfSwgdGhpcy5zZXJ2ZXIpLmxpc3Rlbih0aGlzLnBvcnQsIChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgU3RhdGljIHNlY3VyZSBzZXJ2ZXIgcnVubmluZyBhdCBodHRwczovL2xvY2FsaG9zdDoke3BvcnR9YCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xhdW5jaGVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3NcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmcy1leHRyYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzLWV4dHJhXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9nXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibG9nXCJcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9yZ2FuXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9yZ2FuXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaHR0cFwiXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaHR0cHNcIlxuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9
