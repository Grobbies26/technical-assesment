import '../styles/NavBar.css'

const menuItems = [
    { title:'Home', },
    { title:'Hierarchy', },
    { title:'Summary', },
]

function Item(props){
    const item = props.item
    
    return(
        <li className='menuItems'>
            <a href='/#'>{item.title}</a>
        </li>
    )
}

function NavBar() {
    const list = menuItems.map((item,index)=>
        <Item key={index} item={item}/>
    )

    return (
        <nav className="NavBar">
            <ul> {list} </ul>
        </nav>
    );
}

export default NavBar;
