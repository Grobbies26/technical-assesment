import '../styles/Hierarchy.css';
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

class Employe{
    constructor(props){
        this.Children = []
        this.parent = null
    }

    render(props){
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
}

function createBranch(props){

}

function Hierarchy(props) {
    const employees = employeeList
    const list = employees.map((employee)=>
        <Employee key={employee.EmployeeNumber} employee={employee}/>
    )

    return (
        <div className="Hierarchy">
            <ul>{list}</ul>
        </div>
    );
}

export default Hierarchy;
