import Calendar from './Calendar'
import HourSlider from './HourSlider'

const InfoScreen = () => {
    return (
        <div>
            <form className='side-panel'>
                <header className='title-header'>Information Screen</header>
                <div className='container'>
                    <div className='information'></div>
                    <Calendar />
                    <HourSlider />
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
