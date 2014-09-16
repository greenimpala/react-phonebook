/**
 * @jsx React.DOM
 */
var React = require("./vendor/react/react-with-addons");
var textUtils = require("./text_utils");

module.exports = React.createClass({
  render: function () {
    var label = textUtils.capitalise(this.props.label);
    return <label>{label}
        <input type="text" onChange={this.onChange} placeholder={label}></input>
      </label>
  },

  onChange: function (event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }
});
