// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,

    baseUrl: 'http://localhost:4200',
    //apiUrl: "http://localhost:5000/api/v1",
    apiUrl: 'https://api-test3.uexcelerate.app/api/v1',
    chmServiceApiUrl: 'https://api-chm-test.uexcelerate.app',
    envType: 'Staging',

    profilePicPath:
        'https://s3.ap-south-1.amazonaws.com/uex.test.app.images-v1/ProfilePictures/',
    resourcePathUri:
        'https://s3.ap-south-1.amazonaws.com/uex.test.app.resources-v1/',

    googleClientId:
        '285112706432-fftaup2l0b4sqkt0tn9kaced8m8ab0il.apps.googleusercontent.com',
    facebookClientId: '267822810747162',
    linkedInClientId: '779dxsmv7plua7',

    googleApiKey: 'AIzaSyBtpLYK7qs3WTF_XAByV7TUPu3i_wYraYE',
    googleSecreteKey: 'AK3LpKhqaKjTbOExOcnMVxk7',
};

export const fireBaseConfig = {
    apiKey: 'AIzaSyBtpLYK7qs3WTF_XAByV7TUPu3i_wYraYE',
    databaseURL: 'https://test-uexcelerate-app.firebaseio.com',
    authDomain: 'test-uexcelerate-app.firebaseapp.com',
    projectId: 'test-uexcelerate-app',
    storageBucket: 'test-uexcelerate-app.appspot.com',
};
