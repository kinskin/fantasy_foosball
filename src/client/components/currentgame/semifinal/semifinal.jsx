import React, {Fragment} from 'react';
import Style from './style.scss';
import Counter from './counter/counter.jsx';

class Semifinal extends React.Component{

    constructor(){
        super()

        this.state ={
            eliminationTeam: [],
            winningTeam:[],
            matchUp:'',
            semiMessage: '',
            startSemi: false,
            endSemi: false
        }
    }

    componentDidMount(){
        let value = JSON.parse(localStorage.getItem('semiShuffleTeam'))
        let quarterEliminationTeam = JSON.parse(localStorage.getItem('semiEliminationTeam'))
        let startSemi = JSON.parse(localStorage.getItem('startSemi'))
        let endSemi = JSON.parse(localStorage.getItem('endSemi'))
        if(startSemi === null){
            this.setState({semiMessage: 'You either have not start the semi final round  or have not complete the quarter final round',startSemi:false})
        }
        else{
            if(quarterEliminationTeam === null){
                this.setState({eliminationTeam: value, startSemi: startSemi},()=>{console.log(this.state.eliminationTeam)})
            }
            else{
                if(endSemi === null){
                    this.setState({eliminationTeam: quarterEliminationTeam, startSemi: startSemi})
                }
                else{
                    this.setState({startSemi: startSemi, endSemi: endSemi, semiMessage: 'Semi final Round has ended. Proceed to Final round in line up or check the scoreboard.'})
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

    checkEndSemi(){
        let eliminationTeam = this.state.eliminationTeam
        if(eliminationTeam.length === 0){
            this.setState({endSemi: true, semiMessage: 'Semi final Round has ended. Proceed to Final round in line up or check the scoreboard.'},()=>{
                localStorage.setItem('endSemi', JSON.stringify(this.state.endSemi))
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
            localStorage.setItem('semiEliminationTeam', JSON.stringify(this.state.eliminationTeam))
            localStorage.setItem('semiEliminationWinningTeam', JSON.stringify(this.state.winningTeam))
            this.checkEndSemi()
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
        if(this.state.startSemi === false){
            showCounter =   <Fragment>
                                <h4>{this.state.semiMessage}</h4>
                            </Fragment>
        }
        else{
            if(this.state.endSemi === false){
                showCounter = <Counter matchUp={this.state.matchUp} winningTeam={(data)=>{this.winningTeam(data)}}/>
            }
            else{
                showCounter =   <Fragment>
                                    <h4>{this.state.semiMessage}</h4>
                                </Fragment>
            }
        }


        return(
            <div className='row'>
                <div className='col-3'>
                    <h4>Semi Final</h4>
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

export default Semifinal;