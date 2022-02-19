import mysql.connector
from mysql.connector import pooling

class Db():
    def __init__(self):
        self.pool_object = pooling.MySQLConnectionPool(
            pool_size=5,
            pool_name='mypoolname',
            pool_reset_session=True,
            host='localhost',
            user='root',
            password='password',
            database='website',
            auth_plugin="mysql_native_password"
        )
        self.cnt_pool_obj = None
        self.cursor = None

    def query(self, sql, val=None, one_row=True):
        try:
            self.cnt_pool_obj = self.pool_object.get_connection()
            self.cursor = self.cnt_pool_obj.cursor(dictionary=True,buffered=True)
            self.cursor.execute(sql,val)
            if one_row:
                data = self.cursor.fetchone()  # return none if no data
                self.cursor.close()
                self.cnt_pool_obj.close()
                return data
            else:
                data = self.cursor.fetchall()  # return empty list if no data
                self.cursor.close()
                self.cnt_pool_obj.close()
                return data
        except mysql.connector.Error as e:
            print('query error', e)

    def change(self, sql, val):
        try:
            self.cnt_pool_obj = self.pool_object.get_connection()
            self.cursor = self.cnt_pool_obj.cursor(dictionary=True,buffered=True)
            self.cursor.execute(sql, val)
            self.cnt_pool_obj.commit()
            self.cursor.close()
            self.cnt_pool_obj.close()
        except mysql.connector.Error as e:
            print('change error', e)


db = Db()
