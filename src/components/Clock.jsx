import React, { useState, useRef, useEffect } from 'react'

const Clock = () => {
  const audio = useRef(null)

  const initialState = {
    countdownLength: 25,
    breakLength: 5,
    timeMinutes: 25,
    timeSeconds: 0
  }

  const [play, setPlay] = useState(false)
  const [breakl, setBreakl] = useState(false)
  const [clock, setClock] = useState(initialState)

  const addBreakLength = () => {
    if (clock.breakLength >= 60) {
      return
    }
    if (play == false) {
      setClock({
        ...clock,
        breakLength: clock.breakLength + 1
      })
    }
  }

  const reduceBreakLength = () => {
    if (play == false) {
      setClock({
        ...clock,
        breakLength: clock.breakLength - 1 ? clock.breakLength - 1 : 1
      })
    }
  }

  const addCountdownLength = () => {
    if (clock.countdownLength >= 60) {
      return
    }
    if (play == false) {
      setClock({
        ...clock,
        countdownLength: clock.countdownLength + 1,
        timeMinutes: clock.countdownLength + 1
      })
    }
  }

  const reduceCountdownLength = () => {
    if (play == false) {
      setClock({
        ...clock,
        countdownLength: clock.countdownLength > 2 ? clock.countdownLength - 1 : 1,
        timeMinutes: clock.countdownLength > 2 ? clock.countdownLength - 1 : 1
      })
    }
  }
  const playAction = () => {
    setPlay(!play)
  }
  const resetAction = () => {
    setClock(initialState)
    setPlay(false)
    setBreakl(false)
    audio.current.currentTime = 0
    audio.current.pause()
  }

  const playSound = () => {
    audio.current.currentTime = 0
    audio.current.play()
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (clock.timeSeconds == 0) {
        setClock({
          ...clock,
          timeSeconds: 59,
          timeMinutes: clock.timeMinutes - 1
        })
      }

      if (clock.timeSeconds == 0 && clock.timeMinutes == 0 && breakl == true) {
        playSound()
        setClock({
          ...clock,
          timeMinutes: clock.countdownLength,
          timeSeconds: 0
        })
        setBreakl(false)
      }

      if (clock.timeSeconds == 0 && clock.timeMinutes == 0 && breakl == false) {
        playSound()
        setClock({
          ...clock,
          timeMinutes: clock.breakLength,
          timeSeconds: 0
        })
        setBreakl(true)
      }

      if (clock.timeSeconds > 0) {
        setClock({
          ...clock,
          timeSeconds: clock.timeSeconds - 1
        })
      }
    }, 1000)

    if (play == false) {
      clearTimeout(timeOut)
    }

    return () => {
      clearTimeout(timeOut)
    }
  })

  return (
    <>
      <header className='header'>
        <h1 className='header__title'>25 + 5 Clock</h1>
        <section className='header__lengths'>

          <article className='header__box'>
            <span id='break-label'>Break Length</span>
            <div>
              <i id='break-decrement' onClick={reduceBreakLength} className='fa-solid fa-arrow-down' />
              <span id='break-length'>{clock.breakLength}</span>
              <i id='break-increment' onClick={addBreakLength} className='fa-solid fa-arrow-up' />
            </div>
          </article>

          <article className='header__box'>
            <span id='session-label'>Session Length</span>
            <div>
              <i id='session-decrement' onClick={reduceCountdownLength} className='fa-solid fa-arrow-down' />
              <span id='session-length'>{clock.countdownLength}</span>
              <i id='session-increment' onClick={addCountdownLength} className='fa-solid fa-arrow-up' />
            </div>
          </article>

        </section>
      </header>
      <section className='clock'>
        <h2 id='timer-label' className='clock__title'>{breakl ? 'Break' : 'Session'}</h2>
        <div style={clock.timeMinutes == 0 ? { color: 'red' } : {}} id='time-left' className='clock__timer'>{clock.timeMinutes < 10 && clock.timeMinutes >= 0 ? '0' + clock.timeMinutes : clock.timeMinutes}:{clock.timeSeconds < 10 && clock.timeSeconds >= 0 ? '0' + clock.timeSeconds : clock.timeSeconds}</div>
      </section>
      <section className='clock__control'>
        <i id='start_stop' onClick={playAction} className='fa-solid fa-play' />
        <i onClick={playAction} className='fa-solid fa-pause' />
        <i id='reset' onClick={resetAction} className='fa-solid fa-repeat' />
        <audio id='beep' ref={audio} src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav' />
      </section>
    </>
  )
}

export default Clock
