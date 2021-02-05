'use strict';

const Controller = require('egg').Controller;

class PdfController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, pdf';
  }
}

module.exports = PdfController;
