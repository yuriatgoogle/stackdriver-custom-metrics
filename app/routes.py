from app import app
from flask import render_template, redirect, flash
import logging
from app.forms import PostForm
logging.basicConfig(level=logging.DEBUG)

@app.route('/')
@app.route('/index', methods=['GET', 'POST'])
def index():
    form=PostForm()
    if form.validate_on_submit():
        flash('value entered {}'.format(
            form.metric.data))
        logging.warning('value entered is ' + form.metric.data) # log the input
        # TODO - call a function to send the metric to Stackdriver
        return redirect('/index') # redirect back to main page
    return render_template('index_python.html', form=form) # show the form page



    
    