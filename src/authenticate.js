const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
var medium = require("medium-sdk");

let authWindow;

const electronOauth2 = require("electron-oauth2");

var config = {
  clientId: "828df465608a",
  clientSecret: "5b33f2166ddfdd97926776333ff8e6a2ea7c9e36",
  authorizationUrl:
    "https://medium.com/v1/m/oauth/authorize?client_id={{828df465608a}}&scope=basicProfile,publishPost&state={{sampleText2}}&response_type=code&redirect_uri={{http://127.0.0.1}}",
  tokenUrl: "https://api.medium.com/v1/tokens",
  useBasicAuthorizationHeader: false,
  redirectUri: "http://127.0.0.1"
};

function authenticateWindow() {
  const windowParams = {
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    }
  };

  const options = {
    scope: "SCOPE",
    accessType: "ACCESS_TYPE"
  };

  const myApiOauth = electronOauth2(config, windowParams);

  myApiOauth.getAccessToken(options).then(token => {
    // use your token.access_token

    myApiOauth.refreshToken(token.refresh_token).then(newToken => {
      //use your new token
    });
  });
}

// function authenticateWindow() {
//   authWindow = new BrowserWindow({ width: 400, height: 400 });
//   authWindow.loadURL(
//     "https://medium.com/v1/m/oauth/authorize?client_id={{828df465608a}}&scope=basicProfile,publishPost&state={{sampleText2}}&response_type=code&redirect_uri={{http://127.0.0.1}}"
//   );
//   authWindow.on("closed", () => {
//     authWindow = null;
//   });

//   var client = new medium.MediumClient({
//     clientId: "828df465608a",
//     clientSecret: "5b33f2166ddfdd97926776333ff8e6a2ea7c9e36"
//   });

//   var redirectURL = "http://127.0.0.1";

//   var url = client.getAuthorizationUrl("secretState", redirectURL, [
//     medium.Scope.BASIC_PROFILE,
//     medium.Scope.PUBLISH_POST
//   ]);

//   // (Send the user to the authorization URL to obtain an authorization code.)

//   client.exchangeAuthorizationCode(
//     "YOUR_AUTHORIZATION_CODE",
//     redirectURL,
//     function(err, token) {
//       client.getUser(function(err, user) {
//         client.createPost(
//           {
//             userId: user.id,
//             title: "A new post",
//             contentFormat: medium.PostContentFormat.HTML,
//             content: "<h1>A New Post</h1><p>This is my new post.</p>",
//             publishStatus: medium.PostPublishStatus.DRAFT
//           },
//           function(err, post) {
//             console.log(token, user, post);
//           }
//         );
//       });
//     }
//   );
// }
