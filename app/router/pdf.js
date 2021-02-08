'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { pdf } = controller.api;
  router.get('/api/pdf', pdf.index);
  router.get('/api/pdf/ruici', pdf.ruici);
};
