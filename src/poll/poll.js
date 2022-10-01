import { Box } from '@mui/system';
import { Button, Input, InputLabel } from "@mui/material"
import React from 'react';
import CryptoJS, { enc } from 'crypto-js';
function Textinp(props){ //react prop used to make a textinput with title and description
    return(
        <Box sx={{border: '1px solid black'}}>
            <InputLabel  htmlFor={`title${props.index}`}>Title</InputLabel>
            <Input type="text" status="base" id={`title${props.index}`} onChange={props.handler}></Input>
            <InputLabel htmlFor={`description${props.index}`}>{props.content}</InputLabel>
            <Input type="text" status="base" id={`description${props.index}`} onChange={props.handler}></Input>
        </Box>
    )
}
function clone (objectToClone) { JSON.parse(JSON.stringify(objectToClone))}; //creates a seperate clone of a object //to remove
class SubQuestion extends React.Component{
    constructor(props){
        super(props)
        //get the function from the parent
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
    //called when an input has detected a change
    update = (event) => {
        console.log("updating")
        //function that sends the data of the child to the parent
        var send = () => {
            var out = {
                main: this.state.main,
                answersAmount: this.state.answersAmount,
                index: this.state.index,
                ansWers: this.state.ansWersText.slice()
            }
            this.sendData(out)
        }
        if (event.target.id.includes("Base")){
            //if the updated element is of the target base then only update the main data
            var temp = this.state.main
            temp[event.target.id.slice(0,-7)] = event.target.value
            this.setState({main: temp}, console.log(this.state.main), send())
        } else {
            //else update get all the text out of the answers and update that
            var old = this.state.ansWersText
            old[event.target.id.slice(-1)] = event.target.value
            this.setState({ansWersText: old}, () => send())
        }
        
        
    }
    //add a new input box
    add = () => {
        //enlarge the answertext array
        var temp = this.state.ansWersText
        temp.push("")
        //and make react update values
        this.setState({answersAmount: this.state.answersAmount + 1, ansWersText: temp}, () => {
            //get the html for the new update
            const answers = new Array(this.state.answersAmount).fill().map((_,index) => {
                return (
                    <Box key={index}>
                        <InputLabel htmlFor={`answer${index}`}>{`Answer${index+1}`}</InputLabel>
                        <Input key={index} type='text' id={`answer${index}`} onChange={this.update} content={this.state.ansWersText[index]}/>
                    </Box>
                )
            })
            //set the answers and reload the html
            this.setState({ansWers: answers})
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
                    <Button onClick={this.add}>Add Answer</Button>
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
    //function to update the main part of the parent block
    handler = (event) => {
        var temp = this.state.main
        temp[event.target.id.slice(0,-2)] = event.target.value
        this.setState({main: temp})
    }

    //adds a new subquestion and reloads the html
    Questions = () => {
        const result = new Array(this.state.subQuestionAmount).fill().map((_, index)=>{
                return <SubQuestion sendData={this.GetValuesFromChild} key={index} index={index} />
            })
        return this.setState({
           subQuestions: result 
        })
    }
    //function that gets called inside the child
    GetValuesFromChild = (val) => {
        var rest = new Map(this.state.childValues)
        rest.set(val.index, val)
        this.setState({childValues: rest})
    }
    //grabs the object data, encrypts it and put in the clipboard
    Compile = () => {
        var out = {
            main: this.state.main,
            children: Array.from(this.state.childValues)
        }
        var secretKey = "cool" //TODO put in .env and get a decent string
        var encr = CryptoJS.AES.encrypt(JSON.stringify(out), secretKey).toString()
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
                    
                }}>Add a Question</Button>
                <Button onClick={this.Compile}>Copy the string to clipboard</Button>
            </Box>
        )
    }
}