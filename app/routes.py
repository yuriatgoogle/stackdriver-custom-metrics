from app import app
from flask import render_template
import logging
from app.forms import PostForm
logging.basicConfig(level=logging.DEBUG)

@app.route('/')
@app.route('/index')
def index():
    logging.info('Index hit!')
    form=PostForm()
    return render_template('index_python.html', form=form)