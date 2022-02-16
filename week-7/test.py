#這是測試用，老師請忽略此檔案，謝謝～
import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    port="3306",
    user="root",
    password="password",
    database="website",
    auth_plugin="mysql_native_password"
)




cursor = db.cursor(dictionary=True)
username = '111'
cursor.execute(" SELECT `id` , `name` , `username` FROM `member` WHERE `username` = %s ;", (username,))
member_signin = cursor.fetchone()
print(member_signin)

