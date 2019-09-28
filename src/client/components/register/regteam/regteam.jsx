import React from 'react';
import Style from './style.scss';

class Regteam extends React.Component{

    render(){

        let numberOfTeam = this.props.currentTeam.length

        let currentTeam;
        if(this.props.currentTeam.length > 0){
            currentTeam = this.props.currentTeam.map((team,index)=>{
                return(
                    <div className={Style.indivTeam}>
                        <p>{index+1}. {team.teamName}</p>
                    </div>
                )
            })
        }
        else{
            currentTeam = <p>No teams added </p>
        }

        let initializeButton;
        if(numberOfTeam === 16){
            initializeButton = <button className='btn btn-md btn-outline-secondary'>Initialize game</button>
        }

        return(
            <div>
                <p>Number of participating teams: {numberOfTeam}</p>
                {initializeButton}
                <div className='card-body text-center d-flex flex-wrap justify-content-between  align-items-center'>
                    {currentTeam}
                </div>

            </div>
        )
    }
}

export default Regteam;