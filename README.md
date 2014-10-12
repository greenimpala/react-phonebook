## react-phonebook

* Simple phonebook example using pure React.js with JSX.
* Local storage for persistence between refreshes.
* `browserify` and `lessc` for basic build process.

## Building

`npm` and `node` are required. Install dependencies with:

```
./bin/install
```

Then compile the source:

```
./bin/build
```

Open `index.html` in a browser using a web server.

### Options

`--min` when building to use an uglify transform.

```
./bin/build --min
```

`--watch` when building to watch src files and rebuild automatically on change.

```
./bin/build --watch -v
```
