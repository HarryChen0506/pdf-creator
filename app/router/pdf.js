'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { pdf } = controller.api;
  router.get('/api/pdf', pdf.index);
  // router.post('/api/pdf/register', pdf.index);
  // router.post('/api/pdf/login', pdf.index);
};
