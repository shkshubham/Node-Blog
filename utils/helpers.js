var moment = require('moment');

var Bodyslice = function(value) {
  return value.slice(0,10) + '...';
};

var Titleslice = function(value) {
  return value.slice(0,50) + '...';
};

var ifvalue = function(conditional, options) {
    if (conditional == options.hash.equals) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
};

var datetime = function(date) {
  date = date || moment();
  //return moment(date).format('ddd, DD MMM YYYY HH:mm:ss ZZ');
  return moment(date).format('ddd, DD MMM YYYY | HH:mm');
};

module.exports = {
  Bodyslice,
  Titleslice,
  ifvalue,
  datetime
};
