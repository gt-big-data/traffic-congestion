
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

// https://mui.com/components/slider/

const HourSlider = (props) => {



    const marks = [
        { value: 0, label: '0',},
        { value: 2, label: '2',},
        { value: 4, label: '4',},
        { value: 6, label: '6',},
        { value: 8, label: '8',},
        { value: 10, label: '10',},
        { value: 12, label: '12',},
        { value: 14, label: '14',},
        { value: 16, label: '16',},
        { value: 18, label: '18',},
        { value: 20, label: '20',},
        { value: 22, label: '22',},
        { value: 24, label: '24',},
      ];

    const updateHour = (e) => {
      console.log(e.target.value)
      props.setTime(e.target.value);
    }


    return (
        <Box id="slider" sx={{ width: 300 }}>
        <Slider
          defaultValue={12}
          step={2}
          valueLabelDisplay="auto"
          marks={marks}
          min={0}
          max={24}
          onChange={updateHour}
        />
      </Box>
    )
}

export default HourSlider