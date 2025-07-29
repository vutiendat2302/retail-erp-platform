package com.optima.hrm_erp.repository;

import com.optima.hrm_erp.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.*;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    public interface EmployeeJoinDateProjection {
        Long getId();
        String getName();
        LocalDate getJoinDate();
    }

    @Query("SELECT e.id AS id, e.name AS name, e.joinDate AS joinDate FROM Employee e")
    List<EmployeeJoinDateProjection> findEmployeeJoinDates();

    public interface BranchEmployeeCountProjection {
        Long getBranchId();
        String getBranchName();
        String getAddress();
        Long getEmployeeCount();
    }

    @Query("""
    SELECT b.id AS branchId, b.name AS branchName, b.address AS address, COUNT(e.id) AS employeeCount
    FROM Branch b
    LEFT JOIN Employee e ON b.id = e.branchId
    GROUP BY b.id, b.name, b.address
    """)
    List<BranchEmployeeCountProjection> countEmployeesByBranch();

    /**/
    public interface EmployeeViewProjection {
        Long getId();
        String getName();
        String getGender();
        String getEmail();
        String getStatus();
        String getBranchName();
        String getPositionName();
    }

    @Query("""
    SELECT 
        e.id AS id,
        e.name AS name,
        e.gender AS gender,
        e.email AS email,
        e.status AS status,
        b.name AS branchName,
        p.title AS positionName
    FROM Employee e
    LEFT JOIN Branch b ON e.branchId = b.id
    LEFT JOIN JobPosition p ON e.positionId = p.id
    """)
    List<EmployeeViewProjection> findAllWithBranchAndPosition();

    @Query("""
    SELECT 
        e.id AS id,
        e.name AS name,
        e.gender AS gender,
        e.email AS email,
        e.status AS status,
        b.name AS branchName,
        p.title AS positionName
    FROM Employee e
    LEFT JOIN Branch b ON e.branchId = b.id
    LEFT JOIN JobPosition p ON e.positionId = p.id
    """
    )
    Page<EmployeeViewProjection> findAllIn4(Pageable pageable);


    @Query("""
    SELECT 
        e.id AS id,
        e.name AS name,
        e.gender AS gender,
        e.email AS email,
        e.status AS status,
        b.name AS branchName,
        p.title AS positionName
    FROM Employee e
    LEFT JOIN Branch b ON e.branchId = b.id
    LEFT JOIN JobPosition p ON e.positionId = p.id
    WHERE (:status IS NULL OR e.status = :status)
      AND (:gender IS NULL OR e.gender = :gender)
    """)
    List<EmployeeViewProjection> findFiltered(@Param("status") String status,
                                              @Param("gender") String gender);



}
