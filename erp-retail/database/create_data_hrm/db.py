import mysql.connector

def get_conn():
    db_config = {
    "host": "localhost",
    "user": "root",
    "password": "123456",
    "database": "hrm_ERP",
    }
    
    return mysql.connector.connect(**db_config);
    
    