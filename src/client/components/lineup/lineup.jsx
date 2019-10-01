import React from 'react';
import Style from './style.scss';

import Elimination from './elimination/elimination.jsx'
import Quarterfinal from './quarterfinal/quarterfinal.jsx'
import Semifinal from './semifinal/semifinal.jsx'
import Final from './final/final.jsx'

class Lineup extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            initialize: props.initialize,
            elimination: false,
            quarterFinal: false,
            semiFinal:false,
            final:false,
            currentTeam: []
        }
    }

    componentDidMount(){
        let value = JSON.parse(localStorage.getItem('team'))
        let value2 =JSON.parse(localStorage.getItem('teamInitialize'))
        if(value === null){
            this.setState({currentTeam: []})
        }
        else{
            this.setState({currentTeam: value, initialize: value2})
        }
    }

    handleElimination(){
        this.setState({elimination: true, quarterFinal: false,semiFinal:false, final:false})
    }

    handleQuarterFinal(){
        this.setState({elimination: false, quarterFinal: true, semiFinal:false, final:false})
    }

    handleSemiFinal(){
        this.setState({elimination: false, quarterFinal: false, semiFinal:true, final:false})
    }

    handleFinal(){
        this.setState({elimination: false, quarterFinal: false, semiFinal:false, final:true})
    }


    render(){
        let teamStage;
        if(this.state.initialize !== null){
            if(this.state.elimination === true){
                teamStage = <Elimination currentTeam={this.state.currentTeam} initialize={this.state.initialize}/>
            }
            else if(this.state.quarterFinal === true){
                teamStage = <Quarterfinal />
            }
            else if(this.state.semiFinal === true){
                teamStage = <Semifinal/>
            }
            else if(this.state.final === true){
                teamStage = <Final/>
            }
        }

        return(
            <div className='text-center'>
                <div className={Style.contentHeader}>
                    <h1> Lineup </h1>
                </div>
                <div className={Style.contentBody}>
                    <div className='d-flex flex-row justify-content-center'>
                        <button className='btn btn-md btn-outline-dark mx-3' onClick={()=>{this.handleElimination()}}> Elimination round </button>
                        <button className='btn btn-md btn-outline-dark mx-3' onClick={()=>{this.handleQuarterFinal()}}> Quarter Final </button>
                        <button className='btn btn-md btn-outline-dark mx-3' onClick={()=>{this.handleSemiFinal()}}> Semi Final </button>
                        <button className='btn btn-md btn-outline-dark mx-3' onClick={()=>{this.handleFinal()}}> Final </button>
                    </div>
                    {teamStage}
                </div>
            </div>
        )
    }
}

export default Lineup;