var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//display form on get request
app.get('/',function(req,res){
  res.sendfile("index.html");
});

// handle form submit
app.post('/',function(req,res){
  //get value
  var metric_value=req.body.metric_value;
  //output value
  console.log("Metric value = "+metric_value);
  res.end("yes");
});

//start server
app.listen(8080,function(){
  console.log("Started on PORT 8080");
})