
import Calendar from './Calendar'
import HourSlider from './HourSlider'
import React, { useState } from 'react';

const InfoScreen = () => {
    const [month, setMonth] = useState("Oct");
    const [year, setYear] = useState(2022);
    const [time, setTime] = useState(12);
    const [day, setDay] = useState(0)

    return (
        <div>
            <form className='side-panel'>
                <header className='title-header'>Information Screen</header>
                <div className='container'>
                    <div className='information'></div>
                    <Calendar setDay= {setDay} setMonth= {setMonth} setYear= {setYear} />
                    <HourSlider setTime= {setTime}/>
                    <div className="selectedDate">
                        <p>Selected Date and Time</p>
                        {day ? 
                            <p>{time} o'clock {month} {day} {year}</p>
                          :<><p>Select Day from Calendar!</p></> }
                        
                    </div>
                    
                    <div className='links'>
                        <a className='link' href=''>Home</a>
                        <a className='link' href=''>Tutorial</a>
                        <a className='link' href=''>About</a>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default InfoScreen