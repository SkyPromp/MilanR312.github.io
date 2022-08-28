import oef from "./templates/content.js"
import test from './data/translate.mjs';
import { Textinp } from "./templates/textinp.js";


async function IntTranslate(number, exp, mant){
    console.log("exp = " + exp + " mant = " + mant)
    module = await test({
        noInitialRun: true,
        noExitRuntime: true
    })
    console.log(module)
    return await module.AppleToInt(number,exp,mant)
} 
class Apple extends oef{
    constructor(props){
        super(
            props,
            (a,b) => a==b,
            "IEEE oef"
        )
        this.state = { 
            number: 2,
            result: '', //result
            exponent: '4', //exponent or decimals
            mantissa: '4'    //mantissa or /
        }
    };
    translator(){
        return IntTranslate(this.state.number, parseInt(this.state.exponent), parseInt(this.state.mantissa))
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
export default Apple;