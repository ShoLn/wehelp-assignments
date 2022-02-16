from flask import *
from myproject.view.error import error_blueprint
from myproject.view.index import index_blueprint
from myproject.view.member import member_blueprint
from myproject.view.api import api_blueprint

app = Flask(__name__)
app.secret_key = 'my_secret_key'
app.config['JSON_AS_ASCII'] = False

app.register_blueprint(error_blueprint)
app.register_blueprint(index_blueprint)
app.register_blueprint(member_blueprint)
app.register_blueprint(api_blueprint)

