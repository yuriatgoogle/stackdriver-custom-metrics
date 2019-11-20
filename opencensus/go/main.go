package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"go.opencensus.io/plugin/ochttp"

	"contrib.go.opencensus.io/exporter/stackdriver"
	"go.opencensus.io/stats"
	"go.opencensus.io/stats/view"
)

const projectId = "stack-doctor"

var (
	goDemoMetric = stats.Float64("go_demo_metric", "demo metric", "ms")
)

func main() {
	//ctx := context.Background()

	// create the view
	v := &view.View{
		Name:        "demo_metric_view",
		Measure:     goDemoMetric,
		Description: "The demo view",
		Aggregation: view.LastValue(),
	}
	if err := view.Register(v); err != nil {
		log.Fatalf("Failed to register the view: %v", err)
	}

	// create and register the exporter
	exporter, err := stackdriver.NewExporter(stackdriver.Options{
		ProjectID:         projectId,
		Location:          "us-west",
		ReportingInterval: 60 * time.Second,
	})
	if err != nil {
		log.Fatal(err)
	}

	if err := exporter.StartMetricsExporter(); err != nil {
		log.Fatalf("Error starting metric exporter: %v", err)
	}

	defer exporter.Flush()
	// Start the metrics exporter
	defer exporter.StopMetricsExporter()

	// handle HTTP
	mux := http.NewServeMux()
	mux.HandleFunc("/", HelloServer)
	h := &ochttp.Handler{Handler: mux}
	if err := view.Register(ochttp.DefaultServerViews...); err != nil {
		log.Fatal("Failed to register ochttp.DefaultServerViews")
	}

	log.Printf("Server listening! ...")
	log.Fatal(http.ListenAndServe(":8080", h))

}

func HelloServer(w http.ResponseWriter, r *http.Request) {
	stats.Record(context.Background(), goDemoMetric.M(100))
	fmt.Fprintf(w, "Hello!")
}
