import { useContext } from 'react'
import { ChanllengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext' 

import styles from "../styles/components/ChallengeBox.module.css"

export default function ChallengeBox() { 
    const { activeChallenge, resetChalleng, completedChallenge } = useContext(ChanllengesContext)
    const { resetCountdown } = useContext(CountdownContext)

    function handleChallengeSucceeded() { 
        completedChallenge()
        resetCountdown()
    }

    function handleChallengeFailled() { 
        resetChalleng()
        resetCountdown()
    }

    return(
        <div className={styles.ChallengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button type="button" onClick={handleChallengeFailled} className={styles.challengeFailedButton}>Falhei</button>
                        <button type="button" onClick={handleChallengeSucceeded} className={styles.challengeSucceededButton}>Completei</button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level up"/>
                    Avance de level completando desafios
                </p>
            </div>
            )}
        </div>
    )
}