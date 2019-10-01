import React from 'react';
import Style from './style.scss';

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
            this.setState({scoreboard: value},()=>{
                console.log(this.state.scoreboard)
            })
        }
    }

    render(){

        let scoreboard;
        if(this.state.scoreboard.length > 0){
            scoreboard = this.state.scoreboard.map((score,index)=>{
                return(
                    <div>
                        <div>
                            <p>{score.team.teamName}</p>
                        </div>
                        <div>
                            <p>{score.teamWin}</p>
                        </div>
                    </div>
                )
            })
        }
        else{
            scoreboard = <p>No score yet</p>
        }

        return(
            <div className='text-center'>
                <div className={Style.contentHeader}>
                    <h1> Hello Scoreboard </h1>
                </div>
                <div className={Style.contentBody}>
                    {scoreboard}
                </div>
            </div>
        )
    }
}

export default Scoreboard;