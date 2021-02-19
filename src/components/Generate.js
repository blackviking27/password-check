import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Slider from './Slider';
import './Generate.css'

async function generate(state){
    let characters = '';
    let password = '';
    let strength = 0;

    const setUppercase = (isUpper) => {
        if(isUpper){
            characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            strength += 1
        }
    }
    
    const setLowercase = (isLower) => {
        if(isLower){
            characters += 'abcdefghijklmnopqrstuvwxyz';
            strength += 1
        }
    }
    const setNumber = (isNumber) => {
        if(isNumber){
            characters += '0123456789';
            strength += 1
        }
    }
    const setSymbol = (isSymbol) => {
        if(isSymbol){
            characters += '!@#$%^&*()<>,.?/[]{}-=_+|/';
            strength += 1
        }
    }

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * ( max - min + 1)) + min;
    }
    
    if(state.pwdLength != 0 && (state.isUpper || state.isLower || state.isNumber || state.isSymbol)){
        setUppercase(state.isUpper);
        setLowercase(state.isLower);
        setNumber(state.isNumber);
        setSymbol(state.isSymbol);

        if(state.pwdLength >= 8 && state.pwdLength < 15){
            strength += 1
        }else if(state.pwdLength <= 4 ){
            strength = 1
        }else if(state.pwdLength <= 7){
            strength = 2
        }else if(state.pwdLength >= 15){
            strength += 2
        }
    }
    
    if(characters.length){
        for(let i = 0;i < state.pwdLength; i++){
            password += characters[getRandomInt(0, characters.length -1)];
        }
    }
    return {password,strength}

}

export default function GeneratePassword(){
    
    const [upper, setUpper] = useState(false);
    const [lower, setLower] = useState(false);
    const [number, setNumber] = useState(false);
    const [symbol, setSymbol] = useState(false);

    const [length, setLength] = useState(0);

    const [password, setPassword] = useState('');

    const [feedback, setFeedback] = useState('');
    const [background, setBackground] = useState('');

    async function genPassword() {
        var state = {
            isUpper: upper,
            isLower: lower,
            isNumber: number,
            isSymbol: symbol,
            pwdLength: length
        }
        return await generate(state)
    }

    useEffect( async() => {
        const data = await  genPassword()
        // console.log(data)
        setPassword(data.password)

        if (data.strength == 1){
            setBackground('#ff4a4a');
            setFeedback('Very Weak')
        }else if(data.strength == 2){
            setBackground('#fec619')
            setFeedback('Weak')
        }else if(data.strength == 3){
            setBackground('#7cfe72')
            setFeedback('Good')
        }else if(data.strength == 4){
            setBackground('#0dba00')
            setFeedback('Strong')
        }else if(data.strength == 5){
            setBackground('#00d6bd')
            setFeedback('Very Strong')
        }else if(data.strength == 0){
            setBackground('#fff')
            setFeedback('')
        }
    }, [upper, lower, number, symbol, length])
    
    return(
        <motion.div className="gen-container"
            initial={{ y: '-100vh' }}
            animate={{ y: 0 }}
            transition={{  type:'spring', stiffness:120, duration:0.6 }}
        >
            <div className="gen">
                <h2 style={{ display:'flex', justifyContent:'center' }}>Generate password</h2>
                {/* Password Display */}
                <div className='password-container'>
                    <div className='password-display'>
                        {`${password}`}
                    </div>
                    <div className='icons'>
                        <i class="fas fa-redo" onClick={ async() => { var tmp = await genPassword(); setPassword(tmp.password)}}></i>
                        <CopyToClipboard text={password} onCopy={() => alert('Password Copied')}>
                            <i class="fas fa-clipboard"></i>
                        </CopyToClipboard>
                    </div>
                </div>
                
                {/* Slider */}
                <Slider setLength={setLength} feedback={feedback} background={background} />

                {/* Options */}
                <div className='gen-options'>

                    <div className='checkbox-wrapper'>
                        <input type='checkbox' id='check1' hidden onChange={() => setUpper(!upper)}></input>
                        <label for='check1' className='checkmark'></label>
                        <div style={{ padding:'5px' }}>Upper Case</div>
                    </div>

                    <div className='checkbox-wrapper'>
                        <input type='checkbox' id='check2' hidden onChange={() => setLower(!lower)}></input>
                        <label for='check2' className='checkmark'></label>
                        <div style={{ padding:'5px' }}>Lower Case</div>
                    </div>

                    <div className='checkbox-wrapper'>
                        <input type='checkbox' id='check3' hidden onChange={() => setNumber(!number)}></input>
                        <label for='check3' className='checkmark'></label>
                        <div style={{ padding:'5px' }}>Number</div>
                    </div>

                    <div className='checkbox-wrapper'>
                        <input type='checkbox' id='check4' hidden onChange={() => setSymbol(!symbol)}></input>
                        <label for='check4' className='checkmark'></label>
                        <div style={{ padding:'5px' }}>Symbol</div>
                    </div>

                </div>
            </div>
        </motion.div>
    )
}
