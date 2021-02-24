import { createContext, useState, ReactNode } from 'react'
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
}

interface ChanllengesProviderProps { 
    children: ReactNode;
}

export const ChanllengesContext = createContext({} as ChanllengesContextData)

export function ChallengesProvider({ children }: ChanllengesProviderProps) { 
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChanllengesCompleted] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp(){ 
        setLevel(level + 1)
    }

    function startNewCHallenge() { 
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length) // sorteando um desafio qualquer 
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)
    }

    function resetChalleng() { 
        setActiveChallenge(null);
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
                experienceToNextLevel
        }}>
            {children}
        </ChanllengesContext.Provider>
    )

}

