var Storage = require('./storage');
var storeMethodsToFireListenersFor = ['add', 'remove', 'update'];

module.exports = function () {
	this._storage = new Storage();
	this._changeListeners = [];

	storeMethodsToFireListenersFor.forEach(function (methodName) {
		this[methodName] = function () {
			this._storage[methodName].apply(this._storage, arguments);
			this._callListeners();
		};
	}, this);
}

module.exports.prototype = {
	addChangeListener: function (listener) {
		this._changeListeners.push(listener);
	},

	_callListeners: function () {
		this._changeListeners.forEach(function (fn) {
			fn();
		});
	},

	get: function () {
		return this._storage.get.apply(this._storage, arguments);
	}
}
