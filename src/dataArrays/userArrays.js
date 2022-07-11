const menuItems = [
  { title:'Home', },
  { title:'Hierarchy', },
  { title:'Summary', },
]

const filterItems = [
  { title:'Birth Date', value:'BirthDate', },
  { title:'Employee Role', value:'Role', },
  { title:'ID', value:'EmployeeNumber', },
  { title:'Full Name', value:'FullName', },
  { title:'Name', value:'Name', },
  { title:'Surname', value:'Surname', },
  { title:'Salary', value:'Salary', },
]

const employeeList = [
  {"Name":"John", "Surname":"Smith", "BirthDate": "18-11-1980", "EmployeeNumber": 1, "Salary": 700000, "Role": "Manager", "ReportingLine": -1,},
  {"Name":"Jane", "Surname":"Doe", "BirthDate": "31-01-1995", "EmployeeNumber": 2, "Salary": 150000, "Role": "Employee", "ReportingLine": 1,},
  {"Name":"Jim", "Surname":"Bean", "BirthDate": "23-03-1987", "EmployeeNumber": 3, "Salary": 175000, "Role": "Employee", "ReportingLine": 2,},
  {"Name":"Roger", "Surname":"Wilco", "BirthDate": "27-12-1978", "EmployeeNumber": 4, "Salary": 100000, "Role": "Trainee", "ReportingLine": 3,},
  {"Name":"Susan", "Surname":"Roe", "BirthDate": "20-08-1986", "EmployeeNumber": 5, "Salary": 100000, "Role": "Trainee", "ReportingLine": 3,},
  {"Name":"John", "Surname":"Did", "BirthDate": "31-01-1995", "EmployeeNumber": 6, "Salary": 750000, "Role": "Manager", "ReportingLine": -1,},
  {"Name":"Josh", "Surname":"Taylor", "BirthDate": "15-07-1992", "EmployeeNumber": 7, "Salary": 150000, "Role": "Employee", "ReportingLine": 6,},
  {"Name":"Gilad", "Surname":"Mannington", "BirthDate": "20-11-1997", "EmployeeNumber": 69, "Salary": 110000, "Role": "Trainee", "ReportingLine": 7,},
]

export {menuItems, filterItems, employeeList}
