import './Header.css';
import test from './data.json'
import {Outlet,Link as ReactLink} from "react-router-dom";
import { AppBar, Link, Toolbar, Typography, Menu, SvgIcon, Button } from '@mui/material';
import { Box } from '@mui/system';

function Lnk(props){

    return (
        //<Link color="red" variant='body2' component={ReactLink} underline="hover" to={props.to}>{props.to}</Link>
        <Button LinkComponent={ReactLink} to={props.to}><p style={{color: "white"}}>{props.to}</p></Button>
        )
}

function header() {
    return (
        <Box>
            <nav>
                <AppBar position='static'>
                    <Toolbar disableGutters>
                        <SvgIcon sx={{width: '15%'}} viewBox='-10 0 70 10'>
                            <path d="M 0 0 Z M 23.5184 0.1388 L 20.7416 0.1388 L 20.7416 6.605 C 20.7262 11.1629 29.3941 11.1629 29.4095 6.605 L 29.4095 0.1388 L 26.6327 0.1388 L 26.6327 6.605 C 26.6178 8.128 23.6825 8.1688 23.525 6.7276 A 1.4071 1.2592 0 0 1 23.5184 6.605 L 23.5184 0.1388 Z M 35.5 9.8586 L 42.6798 9.8586 L 42.6798 7.4287 L 38.2615 7.4287 L 38.2615 0.1388 L 35.5 0.1388 L 35.5 9.8586 Z M 14.8351 0.0015 A 5.1549 4.6129 0 0 0 11.5545 0.9618 C 10.9014 1.4508 10.4516 2.1278 10.3582 2.9956 A 3.9791 3.5608 0 0 0 10.3401 3.3376 L 10.3401 6.6599 C 10.3401 8.5149 11.9098 9.5968 13.7396 9.9042 A 6.0336 5.3993 0 0 0 14.8505 9.9959 C 15.6789 9.9959 16.4509 9.8089 16.6147 9.7569 L 14.605 7.8128 C 14.3985 7.8183 13.7194 7.7551 13.3179 7.2766 A 1.1325 1.0134 0 0 1 13.0862 6.6599 L 13.0862 3.3376 A 1.1205 1.0027 0 0 1 13.7971 2.433 C 14.4289 2.1585 15.3442 2.1616 15.9549 2.4523 A 1.0991 0.9835 0 0 1 16.5994 3.3376 L 16.5994 5.8362 L 18.7932 7.8268 L 19.0074 8.0332 A 3.4029 3.0451 0 0 0 19.2453 7.4312 A 3.8354 3.4322 0 0 0 19.3455 6.6599 L 19.3455 3.3376 C 19.3455 1.482 17.7758 0.4006 15.946 0.0931 A 6.0336 5.3993 0 0 0 14.8351 0.0015 Z M 14.3289 6.8795 L 15.8477 5.6989 L 19.637 9.1448 L 18.1182 10.3666 Z M 33.7818 0.1388 L 31.0357 0.1388 L 31.0357 9.8586 L 33.7818 9.8586 L 33.7818 0.1388 Z M 0 9.8586 L 3.7893 0.1388 L 6.29 0.1388 L 10.1713 9.8586 L 7.2258 9.8586 L 6.5201 7.9092 L 5.8604 5.7263 L 5.1087 2.8845 L 5.032 2.8845 L 4.2342 5.7263 L 4.7468 5.7263 L 5.4064 7.9092 L 3.6206 7.9092 L 2.9455 9.8586 Z M 42.8178 9.8586 L 46.6072 0.1388 L 49.1078 0.1388 L 52.9892 9.8586 L 50.0436 9.8586 L 49.3379 7.9092 L 48.6783 5.7263 L 47.9265 2.8845 L 47.8498 2.8845 L 47.0521 5.7263 L 47.718 5.7263 L 48.3777 7.9092 L 46.4384 7.9092 L 45.7634 9.8586 Z" />
                        </SvgIcon>
                        <Box >
                            <Lnk to="ieee"></Lnk>
                            <Lnk to="int"></Lnk>
                            <Lnk to="Apple"></Lnk>
                        </Box>
                            
                        
                    </Toolbar>
                </AppBar>
            </nav>
            <Outlet />
        </Box>
    );
}

export default header;
