from db import get_conn
from utils.snowflake import SnowflakeGenerator
gen = SnowflakeGenerator(datacenter_id=1, worker_id=1)

BRANCHES = [
    ("Chi nhánh Ba Đình", "Ba Đình, Hà Nội"),
    ("Chi nhánh Hoàn Kiếm", "Hoàn Kiếm, Hà Nội"),
    ("Chi nhánh Tây Hồ", "Tây Hồ, Hà Nội"),
    ("Chi nhánh Long Biên", "Long Biên, Hà Nội"),
    ("Chi nhánh Cầu Giấy", "Cầu Giấy, Hà Nội"),
    ("Chi nhánh Đống Đa", "Đống Đa, Hà Nội"),
    ("Chi nhánh Hai Bà Trưng", "Hai Bà Trưng, Hà Nội"),
    ("Chi nhánh Hoàng Mai", "Hoàng Mai, Hà Nội"),
    ("Chi nhánh Thanh Xuân", "Thanh Xuân, Hà Nội"),
    ("Chi nhánh Nam Từ Liêm", "Nam Từ Liêm, Hà Nội"),
    ("Chi nhánh Hà Đông", "Hà Đông, Hà Nội")
]

def run():
    conn = get_conn()
    with conn.cursor() as cur:
        cur.execute("DELETE FROM branch")
        sql = "INSERT INTO branch(id,name,address,created_at) VALUES(%s,%s,%s,NOW())"
        data = [(gen.generate(), n, addr) for n, addr in BRANCHES]
        cur.executemany(sql, data)
        print(f"Inserted {len(data)} branches")
    conn.close()

if __name__ == '__main__':
    run()
