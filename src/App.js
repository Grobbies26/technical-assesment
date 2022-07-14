import './styles/App.css';
import NavBar from './components/NavBar';
import SearchFilter from './components/SearchFilter';
import SummaryEmployee from './components/SummaryEmployee';
import Hierarchy from './components/HierarchyTree';
import axios from 'axios'
import {useState, useEffect } from 'react';
import {employeeList} from './dataArrays/userArrays'

function App() {
  const [employees,setEmployees] = useState(employeeList)
  
  // const fetchData = async () => {
  //   const {data, status} = await axios.get(
  //     process.env.REACT_APP_APIURL
  //   )
  //   if(status === 200){
  //     setEmployees(data)
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // },[])
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <SearchFilter employees={employees} />
      <Hierarchy employees={employees} />
      <SummaryEmployee employees={employees}/>
    </div>
  );
}

export default App;
