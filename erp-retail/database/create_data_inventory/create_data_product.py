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
sf = Snowflake.parse(856165981072306195, 1288834974657)
gen = SnowflakeGenerator.from_snowflake(sf)

user_id = [
    1450492617670998016,
    1450492617670998017,
    1450492617670998018,
    1450492617670998019,
    1450492617670998020
]

def get_data(table, cursor):
    sql = f"select name from {table}"
    cursor.execute(sql)
    rows = cursor.fetchall()
    return [row[0] for row in rows]
    
categories = get_data("category", cursor)
brands = get_data("brand", cursor)
manufacturing_locations = get_data("manufacturing_location", cursor)

category_brand_map = {
    "Sữa các loại": brands[0:12],
    "Rau- củ -trái cây": brands[12:22],
    "Hóa phẩm - tẩy rửa": brands[22:35],
    "Chăm sóc cá nhân": brands[35:48],
    "Thịt - hải sản tươi": brands[48:59],
    "Bánh kẹo": brands[59:72],
    "Đồ uống có cồn": brands[72:82],
    "Đồ uống giải khát": brands[82:92],
    "Mì - thực phẩm ăn liền": brands[92:101],
    "Thực phẩm khô": brands[101:108],
    "Thực phẩm chế biến": brands[108:115],
    "Gia vị": brands[115:123],
    "Thực phẩm đông lạnh": brands[123:129],
    "Trứng - đậu hũ": brands[129:135],
    "Chăm sóc bé": brands[135:143],
    "Đồ dùng gia đình": brands[143:150],
    "Điện Gia dụng": brands[150:158],
    "Văn Phòng phẩm - Đồ chơi": brands[158:167]
}

def get_id(table, name, key, conn):
    temp_cursor = conn.cursor()
    sql = f"SELECT {key} FROM {table} WHERE name = %s"
    temp_cursor.execute(sql, (name,))
    row = temp_cursor.fetchone()
    # Nếu còn kết quả, đọc hết
    while temp_cursor.fetchone():
        pass
    temp_cursor.close()
    return row[0] if row else None

products_map = {
    "Sữa các loại": [
        "Sữa đậu nành Fami", "Sữa chua Vinamilk", "Phô mai Con Bò Cười", "Sữa Cô Gái Hà Lan", "Sữa Vinamilk tươi tiệt trùng", "YoMost dâu", "Sữa tươi TH True Milk",
        "Sữa đặc Ông Thọ", "Sữa tươi Dalat Milk", "Sữa chua uống Probi Vinamilk", "Sữa tươi Mộc Châu", "Sữa chua uống Betagen", "Phô mai Belcube", "Sữa hạt TH True Nut",
        "Sữa đậu xanh Vinasoy", "Sữa chua uống Susu Vinamilk", "Sữa tươi Meadow Fresh (New Zealand)", "Sữa tươi Vinamilk 100%", "Sữa tiệt trùng Nutifood GrowPLUS+",
        "Sữa chua uống TH True Yogurt", "Sữa tươi tiệt trùng Ba Vì", "Sữa chua NutiFood", "Sữa chua uống Zott Monte", "Sữa tươi tiệt trùng Kun",
        "Sữa bắp non TH True Milk", "Sữa chua uống TH Top Kid", "Sữa tươi tiệt trùng Love’in Farm", "Sữa tươi tiệt trùng Vinamilk ADM Gold",
        "Sữa chua uống Fristi", "Sữa chua ăn Greek Yogurt Vinamilk"
    ],
    "Rau- củ -trái cây": [
        "Cà chua Đà Lạt", "Dưa leo (dưa chuột)", "Cà rốt", "Khoai tây Đà Lạt", "Cải bó xôi (rau bina)", "Bông cải xanh (súp lơ xanh)", "Bắp cải tím", "Bí đỏ",
        "Đậu que", "Mướp hương", "Xà lách lô lô xanh", "Xà lách Romaine", "Ớt chuông đỏ", "Ớt chuông vàng", "Hành tây tím", "Tỏi Lý Sơn", "Rau muống sạch", "Rau ngót",
        "Cải ngọt", "Cải thìa", "Dâu tây Đà Lạt", "Nho đỏ Ninh Thuận", "Táo Mỹ nhập khẩu", "Cam sành miền Tây", "Chuối Nam Mỹ", "Bưởi da xanh", "Thanh long ruột đỏ",
        "Dưa hấu Long An", "Măng cụt Thái Lan", "Sầu riêng Ri6"
    ],
    "Hóa phẩm - tẩy rửa": [
        "Nước rửa chén Sunlight chanh", "Bột giặt OMO Matic", "Nước lau sàn Gift hương lavender", "Nước giặt Ariel", "Nước xả vải Downy", "Nước tẩy toilet Vim",
        "Gel rửa tay Lifebuoy", "Xà phòng tắm Lux", "Nước rửa tay Green Cross", "Nước lau kính CIF", "Nước tẩy quần áo Javel", "Nước lau bếp Mr. Muscle",
        "Nước xịt phòng Glade", "Nước lau sàn Mr. Clean", "Nước giặt Dnee", "Nước xả Comfort", "Bột giặt Surf hương nước hoa", "Nước rửa chén Mỹ Hảo",
        "Xà phòng Omo bánh", "Nước tẩy đa năng Duck", "Bột thông cống Okay", "Dầu gội Clear", "Dầu xả Pantene", "Nước rửa tay Lifebuoy bạc hà",
        "Nước rửa bồn cầu Duck", "Nước tẩy Toilet Javel", "Nước lau sàn Sunlight", "Nước xịt khử mùi Airwick", "Nước rửa chén Lix"
    ],
    "Chăm sóc cá nhân": [
        "Kem đánh răng Colgate MaxFresh", "Bàn chải đánh răng P/S siêu mềm", "Sữa tắm Lifebuoy Matcha & Lô hội", "Sữa rửa mặt Hazeline nghệ",
        "Dầu gội Head & Shoulders bạc hà", "Dầu xả Dove phục hồi hư tổn", "Kem chống nắng Anessa SPF50+", "Sữa dưỡng thể Vaseline", "Khăn giấy ướt Mamamy",
        "Dao cạo râu Gillette Mach3", "Sữa tắm Enchanteur Charming", "Khăn mặt cao cấp Mollis", "Sữa rửa mặt Senka Perfect Whip", "Lăn khử mùi Nivea Men",
        "Tăm bông trẻ em BabyCare", "Nước hoa hồng Thayers", "Sữa dưỡng da Hada Labo", "Dầu gội Rejoice suôn mượt", "Kem cạo râu Romano",
        "Dầu gội Sunsilk óng mượt rạng ngời", "Kem dưỡng ẩm Cetaphil", "Xịt khử mùi Enchanteur", "Sữa rửa mặt Pond’s White Beauty", "Gel rửa tay khô Bath & Body Works",
        "Kem dưỡng da Vaseline Healthy White", "Dầu gội Clear Men Cool Sport", "Kem dưỡng da Nivea Soft", "Sữa tắm Dove dưỡng ẩm", "Son dưỡng môi Lipice",
        "Kem đánh răng Sensodyne Repair & Protect"
    ],
    "Thịt - hải sản tươi": [
        "Thịt heo ba chỉ tươi", "Thịt bò Mỹ cắt lát", "Thịt gà ta nguyên con", "Cá basa phi lê", "Cá hồi Na Uy phi lê", "Tôm sú sống", "Mực ống tươi", "Thịt nạc vai heo",
        "Cá thu cắt khúc", "Thịt bò Úc thăn ngoại", "Sườn non heo", "Ức gà tươi", "Cua biển Cà Mau", "Ghẹ xanh sống", "Cá trê đồng tươi", "Lườn cá hồi tươi",
        "Thịt dê tươi", "Thịt vịt nguyên con", "Cá chim trắng", "Tôm thẻ chân trắng", "Cá nục tươi", "Bạch tuộc tươi", "Thịt bò Kobe nhập khẩu", "Thịt heo mông",
        "Cá lóc đồng tươi", "Thịt ngan tươi", "Cá rô phi nguyên con", "Cá bống mú tươi", "Thịt bò bắp hoa", "Mực lá lớn tươi"
    ],
    "Bánh kẹo": [
        "Bánh Oreo socola", "Kẹo sữa Alpenliebe", "Bánh ChocoPie Orion", "Bánh quy AFC vị rau", "Kẹo dẻo Haribo Goldbears", "Bánh Custas kem trứng",
        "Bánh bông lan Solite", "Kẹo cao su Doublemint", "Bánh gạo One One", "Bánh Pía Sóc Trăng", "Bánh quy Cosy Marie", "Kẹo sô cô la M&M’s", "Bánh mì que Tân Tân",
        "Bánh tráng sữa", "Kẹo dẻo dâu Yupi", "Bánh Mochi Nhật Bản", "Kẹo KitKat Mini", "Bánh Cracker Ritz", "Bánh quy LU Pháp", "Bánh Snack khoai tây Lay’s",
        "Bánh đa giòn Việt Nam", "Bánh Chocopie Lotte", "Kẹo bạc hà Halls", "Kẹo socola Ferrero Rocher", "Bánh quy bơ Danisa", "Kẹo dừa Bến Tre", "Kẹo Milo Cube",
        "Bánh kem bơ Đài Loan", "Kẹo marshmallow Campfire", "Bánh mì hoa cúc Pháp"
    ],
    "Đồ uống có cồn": [
        "Bia Heineken lon", "Rượu vang đỏ Đà Lạt", "Bia Tiger Crystal", "Bia Sapporo Premium", "Rượu vodka Men", "Bia Saigon Special", "Rượu Johnnie Walker Red Label",
        "Bia Budweiser", "Rượu nếp cái hoa vàng", "Rượu soju Hàn Quốc Jinro", "Bia Larue", "Rượu mạnh Chivas Regal 12", "Bia 333", "Rượu Vodka Hà Nội", "Sake Hakutsuru Nhật Bản",
        "Bia Beck’s Ice", "Rượu soju Good Day", "Bia Corona Extra", "Rượu vang trắng Chile", "Rượu Ballantine’s Finest", "Bia Leffe Blonde", "Rượu nếp than",
        "Rượu sake vảy vàng", "Bia Desperados", "Rượu Vang Ý Moscato", "Rượu Whisky Jameson", "Rượu vang Úc Jacob’s Creek", "Bia Hà Nội lon", "Rượu vang Pháp Bordeaux",
        "Bia Budweiser lon"
    ],
    "Đồ uống giải khát": [
        "Nước khoáng Lavie", "Trà xanh không độ", "Nước cam ép Twister", "Sữa đậu nành Fami", "Nước tăng lực Red Bull", "Nước ngọt Coca-Cola", "Nước ngọt Pepsi",
        "Nước suối Aquafina", "Nước ép táo Ceres", "Nước yến sào Sanest", "Trà Ô Long Tea+", "Nước tăng lực Sting dâu", "Trà sữa Matcha Tea", "Nước cam có gas Mirinda",
        "Nước dừa Cocoxim", "Trà bí đao Wonderfarm", "Nước ép đào SunUp", "Nước chanh muối Number One", "Sữa bắp TH True", "Nước ép lựu Vfresh", "Trà đào C2",
        "Nước ép xoài Yeo’s", "Nước suối I-on Life", "Nước táo lên men Strongbow", "Trà sữa Tea Break", "Trà sữa Macchiato", "Nước nha đam Wonderfarm", "Nước ép dứa Vfresh",
        "Nước mía ép đóng chai", "Trà vải Cozy"
    ],
    "Mì - thực phẩm ăn liền": [
        "Mì tôm Hảo Hảo chua cay", "Mì ly Modern vị bò", "Mì Omachi sốt spaghetti", "Cháo ăn liền Vifon", "Bún ăn liền Mikochi", "Phở ăn liền Acecook",
        "Hủ tiếu ăn liền Micoem", "Mì lẩu thái Miliket", "Miến ăn liền Đệ Nhất", "Mì Udon ăn liền", "Mì Koreno vị gà", "Miến ăn liền Vifon", "Mì không chiên Kokomi",
        "Bánh đa ăn liền", "Mì ly 3 Miền", "Phở bò ăn liền Vifon", "Mì chay Bích Chi", "Mì spaghetti Ottogi", "Nui ăn liền Safoco", "Mì trộn Samyang Hàn Quốc",
        "Miến dong ăn liền", "Bánh canh ăn liền", "Mì xào Indomie Indonesia", "Cháo sườn ăn liền Vifon", "Mì Kimchi Nongshim", "Mì vị bò Satay", "Mì ly Gấu Đỏ",
        "Mì vị tôm chua cay Micoem", "Mì Hảo Hảo tôm chua cay ly", "Bún bò ăn liền Bích Chi"
    ],
    "Thực phẩm khô": [
        "Nấm mèo khô", "Tôm khô Cà Mau", "Cá cơm khô", "Mực rim me", "Khô gà lá chanh", "Tép khô", "Khô bò miếng", "Thịt heo khô", "Đậu phộng rang muối", "Rong biển khô",
        "Cá basa khô", "Khô cá lóc", "Đậu xanh bóc vỏ", "Miến dong khô", "Đậu nành khô", "Hạt sen khô", "Măng khô", "Mộc nhĩ khô", "Nấm hương khô", "Gạo lứt sấy khô",
        "Hạt điều rang muối", "Hạt dẻ cười", "Hạt bí ngô sấy khô", "Hạt hướng dương", "Dừa sấy khô", "Nho khô Mỹ", "Táo tàu khô", "Hạt chia Úc", "Thịt trâu gác bếp",
        "Khô cá sặc"
    ],
    "Thực phẩm chế biến": [
        "Xúc xích CP", "Giò lụa đặc biệt", "Chả quế Huế", "Chả cá Nha Trang", "Nem chua Thanh Hóa", "Chả bò Đà Nẵng", "Lạp xưởng Mai Quế Lộ", "Thịt nguội Vissan",
        "Pate gan Pháp", "Cá hộp 3 Cô Gái", "Thịt hộp Tulip", "Thịt chà bông", "Bò viên CP", "Gà viên CP", "Xúc xích tiệt trùng Vissan", "Đùi gà hun khói",
        "Chả mực Hạ Long", "Cá viên chiên", "Tôm viên chiên", "Bánh bao nhân thịt", "Xíu mại đông lạnh", "Thịt viên sốt cà", "Chả lụa Cầu Tre", "Thịt nguội CP",
        "Chả cá thu", "Bánh giò", "Cá thu kho đóng hộp", "Pate heo Vissan", "Thịt hộp Lotte SPAM", "Chả cốm Hà Nội"
    ],
    "Gia vị": [
        "Nước mắm Nam Ngư", "Xì dầu Chinsu", "Đường Biên Hòa", "Muối i-ốt", "Hạt nêm Knorr", "Nước tương Maggi", "Bột ngọt Ajinomoto", "Tiêu xay Phú Quốc",
        "Mắm tôm Bắc", "Dầu ăn Tường An", "Dầu olive Borges", "Giấm gạo lên men", "Sốt mayonnaise Kewpie", "Sốt cà chua Heinz", "Sốt tương ớt Cholimex",
        "Sốt BBQ Lee Kum Kee", "Sốt me Pha sẵn", "Sốt teriyaki Ajinomoto", "Bột nghệ nguyên chất", "Ngũ vị hương", "Bột canh Hải Châu", "Tỏi băm đóng hộp",
        "Hành phi vàng", "Bột sả khô", "Bột ớt Hàn Quốc", "Sốt salad Thousand Island", "Sốt mè rang Kewpie", "Sốt mayonnaise Aji-mayo", "Sốt tiêu đen", "Nước mắm Phú Quốc"
    ],
    "Thực phẩm đông lạnh": [
        "Tôm sú đông lạnh", "Cá hồi phi lê đông lạnh", "Thịt bò Mỹ đông lạnh", "Gà nguyên con đông lạnh", "Cá basa phi lê đông lạnh", "Sò điệp đông lạnh", "Bạch tuộc đông lạnh",
        "Hàu sữa đông lạnh", "Thịt heo ba chỉ đông lạnh", "Sườn non heo đông lạnh", "Cá viên đông lạnh", "Chả cá viên đông lạnh", "Đùi gà góc tư đông lạnh", "Mực nang đông lạnh",
        "Cánh gà đông lạnh", "Tôm thẻ chân trắng đông lạnh", "Thịt vịt đông lạnh", "Thịt dê đông lạnh", "Thịt ngan đông lạnh", "Lườn ngỗng đông lạnh", "Thịt bò cuộn nấm đông lạnh",
        "Chả mực đông lạnh", "Thịt gà xay đông lạnh", "Cá trứng đông lạnh", "Xúc xích đông lạnh", "Viên tôm sú đông lạnh", "Bò viên đông lạnh", "Thịt lợn xay đông lạnh",
        "Cá thu cắt khúc đông lạnh", "Chả cá thác lác đông lạnh"
    ],
    "Trứng - đậu hũ": [
        "Trứng gà ta", "Trứng gà công nghiệp", "Trứng vịt tươi", "Trứng vịt muối", "Trứng cút tươi", "Đậu hũ non", "Đậu hũ chiên", "Đậu hũ trắng", "Trứng gà Omega 3",
        "Trứng gà hữu cơ", "Trứng vịt lộn", "Đậu hũ Nhật", "Đậu hũ dồn thịt", "Đậu phụ trứng muối", "Đậu hũ phô mai", "Đậu hũ mơ", "Trứng muối chay", "Đậu hũ Tứ Xuyên",
        "Trứng bắc thảo", "Đậu hũ sấy khô", "Đậu hũ que", "Đậu hũ rong biển", "Đậu hũ thảo mộc", "Đậu hũ hấp", "Đậu hũ chiên giòn", "Đậu hũ chay", "Đậu hũ nướng",
        "Trứng cút lộn", "Đậu hũ non rong biển", "Đậu hũ non phô mai"
    ],
    "Chăm sóc bé": [
        "Tã bỉm Pampers", "Sữa bột Nan Optipro", "Bột ăn dặm Heinz", "Sữa tắm Johnson’s Baby", "Nước rửa bình sữa Dnee", "Khăn ướt Bobby", "Bình sữa Avent",
        "Ghế ăn dặm cho bé", "Yếm ăn silicon", "Máy hâm sữa Fatzbaby", "Khăn sữa cao cấp", "Kem chống hăm Bepanthen", "Bột ăn dặm Nestle Cerelac", "Phấn rôm Johnson’s",
        "Tã quần Merries", "Miếng lót sơ sinh Huggies", "Dầu gội cho bé Kodomo", "Kem dưỡng da Chicco cho bé", "Bàn chải đánh răng trẻ em Pigeon",
        "Sữa rửa mặt cho bé Lactacyd", "Bột ngũ cốc Hipp", "Sữa nước Pediasure", "Ghế rung cho bé", "Balo cho bé đi học", "Khăn bông đa năng", "Bình tập uống nước",
        "Nước súc miệng trẻ em", "Sữa tắm gội toàn thân Dnee", "Nước muối sinh lý", "Địu em bé Aprica"
    ],
    "Đồ dùng gia đình": [
        "Nước rửa chén Sunlight", "Nước lau sàn Gift", "Thùng rác nhựa", "Khăn lau đa năng", "Nước xịt phòng Glade", "Túi đựng rác", "Chổi lông gà", "Thớt nhựa kháng khuẩn",
        "Móc áo inox", "Bàn chải toilet", "Găng tay cao su", "Bàn ủi hơi nước", "Bọt biển rửa chén", "Cây lau nhà 360 độ", "Kệ đựng gia vị", "Giá phơi quần áo",
        "Rổ nhựa đa năng", "Đèn pin sạc điện", "Gối ngủ bông", "Bình nước giữ nhiệt", "Đèn ngủ cảm ứng", "Đồng hồ treo tường", "Bảng dán tường trang trí",
        "Máy xịt phòng tự động", "Dụng cụ mở nắp chai", "Hộp đựng thực phẩm", "Cây lăn bụi quần áo", "Bình xịt tưới cây", "Hộp đựng giấy vệ sinh", "Móc khóa đa năng"
    ],
    "Điện Gia dụng": [
        "Nồi cơm điện Sharp", "Máy xay sinh tố Philips", "Ấm siêu tốc Sunhouse", "Lò vi sóng Electrolux", "Máy lọc không khí Xiaomi", "Quạt điện Senko",
        "Máy sấy tóc Panasonic", "Bếp hồng ngoại Kangaroo", "Nồi chiên không dầu Lock&Lock", "Máy hút bụi Electrolux", "Bàn là hơi nước Philips",
        "Máy ép trái cây Panasonic", "Máy nước nóng Ariston", "Lò nướng Sanaky", "Máy lọc nước RO Karofi", "Máy đánh trứng Bluestone",
        "Máy lọc nước Nano Geyser", "Máy xay thịt Mishio", "Quạt điều hòa Sunhouse", "Máy hâm sữa Fatzbaby", "Máy pha cà phê Delonghi", "Máy làm sữa hạt Ranbem",
        "Máy làm bánh mì Tiross", "Lò nướng điện Bluestone", "Máy hút mùi Sunhouse", "Máy làm sữa chua Pensonic", "Máy xay sinh tố đa năng Panasonic",
        "Máy lọc không khí Coway", "Máy cạo râu Philips", "Máy sấy quần áo Kangaroo"
    ],
    "Văn Phòng phẩm - Đồ chơi": [
        "Bút bi Thiên Long", "Sổ tay Flexoffice", "Bút chì gỗ Staedtler", "Thước kẻ nhựa Deli", "Keo dán giấy", "Giấy A4 Double A", "Bút xóa Pentel",
        "Bìa trình ký A4", "Kéo cắt giấy", "Giấy note vàng", "Bảng trắng mini", "Bút lông bảng Thiên Long", "Bút chì bấm Pentel", "Bộ màu nước Crayola",
        "Xe hơi đồ chơi Hot Wheels", "Bộ xếp hình Lego", "Búp bê Barbie", "Gấu bông Teddy", "Đồ chơi nấu ăn cho bé", "Bảng vẽ điện tử Xiaomi", "Bộ bút lông màu",
        "Đồ chơi nặn đất sét", "Xe tải đồ chơi", "Đồng hồ báo thức mini", "Bộ cờ vua nhựa", "Sách tô màu", "Máy tính bỏ túi Casio", "Bút gel Pilot",
        "Đồ chơi xếp hình nam châm", "Bộ cờ cá ngựa"
    ]
}

for category in categories:
    if category not in products_map:
        continue
    category_id = get_id("category", category, "id", connect_mysql)
    for product_name in products_map[category]:
        brands_for_category = category_brand_map.get(category, [])
        if not brands_for_category:
            continue
        brand = random.choice(brands_for_category)
        brand_id = get_id("brand", brand, "id", connect_mysql)
        manufacturing_location = random.choice(manufacturing_locations)
        manufacturing_location_id = get_id("manufacturing_location", manufacturing_location, "id", connect_mysql)
        id = next(gen)
        qr_code = fake.ean(length=13)
        name = product_name
        seo_title = fake.sentence(nb_words=7)
        description = fake.sentence(nb_words=20)
        status = 1
        tag = fake.word()
        image = fake.image_url()
        list_image = None
        price_normal = round(random.uniform(10000, 500000), 3)
        vat = round(random.uniform(0, 0.2), 3)
        price_sell = price_normal + round(random.uniform(20000, 100000), 3) + vat * price_normal
        promotion_price = price_sell - round(random.uniform(10000, 50000), 3)
        weight = round(random.uniform(0.1, 5), 3)
        warranty = f"{random.randint(1,12)} tháng"
        hot = None
        view_count = random.randint(0, 100000)
        meta_keyword = ", ".join(fake.words(nb=3, unique=True))
        create_by = random.choice(user_id)
        create_at = fake.date_time_between(start_date="-2y", end_date='now').strftime('%Y-%m-%d %H:%M:%S')
        update_by = random.choice(user_id)
        update_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        sellable = 1
        
        sql = """
        INSERT INTO product (
            id, qr_code, name, seo_title, description, status, tag, image, list_image, price_normal, price_sell, promotion_price, vat, weight, warranty,
            hot, view_count, category_id, brand_id, manufacturing_location_id, meta_keyword, create_by, create_at, update_by, update_at, sellable
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (
            id, qr_code, name, seo_title, description, status, tag, image, list_image, price_normal, price_sell, promotion_price, vat, weight, warranty,
            hot, view_count, category_id, brand_id, manufacturing_location_id, meta_keyword, create_by, create_at, update_by, update_at, sellable
        ))

connect_mysql.commit()
cursor.close()
connect_mysql.close()

print("Da insert data vào table product")
