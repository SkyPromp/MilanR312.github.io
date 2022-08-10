/*var Module = require('./translate.js')
console.log(Module.toInt(53.3,5,5))*/
import React from 'react';
import test from './lss.mjs';


async function IntTranslate(number, exp, mant){
    console.log("exp = " + exp + " mant = " + mant)
    module = await test({
        noInitialRun: true,
        noExitRuntime: true
    })
    console.log(module)
    return await module.toInt(number,exp,mant)
} 


function Textinp(props){
    return <input type="text" name={props.name} value={props.obj[props.name]} onChange={props.handler}></input>
}
class oef extends React.Component{
    constructor(props){
        super(props)
        this.number = Math.random()*100
        this.state = {
            mantissa: '',
            exponent: ''
        }
        this.result = ""
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        console.log(this.state)
        this.setState({[event.target.name] : event.target.value})
    }

    
    async buttonHandler(event){
        console.log(this.number)
        try {
            this.result = await IntTranslate(this.number,parseInt(this.state.exponent), parseInt(this.state.mantissa))
        } catch (err) {
            console.log(err)
            alert("too small of an exponent, giant loss of accuracy")
        }
            console.log(this.result)
    }

    render(){
        return (
            <div>
                <p>{this.number}</p>
                <Textinp name="exponent" obj={this.state} handler={this.handleChange} />
                <Textinp name="mantissa" obj={this.state} handler={this.handleChange} />
                <button onClick={() => {this.buttonHandler()}}></button>
            </div>
        )
    }
}
export default oef;