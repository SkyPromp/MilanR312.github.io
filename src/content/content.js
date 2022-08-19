/*var Module = require('./translate.js')
console.log(Module.toInt(53.3,5,5))*/
import React from 'react';
import "./oef.css"

function Textinp(props){
    return (
    <div>
        <label htmlFor={props.name}>{props.name} {props.label}</label>
        <input type="text" id={props.name} name={props.name} value={props.obj[props.name]} onChange={props.handler}></input>
    </div>
    )
}

class oef extends React.Component{
    constructor(props, state, checkingFunction, className_t){
        super(props)
        this.number = Math.random()*100
        this.state = state
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
        console.log(this.number)
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
        alert(this.result)
    }

    check(){
        console.log(this.result)
        console.log(this.state.result)
        this.correct = this.checkingFunction(this.result, this.state.result)
        //this.result == this.state.result
        alert(this.correct)

    }
    inputs(){
        return (
            <p>add your custom buttons</p>
        )
    }
    render(){
        return (
            <div className={this.className_t}>
                <p>{this.number}</p>

                {this.inputs()}
                
                <Textinp name="result" obj={this.state} handler={this.handleChange} />
                <button onClick={() => {this.buttonHandler();this.getAnswer()}}>GetAnswer</button>
                <button onClick={() => {this.check()}}>check</button>
            </div>
        )
    }
}

export default oef;