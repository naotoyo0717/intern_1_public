import { ReactElement } from 'react';
import { AppBar, Box, Typography } from '@mui/material';

import "../../scss/footer.scss";

export const Footer = (): ReactElement => {
  return (
    <div id='footer' className='footer'>
      <AppBar component='footer' position='static'>
        <Box sx={{textAlign: 'center'}}>
          <Typography variant='caption'>
            Software Version intern-2024
            <br/>
            Copyright 2024 KINKEI SYSTEM CORPORATION. All Rights Reserved.
          </Typography>
        </Box>
      </AppBar>
    </div>
  )
}
