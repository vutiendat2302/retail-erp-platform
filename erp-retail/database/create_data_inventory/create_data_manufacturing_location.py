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
sf = Snowflake.parse(856165981072306193, 1288834974657)
gen = SnowflakeGenerator.from_snowflake(sf)


manufacturers = [
    {"name": "Công ty Cổ phần Sữa Việt Nam (Vinamilk)", "address": "Số 10 Tân Trào, Phường Tân Phú, Quận 7, TP. Hồ Chí Minh"},
    {"name": "Công ty TNHH Nestlé Việt Nam", "address": "Lô A2, Đường số 2, KCN Biên Hòa II, Đồng Nai"},
    {"name": "Công ty CP Sữa TH (TH True Milk)", "address": "Tòa nhà TH, 166 Nguyễn Thái Học, Ba Đình, Hà Nội"},
    {"name": "Công ty TNHH FrieslandCampina Việt Nam (Dutch Lady)", "address": "Số 141-145 Đường 15, Phường Tân Thuận Đông, Quận 7, TP. Hồ Chí Minh"},
    {"name": "Công ty CP Thực phẩm Dinh dưỡng Nutifood", "address": "281-283 Hoàng Diệu, P.6, Q.4, TP. Hồ Chí Minh"},
    {"name": "Công ty CP Tập đoàn Masan (Masan Consumer)", "address": "12 Tân Trào, Phường Tân Phú, Quận 7, TP. Hồ Chí Minh"},
    {"name": "Công ty CP Acecook Việt Nam", "address": "KCN Tân Bình, Đường số 11, P. Tây Thạnh, Q. Tân Phú, TP. Hồ Chí Minh"},
    {"name": "Công ty CP Vissan", "address": "Số 420 Nơ Trang Long, Phường 13, Quận Bình Thạnh, TP. Hồ Chí Minh"},
    {"name": "Công ty TNHH Quốc tế Unilever Việt Nam", "address": "156 Nguyễn Lương Bằng, Quận 7, TP. Hồ Chí Minh"},
    {"name": "Công ty TNHH Procter & Gamble Việt Nam (P&G)", "address": "Số 8 Đường số 9, KCN VSIP I, Thuận An, Bình Dương"},
    {"name": "Công ty CP Bibica", "address": "443 Lý Thường Kiệt, Phường 8, Quận Tân Bình, TP. Hồ Chí Minh"},
    {"name": "Công ty CP Kinh Đô (Mondelez Kinh Đô)", "address": "Số 138-142 Hai Bà Trưng, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh"},
    {"name": "Công ty TNHH Lotte Việt Nam", "address": "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội"},
    {"name": "Công ty CP Tập đoàn Dầu thực vật Tường An", "address": "48/5 Phan Đăng Lưu, Phường 5, Quận Phú Nhuận, TP. Hồ Chí Minh"},
    {"name": "Công ty TNHH Nước giải khát Coca-Cola Việt Nam", "address": "Số 485 Hà Nội, Phường Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh"},
    {"name": "Công ty CP Tập đoàn Trung Nguyên", "address": "82-84 Bùi Thị Xuân, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh"},
    {"name": "Công ty CP Ba Huân", "address": "C6/29 Phạm Hùng, xã Bình Hưng, Huyện Bình Chánh, TP. Hồ Chí Minh"},
    {"name": "Công ty TNHH Minh Phú (Minh Phu Seafood)", "address": "Lô E1, KCN Cái Cui, Quận Cái Răng, TP. Cần Thơ"},
    {"name": "Công ty TNHH Hưng Việt (Hưng Việt Foods)", "address": "123 Đặng Văn Bi, P. Trường Thọ, TP. Thủ Đức, TP. Hồ Chí Minh"},
    {"name": "Công ty CP Chăn nuôi C.P. Việt Nam", "address": "Lô A7, KCN Biên Hòa II, TP. Biên Hòa, Đồng Nai"}
]


user_id = [1450492617670998016, 1450492617670998017, 1450492617670998018, 1450492617670998019, 1450492617670998020]

for manufacture in manufacturers:
    id = next(gen)
    name = manufacture["name"]
    email = fake.company_email()
    phone = fake.phone_number()
    address = manufacture["address"]
    status = 1
    description = fake.sentence(nb_words=20)
    create_by = random.choice(user_id)
    create_at = fake.date_time_between(start_date="-2y", end_date='now').strftime('%Y-%m-%d %H:%M:%S')
    update_by = random.choice(user_id)
    update_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    sql = """
    INSERT INTO manufacturing_location
    (id, name, email, phone, address, status, description, create_by, create_at, update_by, update_at)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    cursor.execute(sql, (id, name, email, phone, address, status, description, create_by, create_at, update_by, update_at))
    
connect_mysql.commit()
cursor.close()
connect_mysql.close()

print("Da insert data vào table manufacturing_location")
