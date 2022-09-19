# supermoms-pretest
Supermoms pretest converting words and download csv
This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

Below you'll find information about performing common tasks. The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

## react-native-dotenv

Let you `import` environment variables from a **.env** file in React Native, **don't** need any native code integration.

### Usage

Add your app configuration in an **.env** file.

```
API_KEY=lorem
ANOTHER_CONFIG=foobar
```

Now you can import it in your **.js** file.

```js
import { API_KEY, ANOTHER_CONFIG } from 'react-native-dotenv'

ApiClient.init(API_KEY, ANOTHER_CONFIG)
```

### How does it work?

As you can see, it's implemented as a babel plugin. All referenced imported members are replaced as the values specified in the **.env** file.

The example above will get compiled as below.

```js

ApiClient.init('lorem', 'foobar')
```


## FileSystem

`expo-file-system` provides access to a file system stored locally on the device.

Within Expo Go, each project has a separate file system and has no access to the file system of other Expo projects.

However, it can save content shared by other projects to the local filesystem, as well as share local files with other projects. It is also capable of uploading and downloading files from network URLs.


## DropBox API v2

The [Dropbox API](https://www.dropbox.com/developers/documentation/http/documentation) allows developers to work with files in Dropbox, including advanced functionality like full-text search, thumbnails, and sharing.
The Dropbox API explorer is the easiest way to get started making API calls.
