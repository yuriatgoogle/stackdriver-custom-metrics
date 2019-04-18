
// opencensus and Stackdriver imports
const {globalStats, MeasureUnit, AggregationType} = 
    require('@opencensus/core');
const {StackdriverStatsExporter} = 
    require('@opencensus/exporter-stackdriver');

// GCP setup - project and credentials
const projectId = 'stack-doctor';
// if (!projectId || !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
//     throw Error('Unable to proceed without a Project ID');
// }

// express imports and setup
const express = require('express');
const app = express();
const port = 8080;

// timer import
var latencyMeasurement;

// stackdriver export config and metric setup
const EXPORT_INTERVAL = 20;
const LATENCY_MS = globalStats.createMeasureInt64(
  'task_latency',
  MeasureUnit.MS,
  'The task latency in milliseconds'
);

// create and register the view
const view = globalStats.createView(
    'task_latency_distribution',
    LATENCY_MS,
    AggregationType.DISTRIBUTION,
    [],
    'The distribution of the task latencies.',
    // Latency in buckets:
    // [>=0ms, >=100ms, >=200ms, >=400ms, >=1s, >=2s, >=4s]
    [0, 100, 200, 400, 1000, 2000, 4000]
  );
globalStats.registerView(view);

// create the Stackdriver exporter and register it
const exporter = new StackdriverStatsExporter({
    projectId: projectId,
    period: EXPORT_INTERVAL * 1000,
  });
globalStats.registerExporter(exporter);

app.get('/', function (req, res) {
    latencyMeasurement = 534;
    globalStats.record([
        {
          measure: LATENCY_MS,
          value: latencyMeasurement,
        },
      ]);
    res.send('Hello World!');
});
    
app.listen(port, () => console.log(`Example app listening on port ${port}!`))