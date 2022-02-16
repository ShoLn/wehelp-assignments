from flask import *
import mysql.connector


member_blueprint = Blueprint(
    'member_blueprint', __name__, template_folder='../templates/member')

db = mysql.connector.connect(
    host="localhost",
    port="3306",
    user="root",
    password="password",
    database="website",
    auth_plugin="mysql_native_password"
)
########### 成功登入會員網址 ##############


@member_blueprint.route('/member/')
def member():
    if session['signin_name']:
        return render_template('member.html', signin_name=session['signin_name'])
    else:
        return redirect(url_for('index_blueprint.index'))


########### 登出button導向網址 ##############
@member_blueprint.route('/signout')
def sign_out():
    session['signin_name'] = None  # 登出將session signin_name改為none
    session['signin_username'] = None  # 登出將session signin_username改為none
    return redirect(url_for('index_blueprint.index'))


