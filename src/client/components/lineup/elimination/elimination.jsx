import React from 'react';
import Style from './style.scss';
import shuffle from 'shuffle-array';

class Elimination extends React.Component{

    constructor(props){
        super(props)

        this.state = {
                currentTeam: props.currentTeam,
                initialize: props.initialize,
                randomize:false,
                shuffle:true,
                startElimination: false,
                eliminationMessage:'',
                holdingTeam:[],
                shuffleTeam: [],
            }
    }

    componentDidMount(){
        let value = JSON.parse(localStorage.getItem('team'))
        let value2 =JSON.parse(localStorage.getItem('teamInitialize'))
        let value3 =JSON.parse(localStorage.getItem('eliminationShuffleTeam'))
        let value4 = JSON.parse(localStorage.getItem('startElimination'))
        let value5 = JSON.parse(localStorage.getItem('endElimination'))
        if(value === null){
            this.setState({currentTeam: []})
        }
        else{
            if(value3 === null){
                this.setState({currentTeam: value, initialize: value2})
            }
            else{
                if(value4 === null){
                    this.setState({currentTeam: value, initialize: value2, shuffleTeam:value3, shuffle:false})
                }
                else{
                    if(value5 === null){
                        this.setState({currentTeam: value, initialize: value2, shuffleTeam:value3, startElimination: value4, eliminationMessage:'Proceed to Elimination Round in Current Game', shuffle:false, })
                    }
                    else{
                        this.setState({currentTeam: value, initialize: value2, shuffleTeam:value3, startElimination: value4, eliminationMessage: 'Proceed to Quarter Final in Line up', shuffle:false, })
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
            localStorage.setItem('eliminationShuffleTeam', JSON.stringify(this.state.shuffleTeam))
        })
    }

    handleReset(){
        this.setState({shuffleTeam:[], shuffle:true},()=>{
            localStorage.removeItem('eliminationShuffleTeam')
        })
    }

    handleStart(){
        this.setState({startElimination: true, eliminationMessage:'Proceed to Elimination Round in Current Game'},()=>{
            localStorage.setItem('startElimination', JSON.stringify(this.state.startElimination))
        })
    }

    handleCurrentGame(){
        console.log(event.target.id)
    }



    render(){
        let shuffleButton;
        let saveButton;
        let resetButton;
        let startButton;
        if(this.state.shuffle === true && this.state.randomize === false){
            shuffleButton = <button className='btn btn-md btn-outline-primary' onClick={()=>{this.handleShuffle()}}>Shuffle team</button>
        }
        else if(this.state.shuffle === true && this.state.randomize === true){
            shuffleButton = <button className='btn btn-md btn-outline-primary mx-3' onClick={()=>{this.handleShuffle()}}>Shuffle team</button>
            saveButton = <button className='btn btn-md btn-outline-primary mx-3' onClick={()=>{this.handleSaveTeam()}}> Save arrangement</button>
        }
        else if(this.state.startElimination === false){
            resetButton = <button className='btn btn-md btn-outline-primary mx-3' onClick={()=>{this.handleReset()}}>Reset</button>
            startButton = <button className='btn btn-md btn-outline-dark mx-3' onClick ={()=>{this.handleStart()}}>Start game</button>
        }

        let shuffleTeam;
        if(this.state.shuffleTeam.length > 0){
            shuffleTeam = this.state.shuffleTeam.map((team,index)=>{
                if(this.state.shuffleTeam.length === 8){
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
                }
                else{
                    return(
                        <div className={Style.singleTeam+' m-3'}>
                            <p>{team.teamName}</p>
                        </div>
                    )
                }
            })
        }


        return(
            <div>
                <h1>Elimination round</h1>
                <div className='d-flex flex-row justify-content-center'>
                    {shuffleButton}
                    {saveButton}
                    {resetButton}
                    {startButton}
                </div>
                <h4>{this.state.eliminationMessage}</h4>
                <div className='row'>
                    <div className='col-8 offset-2 d-flex flex-wrap justify-content-center'>
                        {shuffleTeam}
                    </div>
                </div>
            </div>
        )
    }
}

export default Elimination;