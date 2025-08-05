from db import get_conn
from utils.snowflake import SnowflakeGenerator
gen = SnowflakeGenerator(datacenter_id=1, worker_id=1)

from datetime import timedelta, datetime, time
import random

TODAY=datetime.now().date()
START=TODAY - timedelta(days=30)

def td_to_time(v):
    if isinstance(v, timedelta):
        sec=int(v.total_seconds())
        return time(sec//3600,(sec%3600)//60)
    return v

def run():
    conn=get_conn()
    with conn.cursor(dictionary=True) as cur:
        cur.execute("SELECT id,salary_type FROM employee")
        employees=cur.fetchall()
        cur.execute("SELECT id,start_time,end_time FROM shift")
        shifts=cur.fetchall()
        # fix time
        for s in shifts:
            s["start_time"]=td_to_time(s["start_time"])
            s["end_time"]=td_to_time(s["end_time"])

        cur.execute("DELETE FROM attendance")
        sql=("INSERT INTO attendance(id,employee_id,work_date,check_in,check_out,"
             "status,source,shift_id,note,created_at) "
             "VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,NOW())")
        batch=[]
        for emp in employees:
            for i in range(30):
                d=START+timedelta(days=i)
                if d.weekday()>=5 and random.random()<0.4:
                    continue
                status,source="on_time",random.choice(["web","mobile","device"])
                shift_id=None
                if emp["salary_type"]=="shift":
                    sh=random.choice(shifts)
                    shift_id=sh["id"]
                    cin=datetime.combine(d, sh["start_time"])
                    cout=datetime.combine(d, sh["end_time"])
                else:
                    cin=datetime.combine(d,time(8,0))
                    cout=datetime.combine(d,time(17,0))
                batch.append((gen.generate(),emp["id"],d,cin,cout,status,source,shift_id,""))
        cur.executemany(sql,batch)
        print(f"Inserted {len(batch)} attendance records")
    conn.close()

if __name__=='__main__':
    run()
