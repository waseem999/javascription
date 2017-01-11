'use strict';

const jsdom = require('jsdom').jsdom;

function jsdomSetup(html = '') {
  const document = global.document = jsdom(html);
  const window = global.window = document.defaultView;
  Object.keys(document.defaultView).forEach(property => {
    if (typeof global[property] === 'undefined') {
      global[property] = document.defaultView[property];
    }
  });

  const navigator = global.navigator = {
    userAgent: 'node.js'
  };

  return {
    document,
    window,
    navigator
  };
}

module.exports = jsdomSetup;
