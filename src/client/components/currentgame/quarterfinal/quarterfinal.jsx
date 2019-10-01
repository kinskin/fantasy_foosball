import React from 'react';
import Style from './style.scss';
import Counter from './counter/counter.jsx'

class Quarterfinal extends React.Component{

    constructor(){
        super()

        this.state ={
            eliminationTeam: [],
            winningTeam:[],
            matchUp:'',
            eliminationRound: false
        }
    }

    componentDidMount(){
        let value = JSON.parse(localStorage.getItem('quarterShuffleTeam'))
        let quarterEliminationTeam = JSON.parse(localStorage.getItem('quarterEliminationTeam'))
        if(quarterEliminationTeam === null){
            this.setState({eliminationTeam: value},()=>{console.log(this.state.eliminationTeam)})
        }
        else{
            this.setState({eliminationTeam: quarterEliminationTeam})
        }
    }

    handleCurrentGame(){
        console.log(event.target.id)
        let eliminationTeam = this.state.eliminationTeam
        let matchUpIndex = eliminationTeam.findIndex(index=>index.eliminateId == event.target.id)
        let matchUp = eliminationTeam[matchUpIndex]
        this.setState({matchUp: matchUp},()=>{console.log(this.state.matchUp)})
    }

     winningTeam(data){
        let winningTeam = this.state.winningTeam
        let eliminationTeam = this.state.eliminationTeam
        for (let i = 0; i < eliminationTeam.length; i++){
            if(data.team.teamId === eliminationTeam[i].teamOne.team.teamId || data.team.teamId === eliminationTeam[i].teamTwo.team.teamId){
                eliminationTeam.splice(i,1)
            }
        }
        winningTeam.push(data);
        this.setState({eliminationTeam: eliminationTeam, winningTeam: winningTeam, matchUp: ''},()=>{
            console.log(this.state.winningTeam)
            localStorage.setItem('quarterEliminationTeam', JSON.stringify(this.state.eliminationTeam))
            localStorage.setItem('quarterEliminationWinningTeam', JSON.stringify(this.state.winningTeam))
        })
    }

    render(){

        let sideBarTeam;
        if(this.state.eliminationTeam.length > 0){
            sideBarTeam = this.state.eliminationTeam.map((team,index)=>{
                return(
                    <div className={Style.team+' m-3'} onClick={()=>{this.handleCurrentGame()}} key={index} id={team.eliminateId}>
                        <div className={Style.singleTeam} id={team.eliminateId}>
                            <p id={team.eliminateId}>{team.teamOne.team.teamName}</p>
                        </div>
                        <p id={team.eliminateId}> vs </p>
                        <div className={Style.singleTeam} id={team.eliminateId}>
                            <p id={team.eliminateId}> {team.teamTwo.team.teamName}</p>
                        </div>
                    </div>
                )
            })
        }

        let showCounter;
        if(this.state.eliminationRound === false){
            showCounter = <Counter matchUp={this.state.matchUp} winningTeam={(data)=>{this.winningTeam(data)}}/>
        }
        else{
            showCounter = <p> Elimination round has ended </p>
        }

        return(
            <div className='row'>
                <div className='col-3'>
                    <h4>Quarter Final</h4>
                    <div className={Style.sideBar}>
                        {sideBarTeam}
                    </div>
                </div>
                <div className='col-9'>
                    {showCounter}
                </div>
            </div>
        )
    }
}

export default Quarterfinal;