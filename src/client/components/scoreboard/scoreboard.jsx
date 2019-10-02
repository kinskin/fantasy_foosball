import React from 'react';
import Style from './style.scss';
import sort from 'fast-sort'

class Scoreboard extends React.Component{

    constructor(){
        super()

        this.state ={
            scoreboard: []
        }
    }

    componentDidMount(){
        let value = JSON.parse(localStorage.getItem('scoreboard'))
        if( value !== null){
            value = sort(value).desc(t=>t.teamWin)
            this.setState({scoreboard: value},()=>{
                console.log(this.state.scoreboard)
            })
        }
    }

    render(){

        let teamName;
        let teamWin;
        let teamMembers;
        let ranking;
        let teamStatus;
        if(this.state.scoreboard.length > 0){
            ranking = this.state.scoreboard.map((score,index)=>{
                return(
                    <p>{index+1}</p>
                )
            })
            teamName = this.state.scoreboard.map((score,index)=>{
                return(
                    <p>{score.team.teamName}</p>
                )
            })
            teamWin = this.state.scoreboard.map((score,index)=>{
                return(
                    <p>{score.teamWin}</p>
                )
            })
            teamMembers = this.state.scoreboard.map((score,index)=>{
                return(
                    <div className='row'>
                        <div className='col-6'>
                            <p>{score.team.firstPlayer.firstName}</p>
                        </div>
                        <div className='col-6'>
                            <p>{score.team.secondPlayer.firstName}</p>
                        </div>
                    </div>
                )
            })
        }

        return(
            <div className='text-center'>
                <div className={Style.contentHeader}>
                    <h1> Scoreboard </h1>
                </div>
                <div className={Style.contentBody}>
                    {teamStatus}
                </div>
                <div className={Style.contentBody}>
                    <div className='d-flex flex-row justify-content-center'>
                        <div className='col-2'>
                            <div className={Style.teamNameHeader}>
                                <p> Ranking </p>
                            </div>
                            {ranking}
                        </div>
                        <div className='col-2'>
                            <div className={Style.teamNameHeader}>
                                <p> Team </p>
                            </div>
                            {teamName}
                        </div>
                        <div className='col-2'>
                            <div className={Style.teamNameHeader}>
                                <p> Score </p>
                            </div>
                            {teamWin}
                        </div>
                        <div className='col-4'>
                            <div className={Style.teamNameHeader}>
                                <p> Team Members </p>
                            </div>
                            {teamMembers}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Scoreboard;