import React, {Fragment} from 'react';
import Style from './style.scss';
import Counter from './counter/counter.jsx'

class Quarterfinal extends React.Component{

    constructor(){
        super()

        this.state = {
            eliminationTeam: [],
            winningTeam:[],
            matchUp:'',
            quarterMessage: '',
            startQuarter: false,
            endQuarter: false
        }
    }

    componentDidMount(){
        let value = JSON.parse(localStorage.getItem('quarterShuffleTeam'))
        let quarterEliminationTeam = JSON.parse(localStorage.getItem('quarterEliminationTeam'))
        let startQuarter = JSON.parse(localStorage.getItem('startQuarter'))
        let endQuarter = JSON.parse(localStorage.getItem('endQuarter'))
        if(startQuarter === null){
            this.setState({quarterMessage:'You either have not start the second quarter game or have not complete the elimination round.',startQuarter: false})
        }
        else{
            if(quarterEliminationTeam === null){
                this.setState({eliminationTeam: value, startQuarter: startQuarter},()=>{console.log(this.state.eliminationTeam)})
            }
            else{
                if(endQuarter === null){
                    this.setState({eliminationTeam: quarterEliminationTeam, startQuarter: startQuarter})
                }
                else{
                    this.setState({startQuarter: startQuarter, endQuarter: endQuarter, quarterMessage:'Quarter final Round has ended. Proceed to Semi final in line up or check the scoreboard.'})
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

    checkEndQuarter(){
        let eliminationTeam = this.state.eliminationTeam
        if(eliminationTeam.length === 0){
            this.setState({endQuarter: true, quarterMessage:'Quarter final Round has ended. Proceed to Semi final in line up or check the scoreboard.'},()=>{
                localStorage.setItem('endQuarter', JSON.stringify(this.state.endQuarter))
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
            localStorage.setItem('quarterEliminationTeam', JSON.stringify(this.state.eliminationTeam))
            localStorage.setItem('quarterEliminationWinningTeam', JSON.stringify(this.state.winningTeam))
            this.checkEndQuarter()
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
        if(this.state.startQuarter === false){
            showCounter =   <Fragment>
                                <h4>{this.state.quarterMessage}</h4>
                            </Fragment>
        }
        else{
            if(this.state.endQuarter === false){
                showCounter = <Counter matchUp={this.state.matchUp} winningTeam={(data)=>{this.winningTeam(data)}}/>
            }
            else{
                showCounter =   <Fragment>
                                    <h4>{this.state.quarterMessage}</h4>
                                </Fragment>
            }
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