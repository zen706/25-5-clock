import React from 'react'

// 何故function App　では　うまくできないのかわからない。

// document.addEventListener('click', () => console.log('ffsgsff'))

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minutes: 25,
      seconds: 0,
      isUnderOne: false,
      isBreak: false,
    }
    // this.audio = document.getElementById('beep')

    this.timer = null

    this.tick = this.tick.bind(this) //必要
    this.incrementB = this.incrementB.bind(this)
    this.incrementS = this.incrementS.bind(this)
    this.decrementB = this.decrementB.bind(this)
    this.decrementS = this.decrementS.bind(this)
    this.startStop = this.startStop.bind(this)
    this.reset = this.reset.bind(this)
  }
  // const [breakLength, setBreakCount] = React.useState(5)
  // const [sessionLength, setSessionCount] = React.useState(25)
  // const [[minutes, seconds], setTime] = React.useState([25, 0])
  // const [timer, setTimer] = React.useState(null)

  // console.log(minutes, seconds)

  // const Ref = React.useRef(null)
  // const [num, setNum] = React.useState(0)
  // let count = 0
  // const count = React.useRef(0)
  // console.log(count)

  // React.useEffect(() => {
  //    count.current = count.current + 1
  // })

  // const seconds = new Date().getSeconds()
  // setInterval(() => {}, 1000)
  // setCount(9)
  // console.log(React.useState(0))

  componentDidMount() {
    // this.setState({
    //   breakLength: 55
    // })
    document.addEventListener('keydown', (e) => {
      // console.log(e)
      if (e.keyCode === 32) {
        this.startStop()
      } else if (e.keyCode === 40) {
        this.decrementS()
      } else if (e.keyCode === 38) {
        this.incrementS()
      }
    })
  }

  incrementB() {
    if (!this.timer) {
      if (this.state.breakLength < 60) {
        this.setState({
          breakLength: this.state.breakLength + 1,
        })
      }
    }
  }

  decrementB() {
    if (!this.timer) {
      if (this.state.breakLength > 1) {
        this.setState({
          breakLength: this.state.breakLength - 1,
        })
      }
    }
  }

  incrementS() {
    if (!this.timer) {
      if (this.state.sessionLength < 60) {
        this.setState({
          sessionLength: this.state.sessionLength + 1,
          minutes: this.state.minutes + 1,
          seconds: 0,
        })
      }
    }
  }

  decrementS() {
    if (!this.timer) {
      if (this.state.sessionLength > 1) {
        let update = [this.state.sessionLength - 1, this.state.minutes - 1]
        this.setState({
          sessionLength: update[0],
          minutes: update[1],
          seconds: 0,
        })
      }
    }
  }

  checkUnderOne() {
    if (this.state.minutes === 1 && this.state.seconds === 0) {
      this.setState({
        isUnderOne: true,
      })
    }
  }
  
  tick() {
    this.checkUnderOne()
    if (this.state.minutes === 0 && this.state.seconds === 0) {
      this.audiobeep.play()
      if (!this.setState.isBreak) {
        this.setState({
          minutes: this.state.breakLength,
          isBreak: !this.state.isBreak,
          isUnderOne: false,
        })
      } else {
        this.setState({
          minutes: this.state.sessionLength,
          isBreak: !this.state.isBreak,
          isUnderOne: false,
        })
      }
    } else if (this.state.seconds === 0) {
      this.setState({
        minutes: this.state.minutes - 1,
        seconds: 59,
      })
    } else {
      this.setState({
        minutes: this.state.minutes,
        seconds: this.state.seconds - 1,
      })
    }
  }

  startStop() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    } else {
      this.timer = setInterval(this.tick, 1000)
    }
  }

  reset() {
    this.audiobeep.pause()
    this.audiobeep.currentTime = 0
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      minutes: 25,
      seconds: 0,
      isUnderOne: false,
      isBreak: false,
    })
    clearInterval(this.timer)
    this.timer = null
  }

  render() {
    console.log(this.timer, this.audiobeep)
    console.log(this.state.isUnderOne)
    return (
      <div className='container'>
        <h1>25 + 5 Clock</h1>
        <div className='break-session'>
          <div className='break'>
            <h2 id='break-label'>Break Length</h2>
            <div>
              <span id='break-decrement' onClick={this.decrementB}>
                <i class='bi bi-caret-down-fill'></i>
              </span>
              <span id='break-length'>{this.state.breakLength}</span>
              <span id='break-increment' onClick={this.incrementB}>
                <i class='bi bi-caret-up-fill'></i>
              </span>
            </div>
          </div>
          <div className='session'>
            <h2 id='session-label'>Session Length</h2>
            <div>
              <span id='session-decrement' onClick={this.decrementS}>
                <i class='bi bi-caret-down-fill'></i>
              </span>
              <span id='session-length'>{this.state.sessionLength}</span>
              <span id='session-increment' onClick={this.incrementS}>
                <i class='bi bi-caret-up-fill'></i>
              </span>
            </div>
          </div>
        </div>
        <div className={this.state.isUnderOne ? 'timer red' : 'timer'}>
          <h3 id='timer-label'>{this.state.isBreak ? 'Break' : 'Session'}</h3>
          <div id='time-left'>
            {this.state.minutes > 9
              ? this.state.minutes
              : '0' + this.state.minutes}
            :
            {this.state.seconds > 9
              ? this.state.seconds
              : '0' + this.state.seconds}
          </div>
        </div>
        <div>
          <span id='start_stop' onClick={this.startStop}>
            <i class='bi bi-play-fill'></i>
          </span>
          <span id='start_stop' onClick={this.startStop}>
            <i class='bi bi-pause-fill'></i>
          </span>
          <span id='reset' onClick={this.reset}>
            <i class='bi bi-arrow-repeat'></i>
          </span>
        </div>
        <div>
          <p>Designed and Coded by</p>
          <p>John Smith</p>
        </div>
        <audio
          id='beep'
          ref={(self) => {
            this.audiobeep = self
          }}
          src='http://soundbible.com/grab.php?id=1218&type=mp3'
        />
      </div>
    )
  }
}

// function App() {
//   const [breakLength, setBreakCount] = React.useState(5)
//   const [sessionLength, setSessionCount] = React.useState(25)
//   const [[minutes, seconds], setTime] = React.useState([25, 0])
//   const [timer, setTimer] = React.useState(null)

//   console.log(minutes, seconds)

//   const Ref = React.useRef(null)
//   // const [num, setNum] = React.useState(0)
//   // let count = 0
//   // const count = React.useRef(0)
//   // console.log(count)

//   // React.useEffect(() => {
//   //    count.current = count.current + 1
//   // })

//   // const seconds = new Date().getSeconds()
//   // setInterval(() => {}, 1000)
//   // setCount(9)
//   // console.log(React.useState(0))

//   const incrementB = () => {
//     setBreakCount((prevState) => prevState + 1)
//   }

//   const decrementB = () => {
//     if (breakLength > 1) {
//       setBreakCount((prevState) => prevState - 1)
//     }
//   }

//   const incrementS = () => {
//     setSessionCount((prevState) => prevState + 1)
//     setTime(([prevMinutes, prevSeconds]) => [prevMinutes + 1, prevSeconds])
//   }

//   const decrementS = () => {
//     if (sessionLength > 1) {
//       setSessionCount((prevState) => prevState - 1)
//       setTime(([prevMinutes, prevSeconds]) => [prevMinutes - 1, 0])
//     }
//   }

//   console.log([minutes,seconds])

//   const tick = () => {
//     if (minutes === 0 && seconds === 0) {
//       // reset()
//       clearInterval(timer)
//     } else if (seconds === 0) {
//       // setTime(([prevMinutes, prevSeconds]) => [prevMinutes - 1 , 59])

//       setTime([minutes - 1, 59])

//       // console.log(minutes,seconds)
//     } else {
//       // console.log(minutes, seconds)
//       setTime([minutes, seconds - 1])

//       // setTime(([prevMinutes, prevSeconds]) => [prevMinutes, prevSeconds - 1])
//     }
//   }
//   // setInterval(tick, 1000)

//   // const timerId = setInterval(tick, 1000)
//   console.log(Ref, timer)
//   const reset = () => {
//     setTime([25, 0])
//     // if(Ref.current) clearInterval(Ref.current)
//     setTimer(setInterval(tick, 1000))
//     // Ref.current = setInterval(tick, 1000)
//     // return () => clearInterval(timerId)

//     // Ref.current = timerId
//   }

//   React.useEffect(() => {
//     // setTime([minutes-1,seconds-1])
//     // const timeId = setInterval(tick,1000)
//     // console.log([minutes,seconds])
//     // return () => clearInterval(timeId)
//   })
//   //  setInterval(increment, 1000)

//   // console.log(breakLength, sessionLength)

//   return (
//     <div>
//       {/* <div className="num"></div> */}
//       <h1>25 + 5 Clock</h1>
//       <div>
//         <div>
//           <h2 id='break-label'>Break Length</h2>
//           <div>
//             <span id='braek-decrement' onClick={decrementB}>
//               ⬇
//             </span>
//             <span id='break-length'>{breakLength}</span>
//             <span id='break-increment' onClick={incrementB}>
//               ⬆
//             </span>
//           </div>
//         </div>
//         <div>
//           <h2 id='session-label'>Session Length</h2>
//           <div>
//             <span id='session-decrement' onClick={decrementS}>
//               ⬇
//             </span>
//             <span id='session-length'>{sessionLength}</span>
//             <span id='session-increment' onClick={incrementS}>
//               ⬆
//             </span>
//           </div>
//         </div>
//       </div>
//       <div>
//         <h3 id='timer-label'>Session</h3>
//         <h1 id='time-left'>
//           {minutes > 9 ? minutes : '0' + minutes}:
//           {seconds > 9 ? seconds : '0' + seconds}
//         </h1>
//       </div>
//       <div>
//         <span id='start_stop' onClick={tick}>
//           ➡
//         </span>
//         <span>■</span>
//         <span id='reset' onClick={reset}>
//           ↻
//         </span>
//       </div>
//       <p>Designed and Coded by</p>
//       <p>John Smith</p>
//     </div>
//   )
// }

export default App