var fs = require('fs');

/**
 * load routes
 * all routes are loaded from services folder.
 * Each service folder contains router.js file.
 *
 * __dirname/services/FOO/router.js
 *
 * This is a convention and MUST be followed
 *
 * All loaded routes have a service directory name as a prefix
 *
 * http://<host>:<port>/service_dir_name/route_name
 */
exports.load = function (app, callback) {
  fs.readdirSync(__dirname + '/services/').forEach(function (dir, index, list) {
    var name = dir.match(/module_(.*)/)[1];
    fs.exists(__dirname + '/services/' + dir + '/router.js', function (exists) {
      if (exists) {
        logger.info('loaded route for ', dir);
        var routes = require(__dirname + '/services/' + dir + '/router.js');
        //remove module from prefix and use text after as a route part
        //ie if we have module_name only 'name' part	will be used
        app.use('/' + name, routes);

      } else {
        logger.info('not found route for ', dir);
      }
      if (index == list.length - 1) {
        callback();
      }
    });
  });
};