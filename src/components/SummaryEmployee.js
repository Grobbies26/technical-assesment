import '../styles/Employee.css';
import {employeeList} from '../dataArrays/userArrays'
import React from 'react';

function Employee(props){
    const employee = props.employee
    const fullName = `${employee.Name} ${employee.Surname}`
    return(
        <li className={employee.Role}>
            <div>
                <span className={`role-${employee.Role}`}>{employee.Role}</span> 
                <span className='NameNumber'>{employee.EmployeeNumber} - {fullName}</span>
                <span className='BirthDate'>{employee.BirthDate}</span>
                <span className='Salary'>R{employee.Salary}.00</span>
            </div>
        </li>
    )
}

function RoleGroup(props){
    const list = props.employees.map((employee)=>
        <Employee key={employee.EmployeeNumber} employee={employee}/>
    )

    return (
        <div className="collapsible">
            <ul className=''>{list}</ul>
        </div>
    )
}

function EmployeeRoles(props){
    const managers = props.employees.managers
    const employees = props.employees.employees
    const trainees = props.employees.trainees
    
    return(
        <ul className='allEmployees'>
            <li key={0} className="managers">
                <RoleGroup employees={managers} />
            </li>
            <br/><br/>
            <li key={1} className="employees">
                <RoleGroup employees={employees} />
            </li>
            <br/><br/><br/><br/>
            <li key={2} className="trainees">
                <RoleGroup employees={trainees} />
            </li>
        </ul>
    )
}

function sort(employees){
    for(let i = 0; i < employees.length-1; i++){
        let highest = employees[i]
        for(let j = i+1; j < employees.length; j++ ){
            if(highest.Salary < employees[j].Salary){
                let temp = employees[j]
                employees[j] = employees[i]
                employees[i] = temp 
            }
        }
    }

    return employees
}

function groupByRole(list){
    let managers = []
    let employees = []
    let trainees = []
    list.forEach(employee => {
        if(employee.Role === "Manager"){
            managers.push(employee)
        }
        else if(employee.Role === "Employee"){
            employees.push(employee)
        }
        else{
            trainees.push(employee)
        }
    });
    
    managers = sort(managers)
    employees = sort(employees)
    trainees = sort(trainees)

    return {
        managers,
        employees,
        trainees
    }
}

function SummaryEmployee() {
    const employees = groupByRole(employeeList)
    
    return (
        <div className="Employees">
            <EmployeeRoles  employees={employees}/>
        </div>
    );
}

export default SummaryEmployee;
