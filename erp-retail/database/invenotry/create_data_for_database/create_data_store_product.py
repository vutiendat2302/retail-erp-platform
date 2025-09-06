import mysql.connector
import random
from faker import Faker
from snowflake import SnowflakeGenerator, Snowflake
from datetime import datetime

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "123456",
    "database": "optima-project-retail-manager"
}
connect_mysql = mysql.connector.connect(**db_config)
cursor = connect_mysql.cursor()

fake = Faker('vi_VN')
sf = Snowflake.parse(856165981072306201, 1288834974657)
gen = SnowflakeGenerator.from_snowflake(sf)

user_id = [
    1450492617670998016,
    1450492617670998017,
    1450492617670998018,
    1450492617670998019,
    1450492617670998020
]

def get_id(table, cursor):
    sql = f"select id from {table}"
    cursor.execute(sql)
    rows = cursor.fetchall()
    return [row[0] for row in rows]
    
pro_id = get_id("product", cursor)
sto_id = get_id("store", cursor)
bat_id = get_id("product_batch", cursor)


for store_id in sto_id:
    for batch_id in bat_id:
        for product_id in pro_id:
            id = next(gen)
            quantity = random.randint(100, 500)
            status = 1
            create_by = random.choice(user_id)
            update_by = random.choice(user_id)
            create_at = fake.date_time_between(start_date="-2y", end_date="now").strftime("%Y-%m-%d %H:%M:%S")
            update_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
            sql = """
            INSERT INTO store_product
            (id, store_id, product_id, quantity, create_by, create_at, update_by, update_at, batch_id, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
        
            cursor.execute(sql, (id, store_id, product_id, quantity, create_by, create_at, update_by, update_at, batch_id, status))
        

connect_mysql.commit()
cursor.close()
connect_mysql.close()

print("Da insert data vào table store_product")
