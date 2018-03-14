var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
// Imports the Google Cloud client library
const monitoring   =         require('@google-cloud/monitoring');
// Creates a client
const client       =         new monitoring.MetricServiceClient();
//specify GCP Project ID
const projectId = 'ygrinshteyn-sandbox';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ----------- create custom metric for Stackdriver ------------
//specify information for custom metric

const request = {
  name: client.projectPath(projectId),
  metricDescriptor: {
    description: 'Manually entered numeric value',
    displayName: 'Number Entered',
    type: 'custom.googleapis.com/global/numeric_netric',
    metricKind: 'GAUGE',
    valueType: 'DOUBLE',
    unit: '{Value}',
  },
};

// Creates a custom metric descriptor
client
  .createMetricDescriptor(request)
  .then(results => {
    const descriptor = results[0];

    console.log('Created custom Metric:\n');
    console.log(`Name: ${descriptor.displayName}`);
    console.log(`Description: ${descriptor.description}`);
    console.log(`Type: ${descriptor.type}`);
    console.log(`Kind: ${descriptor.metricKind}`);
    console.log(`Value Type: ${descriptor.valueType}`);
    console.log(`Unit: ${descriptor.unit}`);
    console.log('Labels:');
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

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