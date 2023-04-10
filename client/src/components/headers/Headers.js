import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from '../headers/icon/bars-solid.svg'
import Close from '../headers/icon/xmark-solid.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'


function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')

        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
              <li><Link to="/create_product">Create Products</Link></li>
              <li><Link to="/category">Categories</Link></li>
            </>
        )
    }
    const loggedRouter = () =>{
        return(
            <>
              <li><Link to="/history">History</Link></li>
              <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

 
    const styleMenu = {
        left: menu ? 0 : "-100%"
    }
     
    
    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30"/>
            </div>

            <div className="logo">
                <h1>
                    <Link to="/products">MODAN BAKERIES</Link>
                </h1>
            </div>

            
            <ul style={styleMenu}>
                
                 
                <li><Link to="/products">{isAdmin ? 'Products' : 'MODAN BAKERY SHOP'}</Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login * Register</Link></li>

                }
                {
                    
                isAdmin ? '' 
                
                :<li><div className="cart-icon">
                    <Link to="/cart">
                    <img src={Cart} alt="" width="30"/>
                    <span>{cart.length}</span>
                    </Link>
                    
                </div>
                </li>
              
            }

               
                <li onClick={() => setMenu(!menu)} className="menu">
                    <img src={Close} alt=""width="30" />
                </li>
            </ul> 


           
        </header>
    )
    }
export default Header