import React, {Fragment} from 'react';
import Style from './style.scss';
import Counter from './counter/counter.jsx'

class Final extends React.Component{

    constructor(){
        super()

        this.state ={
            eliminationTeam: [],
            winningTeam:[],
            matchUp:'',
            startFinal: false,
            endFinal: false,
            finalMessage: ''
        }
    }

    componentDidMount(){
        let value = JSON.parse(localStorage.getItem('finalShuffleTeam'))
        let finalEliminationTeam = JSON.parse(localStorage.getItem('finalEliminationTeam'))
        let startFinal = JSON.parse(localStorage.getItem('startFinal'))
        let endFinal = JSON.parse(localStorage.getItem('endFinal'))
        if(startFinal === null){
            this.setState({finalMessage: 'You either have not start the final round  or have not complete the semi final round',startFinal: false})
        }
        else{
            if(finalEliminationTeam === null){
                this.setState({eliminationTeam: value, startFinal: startFinal},()=>{console.log(this.state.eliminationTeam)})
            }
            else{
                if(endFinal === null){
                    this.setState({eliminationTeam: finalEliminationTeam, startFinal: startFinal})
                }
                else{
                    this.setState({startFinal: startFinal, endFinal: endFinal, finalMessage: 'Final Round has ended. Proceed to the scoreboard.'})
                }
            }
        }
    }

    handleCurrentGame(){
        console.log(event.target.id)
        let eliminationTeam = this.state.eliminationTeam
        let matchUpIndex = eliminationTeam.findIndex(index=>index.eliminateId == event.target.id)
        let matchUp = eliminationTeam[matchUpIndex]
        this.setState({matchUp: matchUp},()=>{console.log(this.state.matchUp)})
    }

    checkEndFinal(){
        let eliminationTeam = this.state.eliminationTeam
        if(eliminationTeam.length === 0){
            this.setState({endFinal: true, finalMessage: 'Final Round has ended. Proceed to the scoreboard.'},()=>{
                localStorage.setItem('endFinal', JSON.stringify(this.state.endFinal))
            })
        }
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
            localStorage.setItem('finalEliminationTeam', JSON.stringify(this.state.eliminationTeam))
            localStorage.setItem('finalEliminationWinningTeam', JSON.stringify(this.state.winningTeam))
            this.checkEndFinal()
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
        if(this.state.startFinal === false){
            showCounter =   <Fragment>
                                <h4>{this.state.finalMessage}</h4>
                            </Fragment>
        }
        else{
            if(this.state.endFinal === false){
                showCounter = <Counter matchUp={this.state.matchUp} winningTeam={(data)=>{this.winningTeam(data)}}/>
            }
            else{
                showCounter =   <Fragment>
                                    <h4>{this.state.finalMessage}</h4>
                                </Fragment>
            }
        }



        return(
             <div className='row'>
                <div className='col-3'>
                    <h4>Final</h4>
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

export default Final;