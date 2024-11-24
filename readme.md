## Initialization Commands

- Create project: `npx create-expo-app -t expo-template-blank`
- Entry project: `cd todo`
- Install libs: `npm install @react-navigation/native, npm install @react-navigation/stack`
- Init project: `npx expo start`
Log in expo: npx expo login
Create build for ios: eas build -p ios (and for this npm install -g eas-cli)
Log again with eas: eas login
Create configuration file: eas build:configure

- Create build: eas build -p ios (to publish) or eas build -p ios --profile development (to test locally) and add ios line:
```json
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {"simulator":"true"}
    },
```