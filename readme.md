# stackdriver-custom-metrics

This repository contain an example of a node application using the Stackdriver Moniitoring API to create and write to a custom metric.  

THIS IS NOT AN OFFICIAL GOOGLE PRODUCT

## How to use this repository

1. To run locally:
 - modify server.js to point to your own GCP project 
 - gcloud init
 - gcloud auth to establish credentials
 - npm install to get the packages.
 - node server.js to run
 - log into Stackdriver and validate that the metric is being created and sent
2. To run on App Engine Standard:
 - modify server.js to point to your project
 - gcloud app create
 - gcloud app deploy
 - gcloud app browse to test

## TODOs

1. Update these instructions for Python