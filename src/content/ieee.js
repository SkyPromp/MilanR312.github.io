import oef from "./content.js"
import test from './translate.mjs';

function Textinp(props){
    return (
    <div>
        <label htmlFor={props.name}>{props.name} {props.label}</label>
        <input type="text" id={props.name} name={props.name} value={props.obj[props.name]} onChange={props.handler}></input>
    </div>
    )
}

async function IntTranslate(number, exp, mant){
    console.log("exp = " + exp + " mant = " + mant)
    module = await test({
        noInitialRun: true,
        noExitRuntime: true
    })
    console.log(module)
    return await module.FloatToInt(number,exp,mant)
} 
class ieee extends oef{
    constructor(props){
        super(
            props,
            { 
                result: '', //result
                exponent: '', //exponent or decimals
                mantissa: ''    //mantissa or /
            },
            (a,b) => a==b,
            "IEEE oef"
        )
    };
    translator(){
        return IntTranslate(this.number, parseInt(this.state.exponent), parseInt(this.state.mantissa))
    }
    inputs(){
        return (
            <div>
            <Textinp name="mantissa" obj={this.state} handler={this.handleChange} label="bits "/>
            <Textinp name="exponent" obj={this.state} handler={this.handleChange} label="bits "/>
            </div>
        )
    }
}
export default ieee;