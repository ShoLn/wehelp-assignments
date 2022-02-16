from flask import *
import mysql.connector

from myproject.view.index import sign_in

api_blueprint = Blueprint('api_blueprint', __name__,
                          template_folder='../templates')


########### 連接mysql資料庫 ##############
db = mysql.connector.connect(
    host="localhost",
    port="3306",
    user="root",
    password="password",
    database="website",
    auth_plugin="mysql_native_password"
)

########### 建立查詢會員資料的 API ##############


@api_blueprint.route('/api/members')
def get_api():
    username = request.args.get('username', None)
    cursor = db.cursor(dictionary=True)
    cursor.execute(
        " SELECT `id` , `name` , `username` FROM `member` WHERE `username` = %s ;", (username,))
    member_get = cursor.fetchone()
    if member_get:
        member_get = {'data': member_get}
    else:
        member_get = {'data': None}
    res = make_response(jsonify(member_get), 200)
    return res


########### 建立更新會員姓名的 API ##############
@api_blueprint.route('/api/member', methods=['POST'])
def post_api():
    req_dic = request.get_json()  # 將 json 格式的 request 轉成dic
    new_name = req_dic.get('name', None)

    if session['signin_name'] and new_name:
        cursor = db.cursor(dictionary=True)
        cursor.execute(' UPDATE `member` SET `name` = %s WHERE `username` = %s ;',
                       (new_name, session['signin_username']))
        db.commit()
        session['signin_name'] = new_name
        res_dic = {"ok": True}
        res = make_response(jsonify(res_dic))
        return res
    else:
        res_dic = {"error": True}
        res = make_response(jsonify(res_dic))
        return res
