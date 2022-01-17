from crypt import methods
from flask import Flask
from flask import request
from flask import render_template
from flask import redirect
from flask import session

app = Flask(__name__)
app.secret_key = 'my_secret_key'

########### 首頁網址 ##############
@app.route('/')
def index():
    return render_template('index.html')
   
########### 登入button導向網址 ##############
@app.route('/signin', methods=['POST'])
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

########### 錯誤頁面網址 ##############        
@app.route('/error/')
def error():
    error_message = request.args.get('message',None)
    return render_template('error.html', error_message = error_message)

########### 成功登入會員網址 ##############
@app.route('/member/')
def member():
    if session['log_in'] :
        return render_template('member.html')
    else:
        return redirect('/')

########### 登出button導向網址 ##############
@app.route('/signout')
def sign_out():
    session['log_in'] = False #登出將session log_in改為False
    return redirect('/')

app.run(port=3000, debug=True)