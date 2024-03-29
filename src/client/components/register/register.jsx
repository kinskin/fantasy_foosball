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
            counterId: 1,
            currentTeam: []
        }
    }

    componentDidMount(){
        let value = JSON.parse(localStorage.getItem('team'))
        let value2 = JSON.parse(localStorage.getItem('teamInitialize'))
        let value3 = JSON.parse(localStorage.getItem('nextTeamId'))
        if(value === null && value2 === null){
            this.setState({currentTeam: [], counterId:1},()=>{
                console.log(this.state.currentTeam)
            })
        }
        else if(value !== null && value2 === null){
            this.setState({currentTeam: value, counterId: value3})
        }
        else{
            this.setState({currentTeam: value, initialize: value2, counterId: value3})
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
        let counterId = this.state.counterId
        let teamData = {
            teamId: counterId,
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
        this.setState({currentTeam: currentTeam, teamName: '' , firstPlayerFirstName: '', firstPlayerLastName: '', secondPlayerFirstName: '', secondPlayerLastName: '',firstPlayerInput: false, secondPlayerInput: false, counterId: counterId+1},()=>{
            localStorage.setItem('team', JSON.stringify(this.state.currentTeam))
            localStorage.setItem('nextTeamId', JSON.stringify(this.state.counterId))
        })
    }

    handleInitialize(initializeStatus){
        this.setState({initialize: initializeStatus}, ()=>{
            this.props.handleInitialize(initializeStatus)
        })
    }

    handleDeleteTeam(teamId){
        let currentTeam = this.state.currentTeam
        let deleteTeamIndex = currentTeam.findIndex(team => team.teamId == teamId)
        currentTeam.splice(deleteTeamIndex,1)
        this.setState({currentTeam: currentTeam},()=>{
            localStorage.setItem('team', JSON.stringify(this.state.currentTeam))
        })
    }

    render(){

        let showPlayerInput;
        let showButton;
        let submitButton;
        if(this.state.initialize !== true){
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

        let showTeamInput;
        let teamNote;
        let caption;
        let clearButton;
        if(this.state.currentTeam.length < 16){
            teamNote = <p> Maximum participating is 16. No more or less </p>
            showTeamInput = <Fragment>
                                Team name: <input className='form-control' onChange={(event)=>{this.eventTeamHandler(event)}} value={this.state.teamName}/>
                            </Fragment>
            caption = <small>Enter at least 6 character</small>
            clearButton =   <div className='my-4 d-flex flex-row justify-content-around align-items-center'>
                                <button className='btn btn-md btn-outline-danger' onClick={()=>{this.handleClearInput()}}>clear</button>
                                {submitButton}
                            </div>
        }
        else{
            showTeamInput = <p> Total Number of participating team in maximum </p>
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
                                {teamNote}
                                {showTeamInput}
                                {caption}
                                {showPlayerInput}
                                {showButton}
                                {clearButton}
                            </div>
                        </div>
                        <div className='col-8'>
                            <div className={Style.teamHeader}>
                                <p> Teams </p>
                            </div>
                            <Regteam
                                currentTeam={this.state.currentTeam}
                                handleInitialize={(initializeStatus)=>{this.handleInitialize(initializeStatus)}}
                                handleDeleteTeam={(teamId)=>{this.handleDeleteTeam(teamId)}}>
                            </Regteam>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;