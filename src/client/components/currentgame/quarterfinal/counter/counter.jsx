import React, {Fragment} from 'react';
import Style from './style.scss'

class Counter extends React.Component{

    constructor(){

        super()

        this.state = {
            status: '',
            statusTwo: '',
            teamOneWin: 0,
            teamOneScore:0,
            teamTwoWin: 0,
            teamTwoScore: 0,
            round: 1,
            nextGame: false,
            scoreboard: []
        }
    }

    componentDidMount(){
        let scoreboard = JSON.parse(localStorage.getItem('scoreboard'))
        if(scoreboard !== null){
            this.setState({scoreboard: scoreboard})
        }
    }

    scoreboard(data1,data2){
        let scoreboard = this.state.scoreboard
        for(let i = 0; i < scoreboard.length; i++){
            if(data1.team.teamName === scoreboard[i].team.teamName){
                scoreboard[i] = data1
            }
            else if(data2.team.teamName === scoreboard[i].team.teamName)
                scoreboard[i] = data2
        }
        this.setState({scoreboard: scoreboard},()=>{
            localStorage.setItem('scoreboard', JSON.stringify(this.state.scoreboard))
        })
    }


    checkForWin(){
        let teamOneWin = this.state.teamOneWin
        let teamTwoWin = this.state.teamTwoWin
        let teamOne = this.props.matchUp.teamOne
        let teamOneWinning = this.props.matchUp.teamOne.teamWin
        let teamTwo = this.props.matchUp.teamTwo
        let teamTwoWinning = this.props.matchUp.teamTwo.teamWin
        if(teamOneWin == 2){
            let data1 = {
                team: teamOne.team,
                teamWin: teamOneWinning+teamOneWin
            }
            let data2 = {
                team: teamTwo.team,
                teamWin: teamTwoWinning+teamTwoWin
            }
            this.scoreboard(data1,data2)
            this.setState({status: '', teamOneWin: 0, teamOneScore: 0, teamTwoWin:0, teamTwoScore:0, round:1},()=>{
                 this.props.winningTeam(data1)
            })
        }
        else if(teamTwoWin == 2){
            let data1 = {
                team: teamTwo.team,
                teamWin: teamTwoWinning+teamTwoWin
            }
            let data2 = {
                team: teamOne.team,
                teamWin: teamOneWinning+teamOneWin
            }
            this.scoreboard(data1,data2)
            this.setState({status: '', teamOneWin: 0, teamOneScore: 0, teamTwoWin:0, teamTwoScore:0, round:1},()=>{
                this.props.winningTeam(data1)
            })
        }
    }

    handleNextRound(){
        let round = this.state.round
        let teamOneWin = this.state.teamOneWin
        let teamOneScore = this.state.teamOneScore
        let teamTwoWin = this.state.teamTwoWin
        let teamTwoScore = this.state.teamTwoScore
        if(teamOneScore === 10 && teamTwoScore !== 10){
            this.setState({teamOneScore: 0 , teamTwoScore: 0, round: round+1,nextGame:false,status: ''},this.checkForWin());
        }
        else if(teamOneScore !== 10 && teamTwoScore === 10){
            this.setState({teamOneScore: 0 , teamTwoScore: 0, round: round+1,nextGame:false,status: ''},this.checkForWin());
        }
    }

    handleMinusTeamOne(){
        let teamOneScore = this.state.teamOneScore
        if(teamOneScore === 0){
            this.setState({teamOneScore: 0})
        }
        else{
            this.setState({teamOneScore: teamOneScore-1})
        }
    }

    handlePlusTeamOne(){
        let teamOneScore = this.state.teamOneScore
        let teamOneWin = this.state.teamOneWin
        if(teamOneScore !== 10){
            this.setState({teamOneScore: teamOneScore+1})
        }
        else{
            this.setState({teamOneWin: teamOneWin+1, nextGame: true, status: 'Team One win this round'})
        }
    }

    handleMinusTeamTwo(){
        let teamTwoScore = this.state.teamTwoScore
        if(teamTwoScore === 0){
            this.setState({teamTwoScore: 0})
        }
        else{
            this.setState({teamTwoScore: teamTwoScore-1})
        }
    }

    handlePlusTeamTwo(){
        let teamTwoScore = this.state.teamTwoScore
        let teamTwoWin = this.state.teamTwoWin
        if(teamTwoScore !== 10){
            this.setState({teamTwoScore: teamTwoScore+1})
        }
        else{
            this.setState({teamTwoWin: teamTwoWin+1, nextGame: true, status: 'Team Two win this round'})
        }
    }

    render(){

        let status;
        let score;
        if(this.props.matchUp !== ''){
            if(this.state.nextGame === false){
                score = <div className={Style.mainCounter+' d-flex flex-wrap justify-content-center mx-3'}>
                            <div className={Style.counter+' mx-3'}>
                                <h4 className='my-3'>{this.props.matchUp.teamOne.team.teamName}</h4>
                                <p>{this.state.teamOneScore}</p>
                                <div className={Style.button}>
                                    <button className='btn btn-md btn-outline-dark mx-3' onClick={()=>{this.handleMinusTeamOne()}}>Minus</button>
                                    <button className='btn btn-md btn-outline-dark mx-3' onClick={()=>{this.handlePlusTeamOne()}}>Plus</button>
                                </div>
                            </div>
                            <div className={Style.counter+' mx-3'}>
                                <h4 className='my-3'>{this.props.matchUp.teamTwo.team.teamName}</h4>
                                <p>{this.state.teamTwoScore}</p>
                                <div className={Style.button}>
                                    <button className='btn btn-md btn-outline-dark mx-3' onClick={()=>{this.handleMinusTeamTwo()}}>Minus</button>
                                    <button className='btn btn-md btn-outline-dark mx-3' onClick={()=>{this.handlePlusTeamTwo()}}>Plus</button>
                                </div>
                            </div>
                        </div>
            }
            else{
                score = <button className='btn btn-md btn-outline-dark' onClick={()=>{this.handleNextRound()}}>Start Next Round</button>
                status = <p className='my-5'style={{fontSize: '30px'}}>{this.state.status}</p>
            }
        }

        let counter;
        if(this.props.matchUp !== ''){
            counter =   <div>
                            <h3 className='mb-3'> {this.props.matchUp.teamOne.team.teamName} vs {this.props.matchUp.teamTwo.team.teamName} </h3>
                            <div>
                                <h5 className='mt-3'>Scores</h5>
                                <div className='d-flex flex-wrap justify-content-center'>
                                    <div className='m-3'>
                                        <p>{this.props.matchUp.teamOne.team.teamName}: {this.state.teamOneWin}</p>
                                    </div>
                                    <div className='m-3'>
                                        <p>{this.props.matchUp.teamTwo.team.teamName}: {this.state.teamTwoWin}</p>
                                    </div>
                                </div>
                            </div>
                            <h3>Round: {this.state.round}</h3>
                                {status}
                                {score}
                        </div>
        }
        else{
            counter = <p> Select the team </p>
        }


        return(
            <div>
                {counter}
            </div>
        )
    }
}

export default Counter;