import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'

import challenges from '../../challenges.json'


interface Challenge { 
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChanllengesContextData { 
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewCHallenge: () => void;
    resetChalleng: () => void;
    completedChallenge: () => void;
}

interface ChanllengesProviderProps { 
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChanllengesContext = createContext({} as ChanllengesContextData)

export function ChallengesProvider({ children, ...rest }: ChanllengesProviderProps) { 

    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChanllengesCompleted] = useState(rest.challengesCompleted ?? 0)

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => { 
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    function levelUp(){ 
        setLevel(level + 1)
    }

    function startNewCHallenge() { 
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length) // sorteando um desafio qualquer 
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission === 'granted') { 

            new Notification(' Novo desafio 🚀 ', { 
                body: ` Valendo ${challenge.amount}xp`,
            })

        }
    }

    function resetChalleng() { 
        setActiveChallenge(null);
    }

    function completedChallenge() {
        if (!activeChallenge) { 
            return;
        }

        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount


        if (finalExperience >= experienceToNextLevel) { 
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChanllengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChanllengesContext.Provider value={{
                level, 
                currentExperience, 
                challengesCompleted, 
                levelUp, 
                startNewCHallenge,
                activeChallenge,
                resetChalleng,
                experienceToNextLevel,
                completedChallenge
        }}>
            {children}
        </ChanllengesContext.Provider>
    )

}

