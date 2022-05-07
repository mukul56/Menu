import React from "react";
import './Nav.css';
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => {
  return (
    <nav>
      <div className="nav-items left">
        <NavLink to="/" style={({ isActive }) => ({ 
                borderBottom: isActive ? '3px solid white' : '',
                paddingBottom: isActive ? '4px' : '',
                fontWeight: isActive ? 'bold' : ''
        })}
        >Home</NavLink>
        <NavLink to="/about" style={({ isActive }) => ({ 
                borderBottom: isActive ? '3px solid white' : '',
                paddingBottom: isActive ? '4px' : '',
                fontWeight: isActive ? 'bold' : ''
        })}
        >About</NavLink>
      </div>
      <h1>Menu</h1>
    </nav>
  )
}

export default Nav;