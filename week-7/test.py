#測試用頁面老師請忽略此頁
from myproject.view.db import db
sql = ' SELECT * FROM `member` WHERE `username` = %s AND `name` = %s;'
val = ('333','測試3')
print(db.cursor)
ans = db.query(sql,val)
print(ans)
print(db.cursor)
