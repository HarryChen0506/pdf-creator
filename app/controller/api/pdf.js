'use strict';
/* eslint-disable */
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');

const Controller = require('egg').Controller;
const url = 'http://localhost:8001/login';
const url_1 = 'http://localhost:8001/core/manage?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJiOGY2NDIxOS1iOTA1LTRiZDEtOTUwMi05ZThhZWY5OTQ1YjciLCJpYXQiOiIxNjEyNTE1MjQ1IiwiaXNzIjoicmV0aW5hLXBsYXRmb3JtLnZveGVsY2xvdWQubmV0LmNuIiwiYXVkIjoidm94Y2VsY2xvdWQiLCJ1aWQiOiI1NCJ9.xKnUufpMhT3zG1M4FTIY-oyDr7am3dJ707_LhX0zDtc';
// const url_2 = 'https://lnma.voxelcloud.net.cn/dashboard?token=0XZzxWYmBiOiUGdhR3cf5Wan9GbiACLzEzN1ETNyEjNxAiOiAXbhR3cl1Wa0JCIsIyMyEjbp1GZhJCI6ICZy92dzNXYwJCIsIibp1GZhJCI6ISZtFmbyV2c1Jye';
function bytesToBinary(ab) {
  var buf = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
}

class PdfController extends Controller {
  async index() {
    const { ctx } = this;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle0' });
    const coverBuffer = await page.pdf({
      format: 'A4', printBackground: true,
      '-webkit-print-color-adjust': 'exact',
    });

    await page.goto(url_1, { waitUntil: 'networkidle0' });
    const mainBuffer = await page.pdf({
      format: 'A4', printBackground: true,
      '-webkit-print-color-adjust': 'exact',
    });

    const pdfDoc = await PDFDocument.create();
    const coverDoc = await PDFDocument.load(coverBuffer);
    const [coverPage] = await pdfDoc.copyPages(coverDoc, [0]);
    pdfDoc.addPage(coverPage);

    const mainDoc = await PDFDocument.load(mainBuffer);
    for (let i = 0; i < mainDoc.getPageCount(); i++) {
      const [aMainPage] = await pdfDoc.copyPages(mainDoc, [i]);
      pdfDoc.addPage(aMainPage);
    }
    const pdfBytes = await pdfDoc.save();

    ctx.response.set({
      'Content-Type': 'application/pdf',
    });
    ctx.response.body = bytesToBinary(pdfBytes)

    await browser.close();
  }
}

module.exports = PdfController;
