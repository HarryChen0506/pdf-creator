'use strict';

module.exports = app => {
  // app.once('server', server => {
  //   // websocket
  // });
  app.on('error', (err, ctx) => {
    // report error
    ctx.body = JSON.stringify({
      code: 9999,
      desc: err.toString().replace('Error: ', ''),
    });
    ctx.status = 500;
    // 统一错误日志记录
    ctx.logger.error(`统一错误日志：发现了错误${err}`);
  });
  // app.on('request', ctx => {
  //   console.log('request', ctx);
  // });
  // app.on('response', ctx => {
  //   const used = Date.now() - ctx.starttime;
  // });
};
