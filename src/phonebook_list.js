/**
 * @jsx React.DOM
 */
var React = require("./vendor/react/react-with-addons");
var PhoneBookEntry = require("./phonebook_entry");
var TextInput = require("./text_input");
var Notifier = require("./notifier");

module.exports = React.createClass({
  getInitialState: function () {
    return {
      searchResultEntries: null
    }
  },

  componentWillReceiveProps: function (newProps) {
    this._setSearchState(newProps);
  },

  render: function () {
    entries = this.state.searchResultEntries || this.props.phoneBookModel.get();

    var renderedEntries = entries.map(function (entry) {
      return <PhoneBookEntry
        entry={entry}
        key={entry.id}
        onRemove={this.removeEntry.bind(null,entry.id)}
        onEdit={this.editEntry.bind(null, entry.id)}/>
    }, this);

    return <div>
      <input ref="search" type="text" placeholder="Search" onChange={this.onSearchChange}/>
      <table>
        <thead>
          <th width="400">Name</th>
          <th width="400">Number</th>
          <th width="200">Actions</th>
        </thead>
        <tbody>
        {renderedEntries}
        </tbody>
      </table>
    </div>
  },

  onSearchChange: function (e) {
    this._setSearchState(this.props);
  },

  _setSearchState: function (props) {
    var query = this.refs.search.getDOMNode().value.toLowerCase();
    var searchResults = [];

    if (!query) {
      return this.setState({searchResultEntries: null});
    }

    props.phoneBookModel.get().forEach(function (entry) {
      if (~entry.name.toLowerCase().indexOf(query) || ~entry.number.indexOf(query)) {
        searchResults.push(entry);
      }
    }, this);

    this.setState({
      searchResultEntries: searchResults
    });
  },

  removeEntry: function (id) {
    this.props.phoneBookModel.remove(id);
  },

  editEntry: function (id, entry) {
    this.props.phoneBookModel.update(id, entry);
  }
});
