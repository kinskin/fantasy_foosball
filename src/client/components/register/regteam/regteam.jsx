import React from 'react';
import Style from './style.scss';

class Regteam extends React.Component{

    constructor(){

        super()

        this.state = {
            initialize: false
        }
    }

    componentDidMount(){
        let value = JSON.parse(localStorage.getItem('teamInitialize'))
        console.log('this is the value: ', value)
        if(value === null || value === undefined){
            this.setState({initialize: false})
        }
        else{
            this.setState({initialize: value},()=>{
                this.props.handleInitialize(true)
            })

        }
    }

    handleInitialize(){
        this.setState({initialize: true},()=>{
            localStorage.setItem('teamInitialize', JSON.stringify(this.state.initialize))
            this.props.handleInitialize(true)
        })
    }

    render(){

        let numberOfTeam = this.props.currentTeam.length

        let currentTeam;
        if(this.props.currentTeam.length > 0){
            currentTeam = this.props.currentTeam.map((team,index)=>{
                return(
                    <div className={Style.indivTeam} key={index}>
                        <p>{index+1}. {team.teamName}</p>
                    </div>
                )
            })
        }
        else{
            currentTeam = <p>No teams added </p>
        }

        let initializeButton;
        if(numberOfTeam === 16 && this.state.initialize === false){
            initializeButton = <button className='btn btn-md btn-outline-secondary' onClick={()=>{this.handleInitialize()}}>Initialize game</button>
        }

        return(
            <div>
                <p>Number of participating teams: {numberOfTeam}</p>
                {initializeButton}
                <div className='card-body text-center d-flex flex-wrap justify-content-center'>
                    {currentTeam}
                </div>

            </div>
        )
    }
}

export default Regteam;