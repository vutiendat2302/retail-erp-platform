from db import get_conn
from utils.snowflake import SnowflakeGenerator
gen = SnowflakeGenerator(datacenter=1, worker=1)

import datetime

def run(month=None,year=None):
    today=datetime.date.today()
    month=month or (today.month-1 or 12)
    year=year or (today.year-1 if month==12 else today.year)

    conn=get_conn()
    with conn.cursor(dictionary=True) as cur:
        cur.execute("""SELECT e.id emp_id,e.salary_type,
                          e.salary_per_day,e.salary_per_shift,
                          SUM(CASE WHEN e.salary_type='daily' THEN 1 ELSE 0 END) AS days,
                          SUM(CASE WHEN e.salary_type='shift' THEN 1 ELSE 0 END) AS shifts
                       FROM employee e
                       LEFT JOIN attendance a ON a.employee_id=e.id
                         AND MONTH(a.work_date)=%s AND YEAR(a.work_date)=%s
                       GROUP BY e.id""",(month,year))
        rows=cur.fetchall()
        cur.execute("DELETE FROM salary WHERE month=%s AND year=%s",(month,year))
        sql=("INSERT INTO salary(id,employee_id,month,year,total_work_days,total_shifts,"
             "bonus,penalty,total_salary,status,pay_date,created_at)"
             "VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,'processing',NOW(),NOW())")
        batch=[]
        for r in rows:
            base=r["days"]*r["salary_per_day"] if r["salary_type"]=="daily" else r["shifts"]*r["salary_per_shift"]
            bonus=penalty=0
            batch.append((gen.generate(),r["emp_id"],month,year,r["days"],r["shifts"],bonus,penalty,base))
        cur.executemany(sql,batch)
        conn.commit()
        print(f"Inserted {len(batch)} salary rows for {month}/{year}")
    conn.close()

if __name__=='__main__':
    run()
