var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
// Imports the Google Cloud client library
const monitoring   =         require('@google-cloud/monitoring');
// Creates a client
const client       =         new monitoring.MetricServiceClient();
//specify GCP Project ID
const projectId = 'stack-doctor';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ----------- create custom metric for Stackdriver ------------
//specify information for custom metric

//todo - extract metric creation to separate .js file as function

const createRequest = {
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
  .createMetricDescriptor(createRequest)
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
  
  //set value to write
  var metric_value=Math.floor(Math.random() * Math.floor(10));
  //output value
  console.log("Metric value = " + metric_value);

  //instantiate a data point
  const dataPoint = {
    interval: {
      endTime: {
        seconds: Date.now() / 1000,
      },
    },
    value: {
      doubleValue: 0,
    },
  };
  // set value to write
  dataPoint.value.doubleValue = metric_value;
  console.log("data point is " + dataPoint.value.doubleValue);

  //create time series
  const timeSeriesData = {
    metric: {
      type: 'custom.googleapis.com/global/numeric_netric',
    },
    resource: {
      type: 'global',
      labels: {
        project_id: projectId,
      },
    },
    points: [dataPoint],
  };

  // create write request
  const writeRequest = {
    name: client.projectPath(projectId),
    timeSeries: [timeSeriesData],
  };

  // Writes time series data
  client
  .createTimeSeries(writeRequest)
  .then(results => {
    console.log(`Done writing time series data.`, results[0]);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

  //send user right back to entry page
  res.send("wrote value: " + metric_value);
});

//start server
app.listen(8080,function(){
  console.log("Started on PORT 8080");
})