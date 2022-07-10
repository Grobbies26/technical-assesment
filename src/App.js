import './styles/App.css';
import Employees from './components/Employee';
import { useState } from 'react';
import NavBar from './components/NavBar';
import { filterItems } from './dataArrays/userArrays'

function App() {
  const [searchTerm,setSearchTerm] = useState('')
  const [filterTerm,setFilterTerm] = useState('Name')
  const [searchDisabled,setSearchDisabled] = useState(false)
  const [dateDisabled,setDateDisabled] = useState(true)

  const list = filterItems.map((item,index)=>{
    return(
      <option key={index} value={item.value}>{item.title}</option>
    )
  })
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
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
        }}>{list}</select>
        <input id='SearchBar' type='text' placeholder='Search...' onChange={event => {setSearchTerm(event.target.value)}} disabled={searchDisabled} hidden={searchDisabled}/>
        <input id='DateBar' type='date' onChange={event => {setSearchTerm(event.target.value)}} disabled={dateDisabled} hidden={dateDisabled}></input>
      </div>
      <Employees searchTerm={searchTerm} filterTerm={filterTerm}/>
    </div>
  );
}

export default App;
