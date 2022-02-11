from flask import *

member_blueprint = Blueprint('member_blueprint', __name__, template_folder='../templates/member')


########### 成功登入會員網址 ##############
@member_blueprint.route('/member/')
def member():
    if session['signin_name'] :
        return render_template('member.html', signin_name = session['signin_name'])
    else:
        return redirect(url_for('index_blueprint.index'))


########### 登出button導向網址 ##############
@member_blueprint.route('/signout')
def sign_out():
    session['signin_name'] = None #登出將session signin_name改為none
    return redirect(url_for('index_blueprint.index'))

