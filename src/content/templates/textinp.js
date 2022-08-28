import { Input, InputLabel } from "@mui/material"

export function Textinp(props){
    return (
    <div>
        <InputLabel htmlFor={props.name}>{props.name} {props.label}</InputLabel>
        <Input type="text" id={props.name} name={props.name} value={props.obj[props.name]} onChange={props.handler}></Input>
    </div>
    )
}