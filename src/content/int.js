import oef from "./templates/content.js"
import test from './data/translate.mjs';
import { Textinp } from "./templates/textinp.js";

async function IntTranslate(number, decimals){
    console.log("num = " + number + " dec = " + decimals)
    module = await test({
        noInitialRun: true,
        noExitRuntime: true
    })
    console.log(module)
    return await module.IntToInt(number,decimals)
} 

class INT extends oef{
    constructor(props){
        
        super(
            props,
            (a,b) => a==b,
            "TYPE oef"
        )
        this.state = { 
            number: 2,
            result: '', //result
            decimals: '2', //exponent or decimals
        }
    }
    translator(){
        console.log(this.state.number)
        return IntTranslate(this.state.number, parseInt(this.state.decimals))
    }
    inputs(){
        return (
            <div>
            <Textinp name="decimals" obj={this.state} handler={this.handleChange} label="bits "/>
            </div>
        )
    }
}
export default INT