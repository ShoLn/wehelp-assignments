from flask import Flask, redirect, render_template, url_for, Blueprint,request

error_blueprint = Blueprint('error_blueprint', __name__, template_folder='../templates/error')


########### 錯誤頁面網址 ##############        
@error_blueprint.route('/error/')
def error():
    error_message = request.args.get('message',None)
    return render_template('error.html', error_message = error_message)