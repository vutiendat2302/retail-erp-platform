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
sf = Snowflake.parse(856165981072306191, 1288834974657)
gen = SnowflakeGenerator.from_snowflake(sf)


categories = [
    "Sữa các loại",
    "Rau- củ -trái cây",
    "Hóa phẩm - tẩy rửa",
    "Chăm sóc cá nhân",
    "Thịt - hải sản tươi",
    "Bánh kẹo",
    "Đồ uống có cồn",
    "Đồ uống giải khát",
    "Mì - thực phẩm ăn liền",
    "Thực phẩm khô",
    "Thực phẩm chế biến",
    "Gia vị",
    "Thực phẩm đông lạnh",
    "Trứng - đậu hũ",
    "Chăm sóc bé",
    "Đồ dùng gia đình",
    "Điện Gia dụng",
    "Văn Phòng phẩm - Đồ chơi"
]

user_id = [1450492617670998016, 1450492617670998017, 1450492617670998018, 1450492617670998019, 1450492617670998020]

for category in categories:
    id = next(gen)
    name = category
    seo_title = fake.sentence(nb_words=7)
    description = fake.sentence(nb_words=20)
    status = 1
    parent_id = None
    meta_keyword = fake.words(nb=3, unique=True) # tạo ra ba từ ngẫu nhiêu ko trùng lặp
    meta_keyword = ", ".join(meta_keyword) # join 3 từ này lại
    create_by = random.choice(user_id)
    update_by = random.choice(user_id)
    create_at = fake.date_time_between(start_date="-2y", end_date="now").strftime("%Y-%m-%d %H:%M:%S")
    update_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    small_image = None
    
    sql = """
    INSERT INTO category
    (id, name, seo_title, description, status, parent_id, meta_keyword, create_by, create_at, update_by, update_at, small_image)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    cursor.execute(sql, (id, name, seo_title, description, status, parent_id, meta_keyword, create_by, create_at, update_by, update_at, small_image))
    
connect_mysql.commit()
cursor.close()
connect_mysql.close()

print("Da insert data vào table category")
