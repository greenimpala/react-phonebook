/**
 * @jsx React.DOM
 */
var React = require("./vendor/react/react-with-addons");
var PhoneBook = require("./phonebook");
var Storage = require('./storage');

var phoneBookEntries = new Storage();

hydrateForDemo();

React.renderComponent(
  <PhoneBook phoneBookEntries={phoneBookEntries}/>,
  document.body
);

function hydrateForDemo() {
	if (phoneBookEntries.get().length === 0) {
		phoneBookEntries.add([{
				name: "Dave",
				number: "415 599 2671"
			},
			{
				name: "Sarah",
				number: "326 433 3715"
			},
			{
				name: "Jess",
				number: "937 382 6933"
			}
		]);
	}
}
