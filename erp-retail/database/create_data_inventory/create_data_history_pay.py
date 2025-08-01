import mysql.connector
import random
from faker import Faker
from snowflake import SnowflakeGenerator, Snowflake
from datetime import datetime, timedelta

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "123456",
    "database": "optima-project-retail-manager"
}


connect_mysql = mysql.connector.connect(**db_config)
cursor = connect_mysql.cursor()

fake = Faker('vi_VN')
sf = Snowflake.parse(856165981072306222, 1288834974657)
gen = SnowflakeGenerator.from_snowflake(sf)

user_id = [1450492617670998016, 1450492617670998017, 1450492617670998018, 1450492617670998019, 1450492617670998020]

def get_id(table, cursor):
    sql = f"select id from {table}"
    cursor.execute(sql)
    rows = cursor.fetchall()
    return [row[0] for row in rows]
    
log_ids = get_id("import_log", cursor)

methods = [
    "cash",
    "bank transfer",
    "debit card",
    "credit card",
    "paypal",
    "crypto"
]


for log_id in log_ids:
    id = next(gen)
    start_time = datetime.today() - timedelta(days=random.randint(1, 7))
    time_pay = fake.date_time_between(start_date=start_time,end_date="now").strftime("%Y-%m-%d %H:%M:%S")
    method = random.choice(methods)
    status = 1
    
    cursor.execute("""
                select a.total_amount
                from import_log a
                where a.id = %s
                """, (log_id,))
    result = cursor.fetchone()
    amount = result[0] if result and result[0] else 0
    
    create_by = random.choice(user_id)
    update_by = random.choice(user_id)
    create_at = fake.date_time_between(start_date="-2y", end_date="now").strftime("%Y-%m-%d %H:%M:%S")
    update_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    sql = """
    INSERT INTO history_pay
    (id, log_id, time_pay, method, status, amount, create_by, create_at, update_by, update_at)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    cursor.execute(sql, (id, log_id, time_pay, method, status, amount, create_by, create_at, update_by, update_at))
    
connect_mysql.commit()
cursor.close()
connect_mysql.close()

print("Da insert data vào table history_pay")
