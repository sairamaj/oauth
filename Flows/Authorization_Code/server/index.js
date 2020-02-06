const express = require("express");
const https = require("https");
const querystring = require("querystring");
const debug = require("debug")("main");
const fs = require("fs");
const jwtDecode = require('jwt-decode');

const app = express();
const port = 443;

function post(host, path, data, callback) {
  debug(`host ${host} path ${path}`);
  var options = {
    host: host,
    port: "443",
    path: path,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(data)
    }
  };

  var req = https.request(options, function(res) {
    try {
      debug("waiting for response.");
      res.setEncoding("utf8");
      var responseString = "";

      res.on("data", function(data) {
        responseString += data;
        // save all the data from response
      });
      res.on("end", function() {
        debug(responseString);
        callback(responseString, null);
      });
      res.on("error", e => {
        debug(`error ${e}`);
        callback(null, error);
      });
    } catch (error) {
      debug(`catch ${error}`);
      callback(null, error);
    }
  });

  req.write(data);
  req.end();
}

function processAuthCode(code, state, callback) {
  var tenantId = "4925b807-9380-4135-93cc-9c23aa7c411b";
  var tokenEndpoint = `login.microsoftonline.com`;
  var tokenEndpointPath = `/${tenantId}/oauth2/token`;

  var config = {
    clientId: "23a4b29f-b137-4d05-8479-ca79958ec077",
    clientSecret: "mGUriCicHsF5/4AuKtzIP4xLpv99Zsc/QxFJPVefkz4=",
    redirectUri: "https://techblue.azurewebsites.net/signin-oidc",
    tokenEndpoint: tokenEndpoint,
    tokenEndpointPath: tokenEndpointPath
  };

  var data = querystring.stringify({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uri: config.redirectUri,
    grant_type: "authorization_code",
    code: code,
    state: state
  });

  post(config.tokenEndpoint, config.tokenEndpointPath, data, callback);
}

app.get("/", (req, res) => {
  debug("in get...");
  res.send("Hello World!");
});

app.get("/signin-oidc", (req, res) => {
  debug("in get  signin-oidc");
  var code = req.query.code;
  var state = req.query.state;
  debug(`code ${code} state ${state}`);
  processAuthCode(code, state, (response, err)=>{
    if( err){
      res.send(err)
    }else{
      var info = JSON.parse(response)
      let jwtAccessToken = jwtDecode(info.access_token);
      let jwtIdToken = jwtDecode(info.id_token);
      res.json({
        raw: response,
        accessToken: info.access_token,
        idToken: info.id_token,
        accessTokenDecoded:jwtAccessToken,
        idTokenDecoded: jwtIdToken
      })
      
    }
  });
 // res.send("got in to signon-oidc");
});

https
  .createServer(
    {
      key: fs.readFileSync("localhost.key"),
      cert: fs.readFileSync("localhost.crt")
    },
    app
  )
  .listen(port, function() {
    console.log(`Listening ${port}`);
  });
