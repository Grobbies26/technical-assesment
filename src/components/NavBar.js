import '../styles/NavBar.css'

function NavBar() {
    return (
        <div className='Nav'>
            <ul className='menuItems'>
                <li><a href='#SearchFilter'>Search</a></li>
                <li><a href='#Hierarchy'>Hierarchy</a></li>
                <li><a href='#Summary'>Summary</a></li>
            </ul>
        </div>
    );
}

export default NavBar;
