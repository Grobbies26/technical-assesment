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

function Employees(props) {
    const employees = employeeList
    const searchTerm = props.searchTerm
    const filterTerm = props.filterTerm
    const list = employees.filter((employee) => {
        if(searchTerm === ''){
            return employee
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
