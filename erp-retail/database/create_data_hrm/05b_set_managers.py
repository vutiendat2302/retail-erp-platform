from db import get_conn
from utils.snowflake import SnowflakeGenerator
gen = SnowflakeGenerator(datacenter_id=1, worker_id=1)

def run():
    conn=get_conn()
    with conn.cursor(dictionary=True) as cur:
        # branch managers
        cur.execute("SELECT id FROM branch")
        for row in cur.fetchall():
            cur.execute("SELECT id FROM employee WHERE branch_id=%s ORDER BY RAND() LIMIT 1",(row["id"],))
            emp=cur.fetchone()
            if emp:
                cur.execute("UPDATE branch SET manager_id=%s WHERE id=%s",(emp["id"],row["id"]))
        # department managers
        cur.execute("SELECT id FROM department")
        for row in cur.fetchall():
            cur.execute("SELECT id FROM employee WHERE department_id=%s ORDER BY RAND() LIMIT 1",(row["id"],))
            emp=cur.fetchone()
            if emp:
                cur.execute("UPDATE department SET manager_id=%s WHERE id=%s",(emp["id"],row["id"]))
        print("Managers assigned for branch & department")
    conn.close()

if __name__=='__main__':
    run()
