Airborne
========

Minimal aircraft management app for small groups.

## Features

* Aircraft reservations
* Flight logbook
* No back-end required, everything is stored in Google

## Setup

If you haven't done it already, install Ionic CLI first:

```shell
$ npm install -g @ionic/cli
```

Install dependencies:

```shell
$ npm install
```

## Configuration

Copy `src/environments/environment.prod.example.ts` over to `src/environments/environment.prod.ts` and modify it
to your liking. Configuration keys are explained inside.

Copy your Google service account JSON file to `src/assets/data/service_account.json`. The service account should
have access to the Google Sheet and Calendar you provided in the configuration file above.

## Build

The app is designed to have everything inside it for one aircraft only.
So we'll change the app metadata to match your aircraft identifier.
Remember: 1 app = 1 aircraft.

#### For Android

```shell
$ ionic sync android --prod
```

Then create a file `android/environment.gradle` with:

```groovy
ext {
    // insert your full aircraft identification here
    aircraftId = 'I-8104'
    // this will be used to uniquely identify the Android app
    // just the aircraftId, remove the dash and convert it all to lower case
    idSuffix = 'i8104'
}
```

#### For iOS

```shell
$ ionic sync ios --prod
```

Then edit the key `CFBundleDisplayName` in `App/App/Info.plist` with your aircraft identifiier:

```xml
<key>CFBundleDisplayName</key>
<string>I-8104</string>
```

And you should add a suffix to your app bundle identifier.
Just take the aircraft ID and remove the dash then convert everything to lower case:
`it.casaricci.airborne.i8104`
