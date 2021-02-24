import { useState, useEffect, useContext } from "react"
import { ChanllengesContext } from '../contexts/ChallengesContext'
import styles from "../styles/components/Countdown.module.css"


let countdownTimeout: NodeJS.Timeout;

export default function Countdown() { 
    const { startNewCHallenge } = useContext(ChanllengesContext)

    const [time, setTime] = useState(0.1 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)
    
    const minutes = Math.floor(time / 60)   // numero em minutos da divisao
    const seconds = time % 60 // resto da divisão 

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondeRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() { 
        setIsActive(true)
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
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

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                    <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondeRight}</span>
                </div>
            </div>

            { hasFinished ?
             (
               <button disabled className={styles.countdownButton}>
                     Ciclo encerrado
                </button>
             ) : 
            (
                <>
                    { isActive ? 
                        (           
                            <button type="button" onClick={resetCountdown} className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                            Abandonar Ciclo
                        </button>
                        )   :
                        (
                        <button type="button" onClick={startCountdown} className={styles.countdownButton}>
                            Iniciar um ciclo
                        </button>
                        )
                    }
                </>
            )}

        </div>
    );
}