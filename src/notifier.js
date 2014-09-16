/**
 * @jsx React.DOM
 */
var React = require("./vendor/react/react-with-addons");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var NOTIFIER_TYPES = {
  ERROR: 0,
  SUCCESS: 1,
  INFO: 2
};

var Notifier = React.createClass({
  _timeoutNotifications: function () {
    this.props.notifications.forEach(function (notification) {
      if ("timeout" in notification) {
        this._timeoutNotification(notification);
      }
    }, this);
  },

  _timeoutNotification: function (notification) {
    var timeout = typeof notification.timeout === "number" ? notification.timeout : 5000;

    setTimeout(function () {
      var index = this.props.notifications.indexOf(notification);

      if (index < 0) {
        return;
      }

      this.props.notifications.splice(index, 1);
      this.forceUpdate();
    }.bind(this), timeout);
  },

  render: function () {
    var notifications = this.props.notifications.map(function (notification) {
      var className;

      switch (notification.type) {
        case NOTIFIER_TYPES.ERROR: className = "alert"; break;
        case NOTIFIER_TYPES.SUCCESS: className = "success"; break;
        case NOTIFIER_TYPES.INFO: className = "info"; break;
        default: throw new Error('Invalid notification type');
      }

      var classList = 'alert-box ' + className;

      return <div data-alert className={classList}>{notification.message}</div>
    });

    this._timeoutNotifications();

    return <ReactCSSTransitionGroup transitionName="fader">
      {notifications}
    </ReactCSSTransitionGroup>
  }
});

Object.keys(NOTIFIER_TYPES).forEach(function (type) {
  Notifier[type] = NOTIFIER_TYPES[type];
});

module.exports = Notifier;
