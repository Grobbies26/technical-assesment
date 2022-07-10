import './styles/App.css';
import Employees from './components/Employee';
import { useState } from 'react';
import NavBar from './components/NavBar';

const employeeList = [
  {"Name":"John", "Surname":"Smith", "BirthDate": "18-11-1980", "EmployeeNumber": 1, "Salary": 700000, "Role": "Manager", "ReportingLine": -1,},
  {"Name":"Jane", "Surname":"Doe", "BirthDate": "31-01-1995", "EmployeeNumber": 2, "Salary": 150000, "Role": "Employee", "ReportingLine": 1,},
  {"Name":"Jim", "Surname":"Bean", "BirthDate": "23-03-1987", "EmployeeNumber": 3, "Salary": 175000, "Role": "Employee", "ReportingLine": 2,},
  {"Name":"Roger", "Surname":"Wilco", "BirthDate": "27-12-1978", "EmployeeNumber": 4, "Salary": 100000, "Role": "Trainee", "ReportingLine": 3,},
  {"Name":"Susan", "Surname":"Roe", "BirthDate": "20-08-1986", "EmployeeNumber": 5, "Salary": 100000, "Role": "Trainee", "ReportingLine": 3,},
  {"Name":"John", "Surname":"Did", "BirthDate": "31-01-1995", "EmployeeNumber": 6, "Salary": 750000, "Role": "Manager", "ReportingLine": -1,},
  {"Name":"Josh", "Surname":"Taylor", "BirthDate": "15-07-1992", "EmployeeNumber": 7, "Salary": 150000, "Role": "Employee", "ReportingLine": 6,},
  {"Name":"Gilad", "Surname":"Mannington", "BirthDate": "20-11-2997", "EmployeeNumber": 69, "Salary": 110000, "Role": "Trainee", "ReportingLine": 7,},
]

function App() {
  const [searchTerm,setSearchTerm] = useState('')
  const [filterTerm,setFilterTerm] = useState('Name')

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <div className="SearchBar">
        <input type='text' placeholder='Filter' onChange={event => {setFilterTerm(event.target.value)}}/>
        <input type='text' placeholder='Search...' onChange={event => {setSearchTerm(event.target.value)}}/>
      </div>
      <Employees employeeList={employeeList} searchTerm={searchTerm} filterTerm={filterTerm}/>
    </div>
  );
}

export default App;
