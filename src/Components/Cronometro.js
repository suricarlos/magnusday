import React, {Component} from 'react';
import '../Styles/Cronometro.css';


class Cronometro extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            numero: '00:00:00',
            h2: 0,
            h3: 0,
            botao: 'PLAY',
            seconds: 0,
            minutes: 0,
            hours: 0,
            min: 0,
            minInter: 0,
            total: 0,
            totalInter: 0
        }
        this.beep = new Audio(require('../Assets/beep.mp3'))
        this.timer = null
        
        this.startCounting = this.startCounting.bind(this)
        this.play = this.play.bind(this)
        this.limpar = this.limpar.bind(this)
        this.pauseAudio = this.pauseAudio.bind(this)
        this.menos = this.menos.bind(this)
        this.mais = this.mais.bind(this)
        this.menosInter = this.menosInter.bind(this)
        this.maisInter = this.maisInter.bind(this)
    }

    startCounting = () => {
        const state = this.state
        state.seconds++;
        state.total--;
        state.totalInter--;
              if (state.seconds >= 60) {
                  state.seconds = 0;
                  state.minutes++;
                  if (state.minutes >= 60) {
                      state.minutes = 0;
                      state.hours++;
                  }
              }

              if(state.total == 0){
                  clearInterval(this.timer)
                  this.timer = null
                  state.botao = 'PLAY'
                  state.min = 0
                  state.minInter = 0
                  state.h2 = state.min
                  state.h3 = state.minInter
                  state.total = 0
                  state.totalInter =0
                  this.beepPlay()
              } 

              if(state.totalInter == 0){
                  this.beep.play()
                  state.totalInter = state.minInter * 60
              } else if(state.totalInter == 57){
                  this.pauseAudio()
              }

              state.numero = `${state.hours ? (state.hours > 9 ? state.hours : "0" + state.hours) : "00"}:${state.minutes ? (state.minutes > 9 ? state.minutes : "0" + state.minutes) : "00"}:${state.seconds > 9 ? state.seconds : "0" + state.seconds}`
              this.setState(state)
    } 

    play = () => {
        const state = this.state
        
        if(this.timer !== null) {
            clearInterval(this.timer)
            this.timer = null
            state.botao = 'PLAY'
            
        }   else {
            this.timer = setInterval(this.startCounting, 1000)
            state.botao = 'PAUSE'
            this.pauseAudio()
        }
        this.setState(state)
    }   

    limpar = () => {
        const state = this.state
        
        clearInterval(this.timer) 
        this.timer = null                 
        state.botao = 'PLAY'
        state.numero = '00:00:00'
        state.seconds = 0
        state.minutes = 0
        state.hours = 0
        state.min = 0
        state.total = 0
        state.h2 = state.min
        state.minInter = 0
        state.totalInter = 0
        state.h3 = state.minInter
        this.pauseAudio()
        this.setState(state)
    }

    menos = () => {
        const state = this.state
        if(state.min < 0){
            state.min = 0
            state.h2 = state.min
        } else if(state.min > 0){
            state.min--
            state.total -= 60
            state.h2 = state.min
        }
        this.setState(state)
    }

    mais = () => {
        const state = this.state
        state.min++
        state.total += 60
        state.h2 = state.min
        this.setState(state)
    }

    menosInter = () => {
        const state = this.state
        if(state.minInter < 0){
            state.minInter = 0
            state.h3 = state.minInter
        } else if(state.minInter > 0){
            state.minInter--
            state.totalInter -= 60
            state.h3 = state.minInter
        }
        this.setState(state)
    }

    maisInter = () => {
        const state = this.state
        state.minInter++
        state.totalInter += 60
        state.h3 = state.minInter
        this.setState(state)
    }

    pauseAudio = () => {
        this.beep.pause()
        this.beep.currentTime = 0.0
    }
    
    beepPlay = () => {
        this.beep.loop = true
        this.beep.play()
    }
    render(){
        return(
            <div className="container">
                <img src={require('../Assets/cronometro.svg')} alt="cronometro"className="img"/>
                <div className="minuto">
                    <a className="btnMin" onClick={this.menos}>-</a>
                    <h2 className="total">{this.state.h2}</h2>
                    <a className="btnMin" onClick={this.mais}>+</a>
                </div>
                <a className="magnusDay">MagnusDay</a>
                <h1 className="timer">{this.state.numero}</h1>
                
                <div className="minuto">
                    <a className="btnInter" onClick={this.menosInter}>-</a>
                    <h3 className="totalInter">{this.state.h3}</h3>
                    <a className="btnInter" onClick={this.maisInter}>+</a>
                </div>
                <div className="areabtn">
                    <a className="botao" onClick={this.play} >{this.state.botao}</a>
                    <a className="botao" onClick={this.limpar}>LIMPAR</a>
                </div>
            </div>
        )
    }
}

export default Cronometro;