import React, { useState } from 'react';
import Box from '@mui/material/Box';
import birb from '../../../assets/cowbird-image.jpg';
import baron from '../../../assets/Dore-munchausen-illustration.jpg';

const Summary = () => {

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <div style={{display: 'inline-block', 'vertical-align': 'top'}}>
                    <img width='50' height='50' src={ birb } />
                    <img width='75' height='100' src={ baron } />
                </div>
                <div style={{display: 'inline-block', float: 'center'}}>
                    <p style={{float: 'center', color: 'red'}} className="float-right">testing text element</p>
                </div>
            </Box>
        </div>
    );
};

export default Summary;