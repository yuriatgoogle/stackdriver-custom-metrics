
// opencensus and Stackdriver imports
const {globalStats, MeasureUnit, AggregationType} = 
    require('@opencensus/core');
const {StackdriverStatsExporter} = 
    require('@opencensus/exporter-stackdriver');

// GCP setup - project and credentials
const projectId = 'stack-doctor';
//const projectId = process.env.PROJECT_ID;

// express imports and setup
const express = require('express');
const app = express();
const port = 8080;

// timer import
var latencyMeasurement;

// stackdriver export config and metric setup
const EXPORT_INTERVAL = 20;
const LATENCY_MS = globalStats.createMeasureInt64(
  'stack-doctor-metric',
  MeasureUnit.MS,
  'custom metric for Stack Doctor'
);

// create and register the view
const lastValueView = globalStats.createView(
    'stack_doctor_metric',
    LATENCY_MS,
    AggregationType.LAST_VALUE,
    [],
    'randomly generated value for Stack Doctor demo'
);
globalStats.registerView(lastValueView);

// create the Stackdriver exporter and register it
const exporter = new StackdriverStatsExporter({
    projectId: projectId,
    period: EXPORT_INTERVAL * 1000,
  });
globalStats.registerExporter(exporter);

app.get('/', function (req, res) {
    // generate random value
    latencyMeasurement = Math.floor(Math.random() * Math.floor(1000));
    globalStats.record([
        {
          measure: LATENCY_MS,
          value: latencyMeasurement,
        },
      ]);
    res.send('Value generated was ' + latencyMeasurement);
});
    
app.listen(port, () => console.log(`Example app listening on port ${port}!`))