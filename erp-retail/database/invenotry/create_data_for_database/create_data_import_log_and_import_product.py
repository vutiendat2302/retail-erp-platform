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
sf = Snowflake.parse(856165981072306211, 1288834974657)
gen = SnowflakeGenerator.from_snowflake(sf)

user_id = [1450492617670998016, 1450492617670998017, 1450492617670998018, 1450492617670998019, 1450492617670998020]

def get_id(table, cursor):
    sql = f"select id from {table}"
    cursor.execute(sql)
    rows = cursor.fetchall()
    return [row[0] for row in rows]
    
supplier_id = get_id("supplier", cursor)
warehouse_id = get_id("warehouse", cursor)
pro_id = get_id("product", cursor)
bat_id = get_id("product_batch", cursor)

for to_warehouse_id in warehouse_id:
    id = next(gen)
    description = fake.sentence(nb_words=20)
    from_supplier_id = random.choice(supplier_id)
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
    INSERT INTO import_log
    (id, from_supplier_id, to_warehouse_id, description, start_time, end_time, total_amount, status,
    create_by, create_at, update_by, update_at)
    VALUES (%s, %s, %s, %s, %s, %s, 0, %s, %s, %s, %s, %s)
    """
    
    cursor.execute(sql, (id, from_supplier_id, to_warehouse_id, description, start_time, end_time, status,
                        create_by, create_at, update_by, update_at))
    
connect_mysql.commit()
print("Insert data vao import_log")


log_ids = get_id("import_log", cursor)

#import_product
for log_id in log_ids:
    selected_batch_ids = random.sample(bat_id, min(len(bat_id), 5))
    selected_product_ids = random.sample(pro_id, min(len(pro_id), 10))
    for batch_id in selected_batch_ids:
        for product_id in selected_product_ids:
            id = next(gen)
            note = fake.sentence(nb_words=20)
            quantity = random.randint(12000, 14000)
            cursor.execute("""
                        select b.price_normal - b.price_normal * 0.2
                        from product b
                        where b.id = %s
                        """, (product_id,))
            result = cursor.fetchone()
            price = result[0] if result and result[0] else 0

            sql = """
                insert into import_product(id, log_id, product_id, quantity, price, note, batch_id)
                values (%s, %s, %s, %s, %s, %s, %s)
                """
            cursor.execute(sql, (id, log_id, product_id, quantity, price, note, batch_id))
            
connect_mysql.commit()
print("insert data vao import_product")




#update_total for import_log
for import_log_id in log_ids:
    cursor.execute("""
        SELECT SUM(a.quantity * a.price)
        FROM import_product a
        WHERE a.log_id = %s
    """, (import_log_id,))
    result = cursor.fetchone()
    total_amount = result[0] if result[0] is not None else 0
    
    cursor.execute("""
        UPDATE import_log
        SET total_amount = %s
        Where id = %s
        """, (total_amount, import_log_id))

connect_mysql.commit()
cursor.close()
connect_mysql.close()

print("Da insert data vào table import_log and import_product")
