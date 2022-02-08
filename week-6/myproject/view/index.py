from flask import *
import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    port="3306",
    user="root",
    password="password",
    database="website",
    auth_plugin="mysql_native_password"
)
cursor = db.cursor()
index_blueprint = Blueprint(
    'index_blueprint', __name__, template_folder='../templates/index')

########### 首頁顯示網址 ##############


@index_blueprint.route('/', methods=['GET','POST'])
def index():
    return render_template('index.html')


########### 註冊button導向網址 ##############
@index_blueprint.route('/signup', methods=['POST'])
def sign_up():
    signup_name = request.form['signup_name']
    signup_username = request.form['signup_username']
    signup_pass_word = request.form['signup_pass_word']
    sql = "SELECT `username` FROM `member` WHERE `username` = %s ;"
    val = (signup_username,)
    cursor.execute(sql, val)
    member_username = cursor.fetchall()
    if len(member_username):
        return redirect('/error/?message=帳號已經被註冊')
    elif (signup_name == "") or (signup_username == '') or (signup_pass_word == ''):
        return redirect('/error/?message=註冊資料不能為空')
    else:
        sql = "INSERT INTO `member` (`name`, `username`, `password`, `follower_count`) VALUES (%s,%s,%s,%s)"
        val = (signup_name, signup_username, signup_pass_word, 0)
        cursor.execute(sql, val)
        db.commit()
        return redirect('/')


########### 登入button導向網址 ##############
@index_blueprint.route('/signin', methods=['POST'])
def sign_in():
    signin_username = request.form['signin_username']
    signin_pass_word = request.form['signin_pass_word']
    sql = "SELECT * FROM `member` WHERE `username` = %s AND `password` = %s ;"
    val = (signin_username, signin_pass_word)
    cursor.execute(sql, val)
    member_signin = cursor.fetchall()
    if len(member_signin):
        session['signin_name'] = member_signin[0][1]  # 登入成功新增使用者名稱到session signin_name
        return redirect('/member/')
    elif (signin_username == '') or (signin_pass_word == ''):
        return redirect('/error/?message=請輸入帳號、密碼')
    else:
        return redirect('/error/?message=帳號、或密碼輸入錯誤')

