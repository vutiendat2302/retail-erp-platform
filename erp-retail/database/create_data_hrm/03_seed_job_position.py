from db import get_conn
from utils.snowflake import SnowflakeGenerator
gen = SnowflakeGenerator(datacenter=1, worker=1)

POSITIONS = [
    ("Cashier", "Junior", "Xử lý thanh toán, in hóa đơn"),
    ("Sales Staff", "Junior", "Tư vấn bán hàng, hỗ trợ trưng bày"),
    ("Store Manager", "Senior", "Quản lý toàn cửa hàng, ca làm, doanh số"),
    ("Inventory Clerk", "Junior", "Nhập – xuất kho, ghi nhận tồn kho"),
    ("Warehouse Manager", "Senior", "Quản lý hàng hóa toàn hệ thống"),
    ("HR Assistant", "Junior", "Hỗ trợ hồ sơ, công văn, chấm công"),
    ("HR Manager", "Senior", "Tuyển dụng, lương, điều phối nhân sự"),
    ("Customer Support", "Junior", "Hỗ trợ khách hàng trực tuyến/tại quầy"),
    ("CRM Specialist", "Mid", "Quản lý hội viên, phân tích hành vi khách hàng")
]

def run():
    conn = get_conn()
    with conn.cursor() as cur:
        cur.execute("DELETE FROM job_position")
        sql = "INSERT INTO job_position(id,title,level,description,created_at) VALUES(%s,%s,%s,%s,NOW())"
        data = [(gen.generate(), t, lvl, desc) for t,lvl,desc in POSITIONS]
        cur.executemany(sql, data)
        conn.commit()
        print(f"Inserted {len(data)} job positions")
    conn.close()

if __name__ == '__main__':
    run()
