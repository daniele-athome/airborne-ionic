export const environment = {
    production: true,
    googleApiKey: 'PUT-YOUR-GOOGLE-API-KEY-HERE',
    googleApiServiceAccount: 'PUT-YOUR-SERVICE-ACCOUNT-JSON-ASSET-PATH-HERE',
    events: 'PUT-YOUR-GOOGLE-CALENDAR-ID-HERE',
    aircraft: {
        id: 'PUT-YOUR-AIRCRAFT-IDENTIFICATION-HERE'
    },
    flightlog: {
        spreadsheetId: 'PUT-YOUR-GOOGLE-SPREADSHEET-ID-HERE',
        sheetName: 'PUT-YOUR-GOOGLE-SHEET-NAME-HERE',
    },
    pilots: [
        'Anna',
        'Daniele',
        'Claudio',
        'Marta',
    ],
    noPilotName: '(prove tecniche)',
    fuelPrices: [
        {
            label: 'Scamuffa',
            value: 1.4
        },
        {
            label: 'Certificata',
            value: 2.2
        },
    ],
    location: {
        name: 'Fly Roma',
        // Fly Roma coordinates and height (190 ft)
        latitude: 41.8844253,
        longitude: 12.7143166,
        height: 58
    },
};
