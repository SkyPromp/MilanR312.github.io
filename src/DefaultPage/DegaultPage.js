import { Box } from '@mui/system';
import React from 'react';


export class DefaultPage extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.getUsers()
    }
    getUsers = () => {
        fetch("https://github.com/MilanR312/AquilaBot")
        .then(console.log)
        .catch(console.log)
    }
    render(){
        return (
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>


            </Box>
        )
    }
}