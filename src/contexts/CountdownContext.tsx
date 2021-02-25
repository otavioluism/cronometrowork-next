import { createContext, useState, ReactNode, useContext, useEffect } from 'react'
import { ChanllengesContext } from '../contexts/ChallengesContext'

interface CountdownContextData { 
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps { 
  children: ReactNode;
}

// criando um contexto e passando o formato que retornara
export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) { 

  const { startNewCHallenge } = useContext(ChanllengesContext)

  const [time, setTime] = useState(0.1 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)
  
  const minutes = Math.floor(time / 60)   // numero em minutos da divisao
  const seconds = time % 60 // resto da divisão 

  function startCountdown() { 
    setIsActive(true)
}

  function resetCountdown() {
      clearTimeout(countdownTimeout)
      setIsActive(false)
      setHasFinished(false)
      setTime(0.1 * 60)
  }

  useEffect(() => { 

      if(isActive && time > 0) { 
        countdownTimeout = setTimeout( () => {
              setTime(time - 1)
          }, 1000)
      } else if(isActive && time === 0){ 
          setHasFinished(true)
          setIsActive(false)
          startNewCHallenge()
      }

  }, [isActive, time])
  
  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}