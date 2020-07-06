const {
  ClientCredentials,
  ResourceOwnerPassword,
  AuthorizationCode,
} = require("simple-oauth2");

const express = require("express");
const querystring = require("querystring");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());

const port = process.env.PORT || 3000;
const CLIENT_ID = "c22ce62fd8f6467bb9656f2fa971ac35";
const CLIENT_SECRET = "u0BVI5CiExd6JZ7FeUxO0K77N5tu1ib6";
const REDIRECT_URI = "https://redirect-tdj-test-l.azurewebsites.net/redirect";
const TOKEN_URI = "https://us.battle.net/oauth/token";

const config = {
  client: {
    id: CLIENT_ID,
    secret: CLIENT_SECRET,
  },
  auth: {
    tokenHost: TOKEN_URI,
  },
};

app.get("/redirect", (req, response) => {
  axios({
    method: "post",
    url: TOKEN_URI,
    params: {
      code: req.query.code,
      grant_type: "authorization_code",
      scope: "wow.profile",
      redirect_uri: REDIRECT_URI,
      //   redirect_uri: "http://10.0.2.2:3000/redirect",
      // redirect_uri: "exp://192.168.1.4:19000/"
    },
    auth: {
      username: CLIENT_ID,
      password: CLIENT_SECRET,
    },
  })
    .then((res) => {
      const query = querystring.stringify(res.data);
      response.status(301).redirect(`exp://192.168.1.4:19000/?${query}`);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/token", async (req, response) => {
  axios({
    method: "post",
    url: TOKEN_URI,
    params: {
      code: req.query.code,
      grant_type: "authorization_code",
      scope: "wow.profile",
      redirect_uri:
        req.query.source === "web"
          ? "http://10.0.2.2:19006"
          : "https://auth.expo.io/@tylerdj96/sam",
    },
    auth: {
      username: CLIENT_ID,
      password: CLIENT_SECRET,
    },
  })
    .then((res) => {
      response.status(200).send(res.data);
    })
    .catch((error) => {});
});

app.get("/callback", (req, response) => {
  console.log(req);
  console.log(response);
  response.send("okay!");
});

app.get("/health", (req, response) => {
  response.send("alive");
});

app.get("/", (req, response) => {
  response.send("ok!");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
