import express from 'express';
import fs from 'fs-extra';
import Log from 'log';
import morgan from 'morgan';
import path from 'path';
import http from 'http';
import https from 'https';


const DEFAULT_LOG_NAME = 'static-server.txt';

export default class StaticServerLauncher {
  onPrepare({
    staticServerFolders: folders,
    staticServerLog: logging = false,
    staticServerPort: port = 4567,
    staticServerMiddleware: middleware = []
  }) {
    if (!folders) {
      return Promise.resolve();
    }

    this.server = express();
    this.folders = folders;
    this.port = port;

    if (logging) {
      let stream;
      if (typeof logging === 'string') {
        const file = path.join(logging, DEFAULT_LOG_NAME);
        fs.createFileSync(file);
        stream = fs.createWriteStream(file);
      }
      this.log = new Log('debug', stream);
      this.server.use(morgan('tiny', { stream }));
    } else {
      this.log = new Log('emergency');
    }

    (Array.isArray(folders) ? folders : [ folders ]).forEach((folder) => {
      this.log.debug('Mounting folder `%s` at `%s`', path.resolve(folder.path), folder.mount);
      this.server.use(folder.mount, express.static(folder.path));
    });

    middleware.forEach((ware) => {
      this.server.use(ware.mount, ware.middleware);
    });

    return new Promise((resolve, reject) => {
      http.createServer(this.server).listen(4566, (err) => {
        if (err) {
          reject(err);
        }

        this.log.info(`Static server running at https://localhost:4566`);
      });

      https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
      }, this.server).listen(this.port, (err) => {
        if (err) {
          reject(err);
        }

        this.log.info(`Static secure server running at https://localhost:${port}`);
        resolve();
      });
    });
  }

}
