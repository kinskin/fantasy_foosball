import React from 'react';
import Style from './style.scss';


import Elimination from './elimination/elimination.jsx'
import Quarterfinal from './quarterfinal/quarterfinal.jsx'
import Semifinal from './semifinal/semifinal.jsx'
import Final from './final/final.jsx'

class Currentgame extends React.Component{

    constructor(){
        super()

        this.state = {
            initialize: '',
            elimination: false,
            startEliminationMessage: '',
            quarterFinal: false,
            semiFinal:false,
            final:false
        }
    }

    componentDidMount(){
        let value2 = JSON.parse(localStorage.getItem('teamInitialize'))
        if(value2 !== null){
            this.setState({initialize: value2})
        }
        else{
            this.setState({initialize:false})
        }
    }

    handleElimination(){
        let startElimination = JSON.parse(localStorage.getItem('startElimination'))
        if(startElimination === null){
            this.setState({elimination:false, quarterFinal:false, semiFinal:false, final:false, startEliminationMessage: 'You have not start the game in Elimination section in Line up'})
        }
        else{
            this.setState({elimination:true, quarterFinal:false, semiFinal:false, final:false, startEliminationMessage: ''})
        }
    }

    handleQuarterFinal(){
        this.setState({elimination:false, quarterFinal:true, semiFinal:false, final:false})
        console.log('quarter')
    }

    handleSemiFinal(){
        this.setState({elimination:false, quarterFinal:false, semiFinal:true, final:false})
        console.log('semifinal')
    }

    handleFinal(){
        this.setState({elimination:false, quarterFinal:false, semiFinal:false, final:true})
        console.log('final')
    }

    render(){

        let renderStage;
        if(this.state.initialize === true){
            if(this.state.elimination === true){
                renderStage = <Elimination/>
            }
            else if(this.state.quarterFinal === true){
                renderStage = <Quarterfinal/>
            }
            else if(this.state.semiFinal === true){
                renderStage = <Semifinal/>
            }
            else if(this.state.final === true){
                renderStage = <Final/>
            }
            else{
                renderStage = <p> Select one of the stage </p>
            }
        }
        else{
            renderStage = <p> Please initialize the game </p>
        }

        return(
            <div className='text-center'>
                <div className={Style.contentHeader}>
                    <h1> Current game </h1>
                </div>
                <div className='row my-3'>
                    <div className={Style.content+' col-6 offset-3'}>
                        <div className={Style.contentBodyHeader} onClick={()=>{this.handleElimination()}}>
                            <p>Elimination round</p>
                        </div>
                        <div className={Style.contentBodyHeader} onClick={()=>{this.handleQuarterFinal()}}>
                            <p>Quarter final round</p>
                        </div>
                        <div className={Style.contentBodyHeader} onClick={()=>{this.handleSemiFinal()}}>
                            <p>Semi final round</p>
                        </div>
                        <div className={Style.contentBodyHeader} onClick={()=>{this.handleFinal()}}>
                            <p>Final round</p>
                        </div>
                    </div>
                </div>
                <div className={Style.contentBody}>
                    {renderStage}
                </div>
                <div className='text-center'>
                    <h4>{this.state.startEliminationMessage}</h4>
                </div>
            </div>
        )
    }
}

export default Currentgame;