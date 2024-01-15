This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

> Please note that the project is only configured for Android (on Windows) (since I don't have a personal MacBook at the moment)

#### Before running, please follow these instructions:
1. Clone the project
2. Place `.env` file on the project root.
3. Place `google-services.json` on `android/app/`
4. Run `npm i` command on the project root.
5. Run `npm run start` command on the project root, and after starting the Metro bundler, press `a` to run project on Android.

#### Project structure
```
├───assets
│   ├───fonts
│   ├───locales
│   └───svg
├───components
│   ├───button
│   ├───drawerContent
│   ├───emptyData
│   ├───header
│   ├───input
│   ├───listLoader
│   ├───organizerList
│   ├───photoListWithData
│   ├───photoSlider
│   ├───profileForm
│   ├───profilePicturePicker
│   ├───tabBar
│   ├───toast
│   └───userDataTile
├───constants
├───context
├───helpers
├───hooks
│   └───api
├───navigation
├───screens
│   ├───comments
│   ├───editProfile
│   ├───home
│   ├───login
│   ├───personalInfo
│   ├───posts
│   ├───profile
│   ├───signup
│   └───welcome
└───services
    ├───api
    ├───firebase
    └───permission
```
