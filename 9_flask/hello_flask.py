from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
    #fake user
    user = {'nickname': 'bob'}

    posts = [
        {"author":{"nickname":'John'},
        "body": "my first post!"
        },
        {"author":{"nickname":"sean"},
        "body": "Eeeeeeeeey"
        }
    ]
    
    return render_template('index.html', title='Home', user=user, posts=posts)


def main():
    app.run(debug=True)


#################################
# Run the code
#################################
main()
