import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css'

export default function Footer() {
    return(
        <motion.div className='footer-container'
            initial={{ opacity:0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className='footer-line'></div>
            <div className='footer'>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <i class="fab fa-dev fa-2x"></i>
                    <div style={{ padding: 8}}>
                        This project is created by <a href='https://github.com/blackviking27'>me</a>
                    </div>
                </div>
                <div style={{ display:'flex', justifyContent: 'space-between' }}>
                    <i class="fab fa-github fa-2x"></i>
                    <div style={{ padding: 8 }}>
                        Source code available<a href='https://github.com/blackviking27'> here</a></div>
                </div> 
            </div>
        </motion.div>
    )
}