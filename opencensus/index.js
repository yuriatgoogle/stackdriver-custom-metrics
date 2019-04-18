
const {globalStats, MeasureUnit, AggregationType} = 
    require('@opencensus/core');

const {StackdriverStatsExporter} = 
    require('@opencensus/exporter-stackdriver');

const express = require('express');
const app = express();
const port = 8080;
    
app.get('/', function (req, res) {
    res.send('Hello World!')
});
    
app.listen(port, () => console.log(`Example app listening on port ${port}!`))