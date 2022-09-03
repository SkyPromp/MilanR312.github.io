import { Box } from '@mui/system';
import { Button, Input, InputLabel } from "@mui/material"
import React from 'react';
import CryptoJS, { enc } from 'crypto-js';
function Textinp(props){
    return(
        <Box sx={{border: '1px solid black'}}>
            <InputLabel  htmlFor={`title${props.index}`}>Title</InputLabel>
            <Input type="text" status="base" id={`title${props.index}`} onChange={props.handler}></Input>
            <InputLabel htmlFor={`description${props.index}`}>{props.content}</InputLabel>
            <Input type="text" status="base" id={`description${props.index}`} onChange={props.handler}></Input>
        </Box>
    )
}
function clone (objectToClone) { JSON.parse(JSON.stringify(objectToClone))};
class SubQuestion extends React.Component{
    constructor(props){
        super(props)
        this.sendData = props.sendData
        this.state = {
            main: {
                title: "",
                description: ""
            },
            answersAmount: 0,
            ansWers: [],
            index: props.index,
            ansWersText: []
        }
    }
    update = (event) => {
        console.log("updating")
        var send = () => {
            var out = {
                main: this.state.main,
                answersAmount: this.state.answersAmount,
                index: this.state.index,
                ansWers: this.state.ansWersText.slice()
            }
            //out.ansWers = this.state.ansWersText.map((val) => console.log(val))
            this.sendData(out)
            console.log(event.target)
        }
        if (event.target.id.includes("Base")){
            var temp = this.state.main
            temp[event.target.id.slice(0,-7)] = event.target.value
            this.setState({main: temp}, console.log(this.state.main), send())
        } else {
            var old = this.state.ansWersText
            old[event.target.id.slice(-1)] = event.target.value
            this.setState({ansWersText: old}, () => send())
        }
        
        
    }
    add = () => {
        console.log(this.state.answersAmount)
        var temp = this.state.ansWersText
        temp.push("")
        this.setState({answersAmount: this.state.answersAmount + 1, ansWersText: temp}, () => {
            const answers = new Array(this.state.answersAmount).fill().map((_,index) => {
                return (
                    <Box key={index}>
                        <InputLabel htmlFor={`answer${index}`}>{`Answer${index+1}`}</InputLabel>
                        <Input key={index} type='text' id={`answer${index}`} onChange={this.update} content={this.state.ansWersText[index]}/>
                    </Box>
                )
            })
            //console.log(answers)
            this.setState({ansWers: answers}, () => console.log(this.state))
        })
    }
    
    render(){
        return (
            <Box sx={{border: '1px solid black'}}>
                <InputLabel  htmlFor={`title${this.state.index}`}>Title</InputLabel>
                <Input type="text" id={`title-Base-${this.state.index}`} onChange={this.update}></Input>
                <InputLabel htmlFor={`description${this.state.index}`}>Questions</InputLabel>
                <Input type="text" id={`description-Base-${this.state.index}`} onChange={this.update}></Input>
                <Box sx={{display: "flex"}}>
                    {this.state.ansWers}
                    <Button onClick={this.add}>Add</Button>
                </Box>
            </Box>
        )
    }
}
export default class Poll extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            main: {
                title: "",
                description: ""
            },
            subQuestionAmount: 0,
            subQuestions: [],
            childValues: new Map()
        }
    }
    handler = (event) => {
        console.log(event.target.id.slice(0,-2))
        console.log(event.target.value)
        var temp = this.state.main
        temp[event.target.id.slice(0,-2)] = event.target.value
        this.setState({main: temp}, console.log(this.state.main))
    }
    Questions = () => {
        const result = new Array(this.state.subQuestionAmount).fill().map((_, index)=>{
                return <SubQuestion sendData={this.GetValuesFromChild} key={index} index={index} />
            })
        console.log(result)
        return this.setState({
           subQuestions: result 
        })
    }
    GetValuesFromChild = (val) => {
        var rest = new Map(this.state.childValues)
        console.log(rest)
        console.log(val)
        rest.set(val.index, val)
        console.log('got chqnges')
        this.setState({childValues: rest})
    }
    Compile = () => {

        var out = {
            main: this.state.main,
            children: Array.from(this.state.childValues)
        }
        console.log(out)
        console.log(JSON.stringify(out))
        var secretKey = "cool" 
        var encr = CryptoJS.AES.encrypt(JSON.stringify(out), secretKey).toString()
        console.log(out)
        console.log(encr)
        console.log(encr.length)
        navigator.clipboard.writeText("Aquila"+encr)
    }
    render(){
        return (
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Box className='poll' sx={{width: 3/4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Textinp index={-1} content="description" handler={this.handler} />
                    {this.state.subQuestions}
                </Box>
                <Button onClick={ () => {
                    this.setState({ subQuestionAmount: this.state.subQuestionAmount + 1}, () => {
                        console.log(this.state)
                        this.Questions()
                    })
                    
                }}>Click</Button>
                <Button onClick={this.Compile}>Get The string</Button>
            </Box>
        )
    }
}