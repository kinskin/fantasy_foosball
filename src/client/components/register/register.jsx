import React, {Fragment}from 'react';
import Style from './style.scss';
import shuffle from 'shuffle-array';

import First from './first/firstplayer.jsx';
import Second from './second/secondplayer.jsx';
import Regteam from './regteam/regteam.jsx';


class Register extends React.Component{

    constructor(){

        super()

        this.state = {
            teamName: '',
            firstPlayerFirstName: '',
            firstPlayerLastName: '',
            secondPlayerFirstName: '',
            secondPlayerLastName: '',
            firstPlayerInput: false,
            secondPlayerInput: false,
            initialize: false,
            currentTeam: []
        }
    }

    componentDidMount(){
        let value = JSON.parse(localStorage.getItem('team'))
        let value2 = JSON.parse(localStorage.getItem('teamInitialize'))
        if(value === null){
            this.setState({currentTeam: []},()=>{
                console.log(this.state.currentTeam)
            })
        }
        else{
            this.setState({currentTeam: value, initialize: value2})
        }
    }

    eventTeamHandler(event){
        let teamName = this.state.teamName
        let totalTeam = this.state.currentTeam.length
        this.setState({teamName: event.target.value},()=>{
            if(teamName.length > 5 && teamName.length < 15 && totalTeam <=16){
                this.setState({firstPlayerInput: true})
            }
            else{
                this.setState({firstPlayerInput: false, firstPlayerFirstName: '', firstPlayerLastName: '', secondPlayerInput: false, secondPlayerFirstName: '', secondPlayerLastName: ''})
            }
        })
    }

    inputFirstPlayerFirstName(firstName){
        this.setState({firstPlayerFirstName: firstName})
    }

    inputFirstPlayerLastName(lastName){
        this.setState({firstPlayerLastName: lastName})
    }

    showSecondPlayInput(){
        let secondPlayerInput = this.state.secondPlayerInput
        if(secondPlayerInput === false){
            this.setState({secondPlayerInput: true})
        }
        else{
            this.setState({secondPlayerInput: false})
        }
    }


    inputSecondPlayerFirstName(firstName){
        this.setState({secondPlayerFirstName: firstName})
    }

    inputSecondPlayerLastName(lastName){
        this.setState({secondPlayerLastName: lastName})
    }

    handleClearInput(){
        this.setState({teamName: '' , firstPlayerFirstName: '', firstPlayerLastName: '', secondPlayerFirstName: '', secondPlayerLastName: '',firstPlayerInput: false, secondPlayerInput: false })
    }

    handlePlayerRegister(){
        let teamName = this.state.teamName
        let firstPlayerFirstName = this.state.firstPlayerFirstName
        let firstPlayerLastName = this.state.firstPlayerLastName
        let secondPlayerFirstName = this.state.secondPlayerFirstName
        let secondPlayerLastName = this.state.secondPlayerLastName
        let currentTeam = this.state.currentTeam
        let teamData = {
            teamName: teamName,
            firstPlayer:{
                firstName: firstPlayerFirstName,
                lastName: firstPlayerLastName
            },
            secondPlayer:{
                firstName: secondPlayerFirstName,
                lastName: secondPlayerLastName
            }
        }
        currentTeam.push(teamData)
        this.setState({currentTeam: currentTeam, teamName: '' , firstPlayerFirstName: '', firstPlayerLastName: '', secondPlayerFirstName: '', secondPlayerLastName: '',firstPlayerInput: false, secondPlayerInput: false },()=>{
            localStorage.setItem('team', JSON.stringify(this.state.currentTeam))
        })
    }

    handleInitialize(initializeStatus){
        this.setState({initialize: initializeStatus}, ()=>{
            this.props.handleInitialize(initializeStatus)
        })
    }

    render(){

        let showPlayerInput;
        let showButton;
        let submitButton;
        if(this.state.initialize !== true){
            console.log('hello')
            if(this.state.firstPlayerInput === true && this.state.secondPlayerInput === false){
                showPlayerInput = <First
                                        firstPlayerFirstName={this.state.firstPlayerFirstName}
                                        firstPlayerLastName={this.state.firstPlayerLastName}
                                        inputFirstPlayerFirstName={(firstName)=>{this.inputFirstPlayerFirstName(firstName)}}
                                        inputFirstPlayerLastName={(lastName)=>{this.inputFirstPlayerLastName(lastName)}}>
                                    </First>
                showButton = <button className='btn btn-md btn-outline-primary' onClick={()=>{this.showSecondPlayInput()}}>Add Second Player</button>
                submitButton = <button className='btn btn-md btn-outline-success' onClick={()=>{this.handlePlayerRegister()}}>Register</button>
            }
            else if(this.state.firstPlayerInput === true && this.state.secondPlayerInput === true){
                showPlayerInput =   <Fragment>
                                        <First
                                            firstPlayerFirstName={this.state.firstPlayerFirstName}
                                            firstPlayerLastName={this.state.firstPlayerLastName}
                                            inputFirstPlayerFirstName={(firstName)=>{this.inputFirstPlayerFirstName(firstName)}}
                                            inputFirstPlayerLastName={(lastName)=>{this.inputFirstPlayerLastName(lastName)}}>
                                        </First>
                                        <Second
                                            secondPlayerFirstName={this.state.secondPlayerFirstName}
                                            secondPlayerLastName={this.state.secondPlayerLastName}
                                            inputSecondPlayerFirstName={(firstName)=>{this.inputSecondPlayerFirstName(firstName)}}
                                            inputSecondPlayerLastName={(lastName)=>{this.inputSecondPlayerLastName(lastName)}}>
                                        </Second>
                                    </Fragment>
                showButton = <button className='btn btn-md btn-outline-primary' onClick={()=>{this.showSecondPlayInput()}}>Remove Second Player</button>
                submitButton = <button className='btn btn-md btn-outline-success' onClick={()=>{this.handlePlayerRegister()}}>Register</button>
            }
        }


        return(
            <div className='text-center'>
                <div className={Style.contentHeader}>
                    <p> Register team / View teams </p>
                </div>
                <div className={Style.contentBody}>
                    <div className='row'>
                        <div className='col-4'>
                            <div className={Style.teamHeader}>
                                <p> Register team </p>
                            </div>
                            <div className='card-body form-group'>
                                Team name: <input className='form-control' onChange={(event)=>{this.eventTeamHandler(event)}} value={this.state.teamName}/>
                                <small>Enter at least 6 character</small>
                                {showPlayerInput}
                                {showButton}
                                <div className='my-4 d-flex flex-row justify-content-around align-items-center'>
                                    <button className='btn btn-md btn-outline-danger' onClick={()=>{this.handleClearInput()}}>clear</button>
                                    {submitButton}
                                </div>
                            </div>
                        </div>
                        <div className='col-8'>
                            <div className={Style.teamHeader}>
                                <p> Teams </p>
                            </div>
                            <Regteam
                                currentTeam={this.state.currentTeam}
                                handleInitialize={(initializeStatus)=>{this.handleInitialize(initializeStatus)}}>
                            </Regteam>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;