var moment = require('moment');
var intl_message_format = require('intl-messageformat');

require('moment/locale/es');

var es = require('./es');
var en = require('./en-US');

var MESSAGES = {};
MESSAGES.es = es;
MESSAGES['en-US'] = en;

var locale = localStorage.locale || 'es';

moment.locale(locale);

module.exports = {
  message: function (text, opts) {
      opts = opts || {};
    var msg = new intl_message_format(MESSAGES[locale][text], locale, null);
    return msg.format(opts);
  }
}
