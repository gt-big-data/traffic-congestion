
import Calendar from './Calendar'
import HourSlider from './HourSlider'
import React, { useState, useEffect} from 'react';


const InfoScreen = () => {
    const [month, setMonth] = useState("Oct");
    const [year, setYear] = useState(2022);
    const [time, setTime] = useState(12);
    const [day, setDay] = useState(0)
    const [data, setData] = useState([])


    useEffect(() => {
        // call api here to retrieve data
        let data = [[-77.0364,38.8951, 5], [35.929673	-78.948237, 4], [38.032120	-78.477510, 3], [44.920474   -93.447851, 2], [-38.416097, -63.616672, 1]]
        setData(data)
    }, []);


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