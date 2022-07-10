import './styles/App.css';
import Employees from './components/Employee';
import { useState } from 'react';
import NavBar from './components/NavBar';
import { filterItems } from './dataArrays/userArrays'

function App() {
  const [searchTerm,setSearchTerm] = useState('')
  const [filterTerm,setFilterTerm] = useState('Name')

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
        <select defaultValue={'Full Name'} onChange={event => {setFilterTerm(event.target.value)}}>{list}</select>
        <input type='text' placeholder='Search...' onChange={event => {setSearchTerm(event.target.value)}}/>
      </div>
      <Employees searchTerm={searchTerm} filterTerm={filterTerm}/>
    </div>
  );
}

export default App;
