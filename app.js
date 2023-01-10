const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;

    const data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }

        }
    ]
    };

    const jsonData=JSON.stringify(data);
    const url="https://us13.api.mailchimp.com/3.0/lists/29b03d94a9";

    const options={
        method:"POST",
        auth:"Tanmay1:  4d25c78b290e4e2131f2149537ebf6a3-us13"

    }
   const request= https.request(url,options,function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();



});

app.post("/failure",function(req,res){
    res.redirect("/")
})


app.listen(3000,function(){
    console.log("The server is running on port 3000");
});



// 4d25c78b290e4e2131f2149537ebf6a3-us13
// 29b03d94a9