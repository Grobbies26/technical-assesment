import '../styles/SearchFilter.css';
import '../styles/App.css';
import { useState } from 'react';
import {employeeList, filterItems} from '../dataArrays/userArrays'

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

function defaultSortEmployees(list){
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

    return managers.concat(employees, trainees)
}

function Employees(props) {
    const employees = props.employees
    const searchTerm = props.searchTerm
    const filterTerm = props.filterTerm

    return employees.filter((employee) => {
        if(searchTerm === ''){
            return employee
        }

        if(filterTerm === "BirthDate"){
            const date = employee.BirthDate.split('-').reverse().join('-')
            
            if(date > searchTerm){
                return employee
            }
        }

        if(filterTerm === "FullName"){
            const fullName = `${employee.Name} ${employee.Surname}`
            if(fullName.toLowerCase().includes(searchTerm.toLowerCase())){
                return employee
            }  
            return null
        }

        if(employee[filterTerm].toString().toLowerCase().includes(searchTerm.toString().toLowerCase())){
            return employee
        }  
        
        return null
    })
    .map((employee)=>
        <Employee key={employee.EmployeeNumber} employee={employee}/>
    )
}

function SearchFilter() {
    const employees = defaultSortEmployees(employeeList)

    const [searchTerm,setSearchTerm] = useState('')
    const [filterTerm,setFilterTerm] = useState('Name')
    const [searchDisabled,setSearchDisabled] = useState(false)
    const [dateDisabled,setDateDisabled] = useState(true)

    const listFilter = filterItems.map((item,index)=>{
        return(
            <option key={index} value={item.value}>{item.title}</option>
        )
    })

    const list = <Employees employees={employees} searchTerm={searchTerm} filterTerm={filterTerm}/>

    return (
        <div className="Employees">
            <div className="SearchBar">
                <select defaultValue={'FullName'} onChange={event => {
                setFilterTerm(event.target.value); 
                setSearchTerm('');
                if(event.target.value === "BirthDate"){
                    setDateDisabled(false)
                    setSearchDisabled(true)
                }
                else{
                    setDateDisabled(true)
                    setSearchDisabled(false)
                }
                }}>{listFilter}</select>
                <input id='SearchBar' type='text' placeholder='Search...' onChange={event => {setSearchTerm(event.target.value)}} disabled={searchDisabled} hidden={searchDisabled}/>
                <input id='DateBar' type='date' onChange={event => {setSearchTerm(event.target.value)}} disabled={dateDisabled} hidden={dateDisabled}></input>
            </div>
            <ul>{list}</ul>
        </div>
    );
}

export default SearchFilter;
