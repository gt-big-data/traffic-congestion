
import Calendar from './Calendar'
import HourSlider from './HourSlider'
import React, { useState, useEffect} from 'react';


const InfoScreen = (props) => {

    // useEffect(() => {
    //     // call api here to retrieve data
    //     let data = [[-77.0364,38.8951, 5], [35.929673	-78.948237, 4], [38.032120	-78.477510, 3], [44.920474   -93.447851, 2], [-38.416097, -63.616672, 1]]
    //     setData(data)
    // }, []);


    return (
        <div>
            <form className='side-panel'>
                <header className='title-header'>Information Screen</header>
                <div className='container'>
                    <div className='information'></div>
                    <Calendar setDay= {props.setDay} setMonth= {props.setMonth} setYear= {props.setYear} />
                    <HourSlider setTime= {props.setTime}/>
                    <div className="selectedDate">
                        <p>Selected Date and Time</p>
                        {props.day ? 
                            <p>{props.time} o'clock {props.month} {props.day} {props.year}</p>
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