import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './PasswordStrength.css'

async function check(password){

    let state = {
        upperCase: false,
        lowerCase: false,
        number: false,
        symbol: false,
        length: false,
        strength: 0
    }

    //Checking for cases
    if(password.match(/[A-Z]+/g)){
        state.strength += 1
        state.upperCase = true
    }
    if(password.match(/[a-z]+/g)){
        state.strength += 1
        state.lowerCase = true
    }
    if(password.match(/([0-9]+)/g)){
        state.strength += 1
        state.number = true
    }
    if(password.match(/\W+/g)){
        state.strength += 1
        state.symbol = true
    }
    if(password.length >= 8){
        state.strength += 1
        state.length = true
    }

    return state.strength;
}

function PasswordStrength(){

    const [password, setPassword] = useState('');
    const [progress, setProgress] = useState(0);
    const [background, setBackground] = useState('#ffffff');
    const [feedback, setFeedback] = useState('');

    useEffect( async () =>{
        const data = await check(password)
        setProgress((data/5)*100)
        // console.log(progress)
        if (data == 1){
            setBackground('#ff4a4a');
            setFeedback('Very Weak')
        }else if(data == 2){
            setBackground('#e8fa12')
            setFeedback('Weak')
        }else if(data == 3){
            setBackground('#7cfe72')
            setFeedback('Good')
        }else if(data == 4){
            setBackground('#0dba00')
            setFeedback('Strong')
        }else if(data == 5){
            setBackground('#00d6bd')
            setFeedback('Very Strong')
        }
        // console.log(progress)
    }, [password])


    return(
        <motion.div className='container'
            initial={{ y: '-100vh'}}
            animate={{ y: 0 }}
            transition={{ type:'spring', stiffness:120, delay: 0.6 }}
        >
            <h3 className="heading">Password Strength</h3>
            <input className="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
            <div className="progress">
                <div className="progress-bar" style={{ width: `${progress}%`, background: `${background}`}}></div>
            </div>
            <h5>{`${feedback}`}</h5>
        </motion.div>
    )
}

export default PasswordStrength;