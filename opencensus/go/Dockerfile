FROM golang:latest 
RUN mkdir /app 
ADD . /app/ 
WORKDIR /app 
RUN go get strconv
RUN go get "go.opencensus.io/plugin/ochttp"
RUN go get "contrib.go.opencensus.io/exporter/stackdriver"
RUN go get "go.opencensus.io/stats"
RUN go get "go.opencensus.io/stats/view"
RUN go build -o main . 
CMD ["/app/main"]