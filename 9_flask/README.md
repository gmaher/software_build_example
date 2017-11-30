## Flask server

Flask is a python package that lets us build webservers.

see the Flask api http://flask.pocoo.org/docs/0.12/api/

This content is from https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world

see also
https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data
## Templates

Flask automatically searches a folder `/templates` for any template html files.
We can indicate fields in the html that should be substituted with python variables,
passed from flask, using `{{...}}` notation, e.g. (Flask does this using [jinja2](http://jinja.pocoo.org/docs/2.9/) which is a templating engine for python)
```html
<h2>welcome {{user.nickname}}</h2>
```

We can then render these templates using the `render_template` function. We can
pass in python objects to fill in fields in the templates, e.g.
```python
render_template('index.html',title='Home',user={'nickname':'bob'})
```

Conditional statements are also possible using `{%...%}` notation
```html
{% if title %}
<title>{{title}}</title>
{% else %}
<title>Default title</title>
{% endif %}
```

For loops can be used as well
```html
{% for posts in posts %}
<p>{{post.author}} wrote: </p> <b>{{post.body}}</b>
{% endfor %}
```

We can insert one template into another via inheritance. We designate a block in one template, any template that inherits from the first template will then be inserted into the block location
```html
<!--- base.html --->
<p>Inherit me!</p>
<div>
  {% block blockname %}{% endblock %}
</div>
```
then for the inheriting template
```html
{% extends "base.html" %}
{% block content %}
  <h1>I just inherited from base.html!</h1>
{% endblock %}
```

## Forms

A html form is an interface that makes it easy for web browser users to submit http
requests with data to a server. When the submit button of the form is pressed,
it sends an http request to a url specified in the form.

Flask lets us use forms too, we create a form object in python and then
they are inserted into templates.
```python
from flask_wtf import Form
from wtforms import StringField
from wtforms.validators import DataRequired
from flask import redirect

class BasicForm(Form):
  username = StringField('username', validators=[DataRequired()])

@app.route('/login', methods=['GET','POST'])
def login():
  form = BasicForm()

  if form.validate_on_submit():
    return redirect('/index')
  return render_template('login.html', title='sign in', form=form)
```
The form looks like the following, note that actions specifies the url to submit the form to, an empty action means it gets submitted to the url of the current page.
```html
<!--- templates/login.html --->
{% extends "base.html" %}

{% block content %}
<form action="" method="post" name="login">
  <p> please enter your username: <br></br> </p>
  <p><input type="submit" value="Sign in"></p>
</form>
{% endblock %}
```

## Building an API with flask
see https://blog.miguelgrinberg.com/post/designing-a-restful-api-with-python-and-flask
