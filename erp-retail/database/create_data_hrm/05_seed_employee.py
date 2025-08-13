from db import get_conn
from utils.snowflake import SnowflakeGenerator
gen = SnowflakeGenerator(datacenter=1, worker=1)
import pymysql.cursors

from faker import Faker
import random, datetime

fake = Faker('vi_VN')
SAL_TYPES = ["daily", "shift"]

def run():
    conn = get_conn()
    with conn.cursor(dictionary=True) as cur:
        # grab ids
        cur.execute("SELECT id FROM branch"); branches=[r["id"] for r in cur.fetchall()]
        cur.execute("SELECT id FROM department"); depts=[r["id"] for r in cur.fetchall()]
        cur.execute("SELECT id FROM job_position"); poss=[r["id"] for r in cur.fetchall()]

        cur.execute("DELETE FROM employee")
        sql = ("INSERT INTO employee("
               "id,name,email,gender,date_of_birth,address,branch_id,department_id,position_id,join_date,"
               "salary_type,salary_per_day,salary_per_shift,status,created_at,enabled)"
               "VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,'active',NOW(),1)")
        batch=[]
        for _ in range(100):
            emp_id = gen.generate()
            name=fake.name()
            email=fake.email()
            gender=random.choice(["Nam","Nữ"])
            dob=fake.date_of_birth(minimum_age=22,maximum_age=55)
            address=fake.address()
            branch=random.choice(branches)
            dept=random.choice(depts)
            pos=random.choice(poss)
            join=fake.date_between(start_date='-3y',end_date='today')
            s_type=random.choice(SAL_TYPES)
            spd = random.randint(180,300)*1000 if s_type=='daily' else 0
            sps = 0 if s_type == 'daily' else random.randint(150, 250) * 1000  # salary_per_shift
            
            batch.append((emp_id,name,email,gender,dob,address,branch,dept,pos,join,s_type,spd, sps))
        cur.executemany(sql,batch)
        conn.commit()
        print(f"Inserted {len(batch)} employees")
    conn.close()

if __name__=='__main__':
    run()
