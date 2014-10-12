var _ = require('../vendor/lodash/dist/lodash');

var ID_START = 1;

var Storage = function () {
	this._hydrate();
};

Storage.prototype = {
	add: function (entries) {
		if (!(entries instanceof Array)) {
			entries = [entries];
		}

		entries.forEach(function (entry) {
			entry.id = entry.id || this._nextId++;
			this._store.push(entry);
		}, this)

		this._sync();
	},

	get: function (id) {
		if (id) {
			for (var i = this._store.length - 1; i >= 0; i--) {
				if (this._store[i].id === id) {
					return this._store[i];
				}
			};
		} else {
			return this._store;
		}
	},

	remove: function (id) {
		if (!id) {
			this._store = [];
			this._sync();
			return;
		}

		var index = this._store.indexOf(this.get(id));

		if (index > -1) {
			this._store.splice(index, 1);
			this._sync();
		}
	},

	update: function (id, entry) {
		for (var i = this._store.length - 1; i >= 0; i--) {
			if (this._store[i].id === id) {
				this._store[i] = _.merge(this._store[i], entry);
				this._sync();
				return entry;
			}
		};
	},

	_hydrate: function () {
		var entries = sessionStorage.getItem("entries")
		var nextId = sessionStorage.getItem("nextId");

		this._store = JSON.parse(entries) || [];
		this._nextId = parseInt(nextId) || ID_START;
	},

	_sync: function () {
		sessionStorage.setItem("nextId", this._nextId);
		sessionStorage.setItem("entries", JSON.stringify(this._store));
	}
}

module.exports = Storage;
