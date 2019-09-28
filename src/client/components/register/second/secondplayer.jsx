import React from 'react';
import Style from './style.scss'

class Second extends React.Component{


    inputSecondPlayerFirstName(event){
        this.props.inputSecondPlayerFirstName(event.target.value)
    }

    inputSecondPlayerLastName(event){
        this.props.inputSecondPlayerLastName(event.target.value)
    }

    render(){

        return(
            <div className={Style.playerName}>
                <p>Second player </p>
                <div className='d-flex flex-row justify-content-around align-items-start'>
                    First Name: <input className='form-control' onChange={(event)=>{this.inputSecondPlayerFirstName(event)}} value={this.props.secondPlayerFirstName}/>
                </div>
                <br/>
                <div className='d-flex flex-row justify-content-around align-items-start'>
                    Last Name: <input className='form-control' onChange={(event)=>{this.inputSecondPlayerLastName(event)}} value={this.props.secondPlayerLastName}/>
                </div>
            </div>
        )
    }
}

export default Second;