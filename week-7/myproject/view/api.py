from flask import *
from myproject.view.db import db

api_blueprint = Blueprint('api_blueprint', __name__,
                          template_folder='../templates')


########### 建立查詢會員資料的 API ##############


@api_blueprint.route('/api/members')
def get_api():
    username = request.args.get('username', None)
    sql = " SELECT `id` , `name` , `username` FROM `member` WHERE `username` = %s ;"
    val = (username,)
    member_get = db.query(sql, val, one_row=True)
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
        sql = ' UPDATE `member` SET `name` = %s WHERE `username` = %s ;'
        val = (new_name, session['signin_username'])
        db.change(sql, val)
        session['signin_name'] = new_name
        res_dic = {"ok": True}
        res = make_response(jsonify(res_dic))
        return res
    else:
        res_dic = {"error": True}
        res = make_response(jsonify(res_dic))
        return res
