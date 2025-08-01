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
sf = Snowflake.parse(856165981072306215, 1288834974657)
gen = SnowflakeGenerator.from_snowflake(sf)

user_id = [1450492617670998016, 1450492617670998017, 1450492617670998018, 1450492617670998019, 1450492617670998020]

def get_id(table, cursor):
    sql = f"select id from {table}"
    cursor.execute(sql)
    rows = cursor.fetchall()
    return [row[0] for row in rows]
    
sto_id = get_id("store", cursor)
warehouse_id = get_id("warehouse", cursor)
pro_id = get_id("product", cursor)
bat_id = get_id("product_batch", cursor)

for from_warehouse_id in warehouse_id:
    id = next(gen)
    description = fake.sentence(nb_words=20)
    to_store_id = random.choice(sto_id)
    end_date = datetime.today() - timedelta(days=random.randint(200, 365), seconds=0, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0)
    start_time = fake.date_time_between(start_date="-2y", end_date=end_date)
    end_time = start_time + timedelta(days=random.randint(10, 30))
    start_time = start_time.strftime("%Y-%m-%d %H:%M:%S")
    end_time = end_time.strftime("%Y-%m-%d %H:%M:%S")
    status = 1
    create_by = random.choice(user_id)
    update_by = random.choice(user_id)
    create_at = fake.date_time_between(start_date="-2y", end_date="now").strftime("%Y-%m-%d %H:%M:%S")
    update_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    sql = """
    INSERT INTO export_log
    (id, description, from_warehouse_id, to_store_id, status, start_time, end_time,
    create_by, create_at, update_by, update_at)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    cursor.execute(sql, (id, description, from_warehouse_id, to_store_id, status, start_time, end_time,
    create_by, create_at, update_by, update_at))
    
connect_mysql.commit()
print("Insert data vao export_log")


log_ids = get_id("export_log", cursor)

#export_product
for log_id in log_ids:
    selected_batch_ids = random.sample(bat_id, min(len(bat_id), 5))
    selected_product_ids = random.sample(pro_id, min(len(pro_id), 10))
    for batch_id in selected_batch_ids:
        for product_id in selected_product_ids:
            id = next(gen)
            quantity = random.randint(100, 300)
            sql = """
                insert into export_product(id, log_id, product_id, quantity, batch_id)
                values (%s, %s, %s, %s, %s)
                """
            cursor.execute(sql, (id, log_id, product_id, quantity, batch_id))
            
connect_mysql.commit()
print("insert data vao export_product")


connect_mysql.commit()
cursor.close()
connect_mysql.close()

print("Da insert data vào table")
