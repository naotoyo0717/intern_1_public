import { ReactElement } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import "../../scss/Header.scss"; 

type AppBarprops = {
  appBarText: string
}

const HeaderAppBar = ({appBarText}: AppBarprops): ReactElement => {
  return (
      <Box sx={{width: "100vw"}}>
        <AppBar position='static'>
          <Toolbar>
            <Typography sx={{textAlign: 'center'}}>
              {appBarText}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
  );
}

export const Header = (): ReactElement => {
  return (
    <div>
      <HeaderAppBar appBarText={"Kinkei Diary"} />
    </div>
  );
}
