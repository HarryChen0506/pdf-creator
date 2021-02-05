'use strict';

const webRouter = require('./router/web');
const pdfRouter = require('./router/pdf');


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  pdfRouter(app);
  webRouter(app);
};
