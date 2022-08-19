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
            { 
                result: '', //result
                decimals: '', //exponent or decimals
            },
            (a,b) => a==b,
            "TYPE oef"
        )
    }
    translator(){
        return IntTranslate(this.number, parseInt(this.state.decimals))
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