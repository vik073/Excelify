// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --configuration=staging` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: "https://test3.uexcelerate.app",
  apiUrl: "https://api-test3.uexcelerate.app/api/v1",
  chmServiceApiUrl: "https://api-chm-test.uexcelerate.app",
  envType: "Staging",
  //profilePicPath: "https://test.uexcelerate.app/uploads/ProfilePictures/",
  profilePicPath:
    "https://s3.ap-south-1.amazonaws.com/uex.test.app.images-v1/ProfilePictures/",
  resourcePathUri:
    "https://s3.ap-south-1.amazonaws.com/uex.test.app.resources-v1/",

  googleClientId:
    "285112706432-fftaup2l0b4sqkt0tn9kaced8m8ab0il.apps.googleusercontent.com",
  facebookClientId: "267822810747162",
  linkedInClientId: "779dxsmv7plua7",
  //linkedInClientId: "81a66wgezi8ywd",

  googleApiKey: "AIzaSyBtpLYK7qs3WTF_XAByV7TUPu3i_wYraYE",
  googleSecreteKey: "AK3LpKhqaKjTbOExOcnMVxk7",
};

export const fireBaseConfig = {
  apiKey: "AIzaSyBtpLYK7qs3WTF_XAByV7TUPu3i_wYraYE",
  authDomain: "test-uexcelerate-app.firebaseapp.com",
  databaseURL: "https://test-uexcelerate-app.firebaseio.com",
  projectId: "test-uexcelerate-app",
  storageBucket: "test-uexcelerate-app.appspot.com",
  messagingSenderId: "285112706432",
  appId: "1:285112706432:web:dacfad82ad5eade0b94d65",
  measurementId: "G-3TKZG3KSR8",
};
