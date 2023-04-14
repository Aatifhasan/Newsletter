
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extende: true }))
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post('/', function (req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    
    console.log(fname);
    console.log(lname);
    console.log(email);
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    
    const url = "https://us13.api.mailchimp.com/3.0/lists/3b8c6d808d";
    const options = {
        method: "POST",
        auth: "aatif1:9b1255a6db7307e3e6834cfa029ad2e2-us13"
    }
    
    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
        
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
    })
    request.write(jsonData);
    request.end()
});

app.listen(process.env.PORT ||3000, function () {
    console.log("server is up");
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
// mailchimp

// api key: 9b1255a6db7307e3e6834cfa029ad2e2-us13

// audience id: 3b8c6d808d