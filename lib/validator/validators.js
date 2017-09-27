var allValidators = require('./notationValidators.js').allValidators;

module.exports = {
  allValidators: allValidators,
  getSchema: function(routeUrl) {
    return allValidators[routeUrl] ? allValidators[routeUrl] : {};
  }
};