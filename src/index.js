/**
 * @jsx React.DOM
 */
var React = require("./vendor/react/react-with-addons");
var PhoneBook = require("./phonebook");
var PhoneBookModel = require('./models/phonebook_model');

var phoneBookModel = new PhoneBookModel();

hydrateForDemo();

React.renderComponent(
  <PhoneBook phoneBookModel={phoneBookModel}/>,
  document.body
);

function hydrateForDemo() {
	if (phoneBookModel.get().length === 0) {
		phoneBookModel.add([{
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
