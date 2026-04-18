import { Readable } from 'node:stream';
import server from '../dist/server/server.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = new URL(req.url, `${protocol}://${host}`);

    const headers = new Headers();
    for (let key in req.headers) {
      if (req.headers[key]) {
        if (Array.isArray(req.headers[key])) {
          req.headers[key].forEach(v => headers.append(key, v));
        } else {
          headers.set(key, req.headers[key]);
        }
      }
    }

    const init = {
      method: req.method,
      headers,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      init.body = Readable.toWeb(req);
      init.duplex = 'half';
    }

    const request = new Request(url, init);
    const response = await server.fetch(request);

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.statusCode = response.status;

    if (response.body) {
      Readable.fromWeb(response.body).pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
