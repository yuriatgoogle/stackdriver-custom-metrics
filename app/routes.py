from app import app
from flask import render_template, redirect, flash
import logging
from google.cloud import monitoring 
from app.forms import PostForm
logging.basicConfig(level=logging.DEBUG)

@app.route('/')
@app.route('/index', methods=['GET', 'POST'])
def index():
    form=PostForm()
    client = monitoring.Client()
    if form.validate_on_submit():
        flash('value entered {}'.format(
            form.metric.data)) # TODO - use flashed messages to write out value to page
        logging.warning('value entered is ' + (form.metric.data)) # log the input
        # TODO - call a function to send the metric to Stackdriver
        # ----- for now - doing it here
        metric = client.metric(
            type_='custom.googleapis.com/numeric_value',
            labels={}
        )
        resource = client.resource( # resource is not being written properly
            type_='global',
            labels={
            }
        )
        # Default arguments use endtime datetime.utcnow()
        client.write_point(metric, resource, int(form.metric.data))
        logging.info('Successfully wrote time series.')


        # ------- end metric write
        return redirect('/index') # redirect back to main page
    return render_template('index_python.html', form=form) # show the form page



    
    