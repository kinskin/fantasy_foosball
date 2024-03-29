import React from 'react';
import Style from './style.scss';
import shuffle from 'shuffle-array';

class Quarterfinal extends React.Component{

    constructor(){
        super()

        this.state = {
                currentTeam: [],
                randomize:false,
                shuffle:true,
                holdingTeam:[],
                shuffleTeam: [],
                quarterMessage: '',
                startQuarter: false,
                endQuarter:false,
                endElimination: false
            }
    }

    componentDidMount(){
        let value = JSON.parse(localStorage.getItem('eliminationWinningTeam'))
        let value2 = JSON.parse(localStorage.getItem('quarterShuffleTeam'))
        let value3 = JSON.parse(localStorage.getItem('endElimination'))
        let value4 = JSON.parse(localStorage.getItem('startQuarter'))
        let value5 = JSON.parse(localStorage.getItem('endQuarter'))
        if(value3 === null){
            this.setState({quarterMessage: 'You have not completed the elimination round', endElimination: false})
        }
        else{
            if(value === null){
                this.setState({currentTeam: [], endElimination: value3})
            }
            else{
                if(value2 === null){
                    this.setState({currentTeam: value, endElimination: value3},()=>{console.log(this.state.currentTeam)})
                }
                else{
                    if(value4 ===null){
                        this.setState({currentTeam:value, shuffleTeam:value2,shuffle:false, endElimination: value3})
                    }
                    else{
                        if(value5 === null){
                            this.setState({endElimination: value3, currentTeam:value, shuffleTeam:value2,shuffle:false, startQuarter: value4, quarterMessage:'Proceed to Quarter Final round in Current Game', endQuarter:false})
                        }
                        else{
                            this.setState({endElimination: value3, currentTeam:value, shuffleTeam:value2,shuffle:false, startQuarter: value4, quarterMessage:'Proceed to Semi Final round in Line up', endQuarter:value5})
                        }
                    }
                }
            }
        }
    }

    handleShuffle(){
        let currentTeam = shuffle(this.state.currentTeam)
        this.setState({shuffleTeam: currentTeam,randomize:true})
    }

    handleSaveTeam(){
        let value = JSON.parse(localStorage.getItem('team'))
        let shuffleTeam = this.state.shuffleTeam
        let shuffleTeamLength = shuffleTeam.length/2
        let newShuffleTeam = []
        let spliced;
        let data;
        let counter = 0;
        for(let i = 0; i < shuffleTeamLength; i++){
            counter +=1
            spliced = shuffleTeam.splice(0,2)
            data = {
                eliminateId: counter,
                teamOne: spliced[0],
                teamTwo: spliced[1]
            }
            newShuffleTeam.push(data)
        }
        this.setState({currentTeam: value, shuffleTeam: newShuffleTeam, shuffle:false,randomize:false},()=>{
            console.log(newShuffleTeam)
            localStorage.setItem('quarterShuffleTeam', JSON.stringify(this.state.shuffleTeam))
        })
    }

    handleReset(){
        this.setState({shuffleTeam:[], shuffle:true},()=>{
            localStorage.removeItem('quarterShuffleTeam')
        })
    }

    handleStart(){
        this.setState({startQuarter: true, quarterMessage:'Proceed to Quarter Final round in Current Game'},()=>{
            localStorage.setItem('startQuarter', JSON.stringify(this.state.startQuarter))
        })
    }

    render(){

        let shuffleButton;
        let saveButton;
        let resetButton;
        let startButton;
        if(this.state.endElimination !== false){
            if(this.state.shuffle === true && this.state.randomize === false){
                shuffleButton = <button className='btn btn-md btn-outline-primary' onClick={()=>{this.handleShuffle()}}>Shuffle team</button>
            }
            else if(this.state.shuffle === true && this.state.randomize === true){
                shuffleButton = <button className='btn btn-md btn-outline-primary mx-3' onClick={()=>{this.handleShuffle()}}>Shuffle team</button>
                saveButton = <button className='btn btn-md btn-outline-primary mx-3' onClick={()=>{this.handleSaveTeam()}}> Save arrangement</button>
            }
            else if(this.state.startQuarter === false){
                resetButton = <button className='btn btn-md btn-outline-primary' onClick={()=>{this.handleReset()}}>Reset</button>
                startButton = <button className='btn btn-md btn-outline-dark mx-3' onClick ={()=>{this.handleStart()}}>Start game</button>
            }
        }

        let shuffleTeam;
        if(this.state.shuffleTeam.length > 0){
            shuffleTeam = this.state.shuffleTeam.map((team,index)=>{
                if(this.state.shuffleTeam.length === 4){
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
                }
                else{
                    return(
                        <div className={Style.singleTeam+' m-3'}>
                            <p>{team.team.teamName}</p>
                        </div>
                    )
                }
            })
        }

        return(
            <div>
                <h1>Quarter final</h1>
                <div className='d-flex flex-row justify-content-center'>
                    {shuffleButton}
                    {saveButton}
                    {resetButton}
                    {startButton}
                </div>
                <h4>{this.state.quarterMessage}</h4>
                <div className='row'>
                    <div className='col-8 offset-2 d-flex flex-wrap justify-content-center'>
                        {shuffleTeam}
                    </div>
                </div>
            </div>
        )
    }
}

export default Quarterfinal;