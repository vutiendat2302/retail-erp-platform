import mysql.connector
import random
from faker import Faker
from snowflake import SnowflakeGenerator, Snowflake
from datetime import date, timedelta, datetime

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "123456",
    "database": "optima-project-retail-manager"
}
connect_mysql = mysql.connector.connect(**db_config)
cursor = connect_mysql.cursor()

fake = Faker('vi_VN')
sf = Snowflake.parse(856165981072306198, 1288834974657)
gen = SnowflakeGenerator.from_snowflake(sf)

user_id = [
    1450492617670998016,
    1450492617670998017,
    1450492617670998018,
    1450492617670998019,
    1450492617670998020
]

for i in range(0,30):
    id = next(gen)
    end_date = date.today() - timedelta(days=365)
    import_date = fake.date_between(start_date="-2y", end_date=end_date)
    expiry_date = import_date + timedelta(days=random.randint(200, 1500))
    import_date = import_date.strftime("%Y-%m-%d")
    expiry_date = expiry_date.strftime("%Y-%m-%d")
    description = fake.sentence(nb_words=20)
    create_by = random.choice(user_id)
    update_by = random.choice(user_id)
    create_at = fake.date_time_between(start_date="-2y", end_date="now").strftime("%Y-%m-%d %H:%M:%S")
    update_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    sql = """
        INSERT INTO product_batch
        (id, description, create_by, create_at, update_by, update_at, import_date, expiry_date)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
    
    cursor.execute(sql, (id, description, create_by, create_at, update_by, update_at, import_date, expiry_date))
        
connect_mysql.commit()
cursor.close()
connect_mysql.close()

print("Da insert data vào table product_batch")
