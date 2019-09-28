import React from 'react';
import Style from './style.scss'

class First extends React.Component{


    inputFirstPlayerFirstName(event){
        this.props.inputFirstPlayerFirstName(event.target.value)
    }

    inputFirstPlayerLastName(event){
        this.props.inputFirstPlayerLastName(event.target.value)
    }

    render(){

        return(
            <div className={Style.playerName}>
                <p>First player </p>
                <div className='d-flex flex-row justify-content-around align-items-start'>
                    First Name: <input className='form-control' onChange={(event)=>{this.inputFirstPlayerFirstName(event)}} value={this.props.firstPlayerFirstName}/>
                </div>
                <br/>
                <div className='d-flex flex-row justify-content-around align-items-start'>
                    Last Name: <input className='form-control' onChange={(event)=>{this.inputFirstPlayerLastName(event)}} value={this.props.firstPlayerLastName}/>
                </div>
            </div>
        )
    }
}

export default First;