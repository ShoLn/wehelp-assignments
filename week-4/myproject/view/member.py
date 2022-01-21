from flask import Flask, redirect, render_template, url_for, Blueprint,request,session

member_blueprint = Blueprint('member_blueprint', __name__, template_folder='../templates/member')


########### 成功登入會員網址 ##############
@member_blueprint.route('/member/')
def member():
    if session['log_in'] :
        return render_template('member.html')
    else:
        return redirect('/')


########### 登出button導向網址 ##############
@member_blueprint.route('/signout')
def sign_out():
    session['log_in'] = False #登出將session log_in改為False
    return redirect('/')

