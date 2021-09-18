const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const app = express();
const https = require("https");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); // make this folder public to access the url and images on run time

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signUp.html");
});

app.post("/data", function (req, res) {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const email = req.body.Email;

  var data = {
    members: [
      {
        email_address: email,
        mearge_fields: {
          FNAME: FirstName,
          LNAME: LastName,
        },
      },
    ],
  };
  var jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/ad75a0208a";
  // https://us then the number you get with your api key ex : us1

  const options = {
    method: "POST",
    auth: "kushwah:7a0b2d665e3f9c15d2baea1d246cb6f6-us1",
  };

  const requests = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.send("Completed");
    } else console.log("not found");

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  requests.write(jsonData);
  requests.end();

  //   res.write(
  //     "Your name is " +
  //       FirstName +
  //       "and last name is " +
  //       LastName +
  //       "and email is " +
  //       email
  //   );

  console.log("Your name is ");
});

app.listen(8000, function () {
  console.log("we are live");
});

//d622ead8acd42edb6f20046d3b84f4e5-us1
//ad75a0208a
