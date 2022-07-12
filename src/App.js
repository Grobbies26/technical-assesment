import './styles/App.css';
import NavBar from './components/NavBar';
import SearchFilter from './components/SearchFilter';
import SummaryEmployee from './components/SummaryEmployee';
import Hierarchy from './components/HierarchyTree';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <SearchFilter/>
      <Hierarchy />
      <SummaryEmployee />
    </div>
  );
}

export default App;
