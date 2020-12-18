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

Please refer to [Ionic documention](https://capacitorjs.com/docs/getting-started/dependencies#android-development)
for requirements.

```shell
$ ionic sync android --prod
```

> TODO flavors should be use for this

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

Please refer to [Ionic documention](https://capacitorjs.com/docs/getting-started/dependencies#ios-development)
for requirements.

```shell
$ ionic sync ios --prod
```

You should then create two new build configurations (one for debug and one for release) for your aircraft identifier.
For those two new configurations:

* add a "normalized" aircraft ID to the bundle identifier, e.g. `it.casaricci.airborne.i8104`
* set a new value to the user-defined variable "APP_DISPLAY_NAME" with your aircraft identifier, e.g. "I-8104"

This way you keep the original "neutral" build configurations untouched
and create new ones for every airacraft you need to manage.
