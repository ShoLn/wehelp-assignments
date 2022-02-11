from flask import *
import mysql.connector

########### 連接mysql資料庫 ##############
db = mysql.connector.connect(
    host="localhost",
    port="3306",
    user="root",
    password="password",
    database="website",
    auth_plugin="mysql_native_password"
)

########### 建立bluprint ##############
index_blueprint = Blueprint(
    'index_blueprint', __name__, template_folder='../templates/index')

########### 首頁顯示網址 ##############
@index_blueprint.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


########### 註冊button導向網址 ##############
@index_blueprint.route('/signup', methods=['POST'])
def sign_up():
    signup_name = request.form['signup_name'] #抓取註冊者姓名
    signup_username = request.form['signup_username'] #抓取註冊者帳號
    signup_pass_word = request.form['signup_pass_word'] #抓取註冊者密碼
    sql = "SELECT `username` FROM `member` WHERE `username` = %s ;" #抓取mysql資料庫中帳號跟註冊者帳號一樣的資料
    val = (signup_username,)
    cursor = db.cursor()
    cursor.execute(sql, val)
    member_username = cursor.fetchall()
    if len(member_username): # 如果有抓到資料，則list不為0，執行if
        return redirect(url_for('error_blueprint.error')+'?message=帳號已經被註冊')
    elif (signup_name == "") or (signup_username == '') or (signup_pass_word == ''):
        return redirect(url_for('error_blueprint.error')+'?message=註冊資料不能為空')
    else: #沒重複資料也沒有註冊資料是空值則將註冊者資料新增至mysql資料庫中
        sql = "INSERT INTO `member` (`name`, `username`, `password`, `follower_count`) VALUES (%s,%s,%s,%s)"
        val = (signup_name, signup_username, signup_pass_word, 0)
        cursor = db.cursor()
        cursor.execute(sql, val)
        db.commit()
        return redirect(url_for('index_blueprint.index'))


########### 登入button導向網址 ##############
@index_blueprint.route('/signin', methods=['POST'])
def sign_in():
    signin_username = request.form['signin_username']
    signin_pass_word = request.form['signin_pass_word']
    sql = "SELECT * FROM `member` WHERE `username` = %s AND `password` = %s ;" #抓取mysql資料庫中帳號密碼跟登入者帳號密碼一樣的資料
    val = (signin_username, signin_pass_word)
    cursor = db.cursor(dictionary=True)
    cursor.execute(sql, val)
    member_signin = cursor.fetchall()
    if len(member_signin):
        # 登入成功新增使用者名稱到session signin_name
        session['signin_name'] = member_signin[0]['name']
        return redirect(url_for('member_blueprint.member'))
    elif (signin_username == '') or (signin_pass_word == ''):
        return redirect(url_for('error_blueprint.error')+'?message=請輸入帳號、密碼')
    else:
        return redirect(url_for('error_blueprint.error')+'?message=帳號、或密碼輸入錯誤')
