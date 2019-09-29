import React from 'react';
import Style from './style.scss';

class Lineup extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            initialize: props.initialize,
            elimination: false,
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

    render(){
        let allTeams;
        if(this.state.initialize !== null){
            allTeams = this.state.currentTeam.map((team,index)=>{
                return(
                    <div className={Style.indivTeam}>
                        <p>{index+1}. {team.teamName}</p>
                    </div>
                )
            })
        }

        return(
            <div className='text-center'>
                <div className={Style.contentHeader}>
                    <h1> Lineup </h1>
                </div>
                <div className={Style.contentBody}>
                    <div className='d-flex flex-row justify-content-center'>
                        <button className='btn btn-md btn-outline-dark mx-3'> Elimination round </button>
                        <button className='btn btn-md btn-outline-dark mx-3'> Semi Final </button>
                        <button className='btn btn-md btn-outline-dark mx-3'> Final </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Lineup;