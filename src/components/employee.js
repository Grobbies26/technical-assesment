import '../styles/Employee.css';
import {employeeList} from '../dataArrays/userArrays'

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
    const employees = defaultSortEmployees(employeeList)
    const searchTerm = props.searchTerm
    const filterTerm = props.filterTerm
    const list = employees.filter((employee) => {
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

    return (
        <div className="Employees">
            <ul>{list}</ul>
        </div>
    );
}

export default Employees;
