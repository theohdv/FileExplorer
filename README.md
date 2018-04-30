# FileExplorer
React Native app to navigate into a file tree given by a specific API.

## Getting started

```
git clone git@github.com:theohdv/FileExplorer.git
cd FileExplorer
npm i
cp src/config/config.dist.js src/config/config.js
// Do not forget to add the API url in the config.js file
react-native run-ios // run-android
```

## Struture

### User interface

The application is composed of two screens:

- **NodesScreen**: This screen list all the nodes of a specific path. If the nodes are not cached (redux store), a HTTP request is made to the API to get the nodes of this path. Thereby, nodes are only requested once.
  
- **FileScreen**: This screen enables the user to display the file depending on its mime type. This app has components to open image and audio file. External libraries are used to open the other type of file.

### State management

[Redux](https://redux.js.org/) is used for the state management of this app.

Nodes reducer structure:

```javascript
nodes: {
  "/nodes": {
    // Nodes...
  },
  "/nodes/XXXX": {
    // Nodes...
  },
  ...
}
```

The cache is not persisted. Data are lost when the app is killed.

### Navigation

[React-navigation](https://redux.js.org/) is used to manage the navigation.

Navigation stucture:

```javascript
StackNavigator
        --> NodeScreen
        --> FileScreen
```
