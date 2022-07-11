import '../styles/NavBar.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function NavBar() {
    return (
        <div>
            {/* <BrowserRouter>
                <Routes>
                    <Route path="/" />
                    <Route path="/hierarchy" />
                    <Route path="/summary" />
                </Routes>
            </BrowserRouter> */}
            <ul className='menuItems'>
                {/* <li><a href='http://loclahost:3000/'>Home</a></li>
                <li><a href='http://loclahost:3000/'>Hierarchy</a></li>
                <li><a href='http://loclahost:3000/'>Summary</a></li> */}
                <li><a href='/#'>Home</a></li>
                <li><a href='/#'>Hierarchy</a></li>
                <li><a href='/#'>Summary</a></li>
            </ul>
        </div>
    );
}

export default NavBar;
