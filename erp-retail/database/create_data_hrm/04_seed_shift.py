from db import get_conn
from utils.snowflake import SnowflakeGenerator
gen = SnowflakeGenerator(datacenter_id=1, worker_id=1)

SHIFTS = [
    ("Sáng", "07:00:00", "12:00:00", 200000),
    ("Chiều", "12:00:00", "17:00:00", 200000),
    ("Tối", "17:00:00", "22:00:00", 230000)
]

def run():
    conn = get_conn()
    with conn.cursor() as cur:
        cur.execute("DELETE FROM shift")
        sql = "INSERT INTO shift(id,name,start_time,end_time,wage_per_shift,created_at) VALUES(%s,%s,%s,%s,%s,NOW())"
        data = [(gen.generate(), n, start, end, wage) for n,start,end,wage in SHIFTS]
        cur.executemany(sql, data)
        print(f"Inserted {len(data)} shifts")
    conn.close()

if __name__ == '__main__':
    run()
