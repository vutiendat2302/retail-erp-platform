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
sf = Snowflake.parse(856165981072306192, 1288834974657)
gen = SnowflakeGenerator.from_snowflake(sf)

brands = [
    # Sữa các loại
    "Vinamilk", "TH True Milk", "Dutch Lady", "Fami", "Mộc Châu Milk", "Yomost", "Probi", "Nutifood", "Betagen", "Meadow Fresh", "Susu", "Ba Vì",
    # Rau - củ - trái cây
    "Đà Lạt GAP", "VinEco", "Dalat Hasfarm", "Orfarm", "Nông trại Ba Vì", "Nông sản sạch Sông Hồng", "Doveco", "Co.op Organic", "Nông Sản ViệtGap", "Satrafoods",
    # Hóa phẩm - Tẩy rửa
    "Sunlight", "OMO", "Ariel", "Downy", "Comfort", "Vim", "Gift", "Lifebuoy", "Green Cross", "Mr. Muscle", "Cif", "Mỹ Hảo", "Lix",
    # Chăm sóc cá nhân
    "Lifebuoy", "Colgate", "P/S", "Dove", "Head & Shoulders", "Pantene", "Enchanteur", "Senka", "Nivea", "Vaseline", "Johnson’s", "Gillette", "Romano",
    # Thịt - Hải sản tươi
    "Vissan", "CP", "SG Food", "Cầu Tre", "Ba Huân", "Dabaco", "Minh Phú", "4S", "Hồng Ngọc", "Nhân Hòa", "Cá Bông Lau Cần Giờ",
    # Bánh kẹo
    "Orion", "Kinh Đô", "Cosy", "Danisa", "Solite", "Chocopie", "AFC", "One One", "Hải Hà", "Pía Tân Huê Viên", "Lotte", "KitKat", "Ferrero Rocher",
    # Đồ uống có cồn
    "Heineken", "Tiger", "Sapporo", "Budweiser", "Larue", "Johnnie Walker", "Chivas Regal", "Ballantine’s", "Vodka Hà Nội", "Strongbow",
    # Đồ uống giải khát
    "Coca-Cola", "Pepsi", "Twister", "TH True Milk", "Vinamilk", "Aquafina", "Lavie", "Wonderfarm", "Red Bull", "Yeo’s",
    # Mì - Thực phẩm ăn liền
    "Hảo Hảo", "Omachi", "Vifon", "Modern", "Micoem", "Miliket", "Nongshim", "Kokomi", "Bích Chi",
    # Thực phẩm khô
    "Vissan", "Tân Tân", "Hải Châu", "Bích Chi", "Ajinomoto", "Thiên Hương", "Vinamit",
    # Thực phẩm chế biến
    "Vissan", "CP", "Cầu Tre", "Đức Việt", "SG Food", "Hạ Long", "Mai Quế Lộ",
    # Gia vị
    "Nam Ngư", "Chinsu", "Maggi", "Ajinomoto", "Knorr", "Cholimex", "Lee Kum Kee", "Tường An",
    # Thực phẩm đông lạnh
    "CP", "Vissan", "SG Food", "Minh Phú", "Hải Nam", "Freetrade",
    # Trứng - Đậu Hũ
    "Ba Huân", "Vĩnh Thành Đạt", "Dabaco", "Việt Nam Tofu", "Sagota", "Hữu Nghị",
    # Chăm sóc bé
    "Pampers", "Bobby", "Johnson’s Baby", "Dnee", "Huggies", "Nestlé", "Chicco", "Avent",
    # Đồ dùng gia đình
    "Sunhouse", "Lock&Lock", "Duy Tân", "Tithafac", "Inochi", "Thiên Long", "Kangaroo",
    # Điện Gia dụng
    "Panasonic", "Philips", "Sharp", "Sunhouse", "Electrolux", "Kangaroo", "Xiaomi", "Lock&Lock",
    # Văn Phòng phẩm - Đồ chơi
    "Thiên Long", "Flexoffice", "Deli", "Staedtler", "Pentel", "Crayola", "Lego", "Hot Wheels", "Barbie"
]


user_id = [1450492617670998016, 1450492617670998017, 1450492617670998018, 1450492617670998019, 1450492617670998020]

for brand in brands:
    id = next(gen)
    name = brand
    description = fake.sentence(nb_words=20)
    country = "Việt Nam" if fake.boolean(chance_of_getting_true=50) else fake.country()
    status = 1
    created_by = random.choice(user_id)
    update_by = random.choice(user_id)
    create_at = fake.date_time_between(start_date="-2y", end_date='now').strftime('%Y-%m-%d %H:%M:%S')
    update_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    sql = """
    INSERT INTO brand
    (id, name, description, country, create_at, update_at, created_by, update_by, status)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    cursor.execute(sql, (id, name, description, country, create_at, update_at, created_by, update_by, status))
    
connect_mysql.commit()
cursor.close()
connect_mysql.close()

print("Da insert data vào table brand")
