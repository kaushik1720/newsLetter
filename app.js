const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https = require("https");

app.use(express.static("public"));
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/", function(req, res){
    const first_name = req.body.Fname;
    const last_name = req.body.Lname;
    const email = req.body.Email;
    console.log(first_name, last_name, email);
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME:first_name,
                    LNAME: last_name,
                }
            }
        ]
    }


const jsonData = JSON.stringify(data);
const url = "https://us21.api.mailchimp.com/3.0/lists/71b5755fb2";
const options = {
    method: "POST",
    auth: "kaushik1720:ec42349b33544c50f9faa917914d72eb4-us21"
}



const request = https.request(url, options, function(response){
    if (response.statusCode=== 200){
        res.send("Successfully subscribed!");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
})

request.write(jsonData);
request.end();
});


app.post("/failure", function(req, res){
    res.redirect("/")
})


app.listen(process.env.PORT || port, function(){
    console.log("server is running on port 3000");
});

// c42349b33544c50f9faa917914d72eb4-us21
// 71b5755fb2