import React from 'react';
import Style from './style.scss'

class Home extends React.Component{

    constructor(){

        super()

        this.state = {
            startGame: false
        }
    }

    componentDidMount(){
        let startGame = JSON.parse(localStorage.getItem('startGame'))
        if(startGame === null){
            this.setState({startGame: false},()=>{
                this.props.restartGame(this.state.startGame)
            })
        }
        else{
            this.setState({startGame: startGame},()=>{
                this.props.startGame(this.state.startGame)
            })
        }
    }

    handleStartGame(){
        this.setState({startGame:true},()=>{
            localStorage.setItem('startGame', JSON.stringify(this.state.startGame))
            this.props.startGame(this.state.startGame)
        })
    }

    handleRestart(){
        this.setState({startGame: false},()=>{
            this.props.restartGame(this.state.startGame)
            localStorage.clear()
        })
    }

    render(){

        let mainButton;
        if(this.state.startGame === false){
            mainButton = <button className='btn btn-md btn-outline-success' onClick={()=>{this.handleStartGame()}}> Start game </button>
        }
        else{
            mainButton = <button className='btn btn-md btn-outline-danger' onClick={()=>{this.handleRestart()}}> Restart game </button>
        }


        return(
            <div className='text-center'>
                <div className={Style.contentHeader}>
                    <p>Home</p>
                </div>
                <div className={Style.contentBody}>
                    <p>This is a Foosball Scoreboard app</p>
                    <div className='row'>
                        <div className='col-4 offset-4 d-flex flex-row justify-content-around'>
                            {mainButton}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;