import React, {Fragment}from 'react';
import Style from './style.scss';

import First from './first/firstplayer.jsx';
import Second from './second/secondplayer.jsx';

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
            currentTeam: []
        }
    }

    componentDidMount(){
        let value = JSON.parse(localStorage.getItem('team'))
        if(value === null || value === undefined){
            this.setState({currentTeam: []},()=>{
                console.log(this.state.currentTeam)
            })
        }
        else{
            this.setState({currentTeam: value},()=>{
                console.log(this.state.currentTeam)
            })
        }
    }

    eventTeamHandler(event){
        let teamName = this.state.teamName
        this.setState({teamName: event.target.value})
        if(teamName.length > 5){
            this.setState({teamName: event.target.value, firstPlayerInput: true})
        }
        else{
            this.setState({teamName: event.target.value, firstPlayerInput: false, firstPlayerFirstName: '', firstPlayerLastName: '', secondPlayerInput: false, secondPlayerFirstName: '', secondPlayerLastName: ''})
        }
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

    render(){

        let showPlayerInput
        let showButton;
        if(this.state.firstPlayerInput === true && this.state.secondPlayerInput === false){
            showPlayerInput = <First
                                    firstPlayerFirstName={this.state.firstPlayerFirstName}
                                    firstPlayerLastName={this.state.firstPlayerLastName}
                                    inputFirstPlayerFirstName={(firstName)=>{this.inputFirstPlayerFirstName(firstName)}}
                                    inputFirstPlayerLastName={(lastName)=>{this.inputFirstPlayerLastName(lastName)}}>
                                </First>
            showButton = <button className='btn btn-md btn-outline-primary' onClick={()=>{this.showSecondPlayInput()}}>Add Second Player</button>
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
        }

        return(
            <div className='text-center'>
                <div className={Style.contentHeader}>
                    <p> Register team / View teams </p>
                </div>
                <div className={Style.contentBody}>
                    <div className='row'>
                        <div className={Style.teamHeader+ ' col-4'}>
                            <p> Register team </p>
                            <div className='card-body form-group'>
                                Team name: <input className='form-control' onChange={(event)=>{this.eventTeamHandler(event)}} value={this.state.teamName}/>
                                {showPlayerInput}
                                {showButton}
                                <div className='my-4 d-flex flex-row justify-content-around align-items-center'>
                                    <button className='btn btn-md btn-outline-danger' onClick={()=>{this.handleClearInput()}}>clear</button>
                                    <button className='btn btn-md btn-outline-success' onClick={()=>{this.handlePlayerRegister()}}>Register</button>
                                </div>
                            </div>
                        </div>
                        <div className={Style.teamHeader+ ' col-8'}>
                            <p> Teams </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;