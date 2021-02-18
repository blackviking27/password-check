import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar(){
    return(
        <motion.div className="nav-container"
            initial={{ opacity:0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="nav">
                <div className='nav-icon'>
                    <Link to='/' className='main-icon'>
                        <i className="fas fa-lock fa-2x"></i>
                    </Link>
                    <div style={{ padding: 8 }}>
                        PASSWORD CHECK
                    </div>
                </div>
                <ul className="nav-items">
                    <li>
                        <Link className="nav-item" to='/'>
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-item" to='/generatepassword'>
                            GENERATE
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="line"></div>
        </motion.div>
    )
}