import '../styles/NavBar.css'

function NavBar() {
    return (
        <div>
            <ul className='menuItems'>
                <li><a href='#SearchFilter'>Search</a></li>
                <li><a href='#Hierarchy'>Hierarchy</a></li>
                <li><a href='#Summary'>Summary</a></li>
            </ul>
        </div>
    );
}

export default NavBar;
