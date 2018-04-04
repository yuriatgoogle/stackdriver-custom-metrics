from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    metric = StringField('metric', validators=[DataRequired()])
    submit = SubmitField('Submit')