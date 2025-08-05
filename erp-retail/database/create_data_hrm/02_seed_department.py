from db import get_conn
from utils.snowflake import SnowflakeGenerator
gen = SnowflakeGenerator(datacenter_id=1, worker_id=1)

DEPTS = ["Sales", "Inventory", "Human Resource", "Customer Relationship"]

def run():
    conn = get_conn()
    with conn.cursor() as cur:
        cur.execute("DELETE FROM department")
        sql = "INSERT INTO department(id,name,created_at) VALUES(%s,%s,NOW())"
        data = [(gen.generate(), d) for d in DEPTS]
        cur.executemany(sql, data)
        print(f"Inserted {len(data)} departments")
    conn.close()

if __name__ == '__main__':
    run()
