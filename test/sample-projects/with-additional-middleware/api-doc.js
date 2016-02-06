// args.apiDoc needs to be a js object.  This file could be a json file, but we can't add
// comments in json files.
module.exports = {
  'x-express-openapi-additional-middleware': [/* generate a warning */ null,
  function(req, res, next) {
    // assure ordering of middleware is preserved
    req.apiDocAdded = false;
    next();
  },
  function(req, res, next) {
    req.orderingApiDoc = 'apiDoc';
    req.apiDocAdded = true;
    next();
  }],

  swagger: '2.0',

  // all routes will now have /v3 prefixed.
  basePath: '/v3',

  info: {
    title: 'express-openapi sample project',
    version: '3.0.0'
  },

  definitions: {},

  // paths are derived from args.routes.  These are filled in by fs-routes.
  paths: {
    '/users/{id}': {
      'x-express-openapi-additional-middleware': [
        function(req, res, next) {
          req.pathDocAdded = false;
          req.orderingApiDoc = 'pathDoc';
          next();
        },
        function(req, res, next) {
        req.pathDocAdded = true;
        next();
      }]
    }
  },

  tags: [
    {name: 'users'}
  ]
};
