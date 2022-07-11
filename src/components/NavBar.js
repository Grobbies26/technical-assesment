import '../styles/NavBar.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from '../Pages/HomePage'
import HierarchyPage from '../Pages/HierarchyPage'
import SummaryPage from '../Pages/SummaryPage'

function NavBar() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/hierarchy" element={<HierarchyPage/>} />
                    <Route path="/summary" element={<SummaryPage/>} />
                </Routes>
            </BrowserRouter>
            <ul className='menuItems'>
                <li><a href='http://loclahost:3000/'>Home</a></li>
                <li><a href='http://loclahost:3000/hierarchy'>Hierarchy</a></li>
                <li><a href='http://loclahost:3000/summary'>Summary</a></li>
            </ul>
        </div>
    );
}

export default NavBar;
