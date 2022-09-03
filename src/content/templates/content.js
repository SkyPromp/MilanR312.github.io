/*var Module = require('./translate.js')
console.log(Module.toInt(53.3,5,5))*/
import React from 'react';
import { Textinp } from './textinp';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

class oef extends React.Component{
    constructor(props, checkingFunction, className_t){
        super(props)
        this.state = {}
        
        console.log("state")
        console.log(this.state)
        /*{
            mantissa: '',
            exponent: '',
            result: ''
        }*/
        this.checkingFunction = checkingFunction
        this.result = ""
        this.correct = false
        this.handleChange = this.handleChange.bind(this)
        this.translator = this.translator.bind(this)
        this.className_t = className_t

    }
    componentDidMount(){
        this.nextNumber()
    }
    //gets overwritten
    translator(a,b){
        return null
    }

    handleChange(event){
        console.log(event.target.name)
        this.setState({[event.target.name] : event.target.value}, this.buttonHandler)
        console.log(this.state.mantissa)

    }

    async buttonHandler(){
        console.log(this.state.number)
        try {
            this.result = await this.translator()
            //IntTranslate(this.number,parseInt(this.state.exponent), parseInt(this.state.mantissa))
        } catch (err) {
            console.log(err)
            alert("too small of an exponent, giant loss of accuracy")
        }
        console.log("result ==")
        console.log(this.result)
    }

    getAnswer(){
        this.setState((state,props) => ({
            result: this.result,
        })) 
    }

    check(){
        console.log(this.result)
        console.log(this.state.result)
        this.correct = this.checkingFunction(this.result, this.state.result)
        //this.result == this.state.result
        alert(this.correct ? "Correct" : "incorrect")

    }
    inputs(){
        return (
            <p>add your custom buttons</p>
        )
    }
    nextNumber(){
        this.setState((state,props) => ({
            number: Math.random()*200
        })) 
    }
    render(){
        return (
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <p>{this.state.number}</p>

                {this.inputs()}

                <Textinp name="result" obj={this.state} handler={this.handleChange} />
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Button onClick={async () => {await this.buttonHandler();this.getAnswer()}}>GetAnswer</Button>
                    <Button onClick={() => {this.check()}}>check</Button>
                    <Button onClick={() => this.nextNumber()}>Next</Button>
                </Box>
                
            </Box>

        )
    }
}

export default oef;