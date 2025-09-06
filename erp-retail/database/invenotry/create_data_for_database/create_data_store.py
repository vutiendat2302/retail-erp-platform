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


user_id = [1450492617670998016, 1450492617670998017, 1450492617670998018, 1450492617670998019, 1450492617670998020]


connect_mysql = mysql.connector.connect(**db_config)
cursor = connect_mysql.cursor()

fake = Faker("vi_VN")
sf = Snowflake.parse(856165981072306196, 1288834974657)
gen = SnowflakeGenerator.from_snowflake(sf)

for i in range(0, 10):
    id = next(gen)
    name = f"Cửa hàng {i + 1}"
    email = fake.email()
    address = fake.address().split("\n")[0]
    description = fake.sentence(nb_words=20)
    create_by = random.choice(user_id)
    create_at = fake.date_time_between(start_date="-2y", end_date="now").strftime("%Y-%m-%d %H:%M:%S")
    update_by = random.choice(user_id)
    update_at = datetime.now().strftime("%Y-%m-%d %H-%M-%S")
    status = 1
    
    sql = """ INSERT INTO store (id, name, email, address, description, create_by, create_at, update_by, update_at, status)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    cursor.execute(sql, (id, name, email, address, description, create_by, create_at, update_by, update_at, status))

connect_mysql.commit()
cursor.close()
connect_mysql.close()

print("Da insert data vao table store")