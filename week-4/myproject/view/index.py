from flask import Flask, redirect, render_template, url_for, Blueprint,request,session

index_blueprint = Blueprint('index_blueprint', __name__, template_folder='../templates/index')


########### 首頁顯示網址 ##############
@index_blueprint.route('/')
def index():
    return render_template('index.html')

########### 登入button導向網址 ##############
@index_blueprint.route('/signin', methods=['POST'])
def sign_in():
    user_id = request.form['user_id']
    pass_word = request.form['pass_word']
    
    if (user_id == 'test') and (pass_word == 'test'):
        session['log_in'] = True # 登入成功新增session log_in 為True
        return redirect('/member/')
    elif (user_id == '') or (pass_word == ''):
        return redirect('/error/?message=請輸入帳號、密碼')
    else:
        return redirect('/error/?message=帳號、或密碼輸入錯誤')