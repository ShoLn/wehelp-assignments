import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    port="3306",
    user="root",
    password="password",
    database="website",
    auth_plugin="mysql_native_password"
)

# 抓取mysql資料庫中帳號密碼跟登入者帳號密碼一樣的資料
sql = "SHOW INDEX FROM `member`;"
var1 = '111'
var2 = '222'

cursor = db.cursor(dictionary=True)
cursor.execute(f'SELECT * FROM `member` WHERE `username` = {var1}')
member_signin = cursor.fetchall()
print(member_signin)
