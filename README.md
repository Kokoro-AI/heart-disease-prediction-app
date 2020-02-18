# heart-disease-prediction-app

## Development

Start development environment running

```bash
$ yarn start
# or with npm
$ npm run start
```

Start development environment with docker running

```bash
$ yarn docker:dev
# or with npm
$ npm run docker:dev
```

docker:dev generate a docker image named heart-disease-prediction-app and run it in a container

Run `docker:start` for only start a container without build a new docker image

### Hot Reloading

Hot reloading is enabled by default when the application is running in development mode (`yarn start`). This feature is implemented with webpack's [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement.html) capabilities, where code updates can be injected to the application while it's running, no full reload required. Here's how it works:

For **JavaScript** modules, a code change will trigger the application to re-render from the top of the tree. **Global state is preserved (i.e. redux), but any local component state is reset**. This differs from React Hot Loader, but we've found that performing a full re-render helps avoid subtle bugs caused by RHL patching.

## Production

Generate production files running

```bash
$ yarn build:prod
# or with npm
$ npm run build:prod
```

Generate and serve production files running

```bash
$ yarn serve:prod
# or with npm
$ npm run serve:prod
```

## Project Structure

```
.
├── config                   # Webpack configuration
├── public                   # Static public assets (not imported anywhere in source code)
│   └── index.html           # Main HTML page container for app
├── src                      # Application source code
|   ├── actions              # Redux actions
│   ├── components           # Global Reusable Components
│   ├── containers           # Global Reusable Container Components and pplication Layout in which to render routes
|   ├── reducers             # Reducer registry and injection
│   ├── routes               # Main route definitions and async split points
│   │   └── app.js           # Bootstrap main application routes
|   ├── state                # Store initial state
│   ├── store.js             # Redux-specific pieces
│   ├── styles               # Application-wide styles
|   |   ├── custom           # Custom application styles
|   |   └── semantic-ui      # Semantic-UI theme files
|   ├── i18n.js              # i18n configuration
|   ├── index.js             # Application bootstrap and rendering with store
|   └── store.js             # Create and instrument redux store
├── static                   # Static public assets imported anywhere in source code
└── test                     # Unit tests
```

## Testing

To add a unit test, create a `.test.js` file anywhere inside of `./test`. Jest and webpack will automatically find these files.

