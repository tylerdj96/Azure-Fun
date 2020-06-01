const express = require("express");
const querystring = require("querystring");
const axios = require("axios");
const app = express();

const port = process.env.PORT || 3000;

app.get("/redirect", (req, response) => {
  axios({
    method: "post",
    url: "https://us.battle.net/oauth/token",
    params: {
      code: req.query.code,
      grant_type: "authorization_code",
      scope: "wow.profile",
      redirect_uri: "https://redirect-tdj-test-l.azurewebsites.net/redirect",
      //   redirect_uri: "http://10.0.2.2:3000/redirect",
      // redirect_uri: "exp://192.168.1.4:19000/"
    },
    auth: {
      username: "c22ce62fd8f6467bb9656f2fa971ac35",
      password: "u0BVI5CiExd6JZ7FeUxO0K77N5tu1ib6",
    },
  })
    .then((res) => {
      //   console.log(query);
      const query = querystring.stringify(res.data);
      response.status(301).redirect(`exp://192.168.1.4:19000/?${query}`);
    })
    .catch((error) => {
      console.error(error);
    });
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
