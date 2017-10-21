import Koa from 'koa';
import koaStatic from 'koa-static';
import KoaRouter from 'koa-router';
import Transcoder from 'stream-transcoder';
import fs from 'fs';
import Library from './models/Library';
import File from './models/File';

const app = new Koa();
const router =  new KoaRouter();

router.get('/api/test', async (ctx) => {
  ctx.body = {
    message: 'Api test works! It Does!'
  };
});

router.get('/music/:id', async (ctx) => {
  let filename = "/mnt/c/Users/Robert/Music/Pentatonix/2015 - Pentatonix/20 Pentatonix - Pentatonix [2015] - Aha!.flac";
  let coder = new Transcoder(filename)
      .format('webm');
  let stat = fs.statSync(filename);
  let mimeType = 'audio/webm';

  let opts = {}, res = 200;

  let resHeaders = {
    'Content-Type': mimeType,
    'Content-Length': stat.size,
    'Accept-Ranges': 'bytes'
  };
  
  if (ctx.headers['range']) {
    let [b, range] = ctx.headers['range'].split('=');
    console.log(b, range);
    if (b === 'bytes') {
      let [start, end] = range.split('-');

      if (!end || end === '' || end < start)
        end = coder.size - 1;

      opts = {
        start: start - 0,
        end: end - 0
      };

      coder.custom('ss', start)

      res = 206;
      resHeaders['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
      resHeaders['Content-Length'] = end - start + 1;
    }
  }

  ctx.body = coder.stream();
  ctx.type = 'audio/webm';
  ctx.set('Accept-Ranges', 'bytes')
});

app.use(router.routes());
app.use(koaStatic('./build'));

const port = 4000;

app.listen(port, () => {
  console.log(`Service started on port ${port}`);
});