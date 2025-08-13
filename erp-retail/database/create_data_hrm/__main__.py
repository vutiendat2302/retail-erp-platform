modules = [
    # "01_seed_branch",
    "02_seed_department",
    "03_seed_job_position",
    "04_seed_shift",
    "05_seed_employee",
    "05b_set_managers",
    "06_seed_attendance",
    "07_seed_salary",
]

if __name__ == "__main__":
    for m in modules:
        mod = __import__(m)
        mod.run()
        print(f"--> {m} done")
