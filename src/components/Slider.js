import React, { useState } from 'react';
import './Slider.css';

export default function Slider({ setLength,feedback, background }){

    const [length, setLen] = useState(0);
    const handleChange = (e) => {
        e.preventDefault();
        setLen(e.target.value)
        setLength(e.target.value)
    }

    return(
        <div>
            <div className='slider-container'>
                <input type='range' min='0' max='50' id="slider" value={length} className='slider' onChange={handleChange}/>
            </div>
            <div className='display-value'>
                <div style={{color:`${background}`}}>
                    Feedback: {`${feedback}`}
                </div>
                <div>
                    Length:{`${length}`}
                </div>
            </div>
        </div>
    )
}