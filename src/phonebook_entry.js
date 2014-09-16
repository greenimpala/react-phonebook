/**
 * @jsx React.DOM
 */
var React = require("./vendor/react/react-with-addons");

module.exports = React.createClass({
  getInitialState: function () {
    return {
      isEditing: false
    }
  },

  render: function () {
    var name;

    if (this.state.isEditing) {
      name = <span>
        <input ref="edit_name" defaultValue={this.props.entry.name}/>
        <a href="#" onClick={this.saveEdit}> Save</a>
      </span>
    } else {
      name = this.props.entry.name;
    }

    return <tr>
      <td>{name}</td>
      <td>{this.props.entry.number}</td>
      <td>
        <div className="entry_actions">
          <span onClick={this.props.onRemove}> {String.fromCharCode(215)}</span>
          <span onClick={this.edit}> {String.fromCharCode(9998)}</span>
        </div>
      </td>
    </tr>
  },

  saveEdit: function () {
    this.props.entry.name = this.refs.edit_name.getDOMNode().value;
    this.setState({
      isEditing: false
    });
  },

  edit: function () {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }
});
