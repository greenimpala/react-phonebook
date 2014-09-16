/**
 * @jsx React.DOM
 */
var React = require("./vendor/react/react-with-addons");
var PhoneBookEntry = require("./phonebook_entry");
var PhoneBookList = require("./phonebook_list");
var TextInput = require("./text_input");
var Notifier = require("./notifier");

module.exports = React.createClass({
  getInitialState: function () {
    return {
      notifications: [],
      form: {
        name: "",
        number: "",
      }
    }
  },

  render: function () {
    var formFields = ["name", "number"].map(function (field) {
      return <TextInput label={field} onChange={this.updateFormProp.bind(null, field)}/>
    }, this);

    if (this.state.success) {
      var successes = <div data-alert className="alert-box success">Entry added</div>
    }

    return <div>
      <h1>react-phonebook</h1>
      <Notifier notifications={this.state.notifications}/>
      <form>
        {formFields}
        <input value="Add Entry" className="button" type="submit" onClick={this.addEntry}></input>
        <a href="#" className="button alert" onClick={this.removeAllEntries}>Reset</a>
      </form>
      <br/>
      <PhoneBookList phoneBookEntries={this.props.phoneBookEntries.get()} removeEntry={this.removeEntry}/>
    </div>
  },

  updateFormProp: function (prop, value) {
    this.state.form[prop] = value;
  },

  removeAllEntries: function () {
    this.props.phoneBookEntries.remove();
    this.forceUpdate();
  },

  removeEntry: function (id) {
    this.props.phoneBookEntries.remove(id);
    this.forceUpdate();
  },

  addEntry: function (e) {
    this.state.notifications = [];
    e.preventDefault();

    var hasErrors;
    var entry = {
      name: this.state.form.name,
      number: this.state.form.number
    };

    Object.keys(entry).forEach(function (prop) {
      if (!entry[prop]) {
        hasErrors = true;
        this.state.notifications.push({
          type: Notifier.ERROR,
          message: "Please enter a valid " + prop
        });
      }
    }, this);

    if (!hasErrors) {
      this.state.notifications.push({
        type: Notifier.SUCCESS,
        timeout: true,
        message: "Entry added successfully"
      });
      this.props.phoneBookEntries.add(entry);
    }

    this.forceUpdate();
  }
});
