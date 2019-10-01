import React from 'react';
import Style from './style.scss';
import Counter from './counter/counter.jsx'

class Elimination extends React.Component{

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
        let value = JSON.parse(localStorage.getItem('eliminationShuffleTeam'))
        let eliminationTeam = JSON.parse(localStorage.getItem('eliminationTeam'))
        if(eliminationTeam === null){
            this.setState({eliminationTeam: value})
        }
        else{
            this.setState({eliminationTeam: eliminationTeam})
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
                if(data.team.teamId === eliminationTeam[i].teamOne.teamId || data.team.teamId === eliminationTeam[i].teamTwo.teamId){
                    eliminationTeam.splice(i,1)
                }
            }
            winningTeam.push(data);
            this.setState({eliminationTeam: eliminationTeam, winningTeam: winningTeam, matchUp: ''},()=>{
                console.log(this.state.winningTeam)
                localStorage.setItem('eliminationTeam', JSON.stringify(this.state.eliminationTeam))
                localStorage.setItem('eliminationWinningTeam', JSON.stringify(this.state.winningTeam))
            })
        }

    render(){

        let sideBarTeam;
        if(this.state.eliminationTeam.length > 0){
            sideBarTeam = this.state.eliminationTeam.map((team,index)=>{
                return(
                    <div className={Style.team+' m-3'} onClick={()=>{this.handleCurrentGame()}} key={index} id={team.eliminateId}>
                        <div className={Style.singleTeam} id={team.eliminateId}>
                            <p id={team.eliminateId}>{team.teamOne.teamName}</p>
                        </div>
                        <p id={team.eliminateId}> vs </p>
                        <div className={Style.singleTeam} id={team.eliminateId}>
                            <p id={team.eliminateId}> {team.teamTwo.teamName}</p>
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
                    <h4>Elimination round</h4>
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

export default Elimination;