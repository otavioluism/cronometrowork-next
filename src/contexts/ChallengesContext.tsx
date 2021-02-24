import { createContext, useState, ReactNode } from 'react'

interface ChanllengesContextData { 
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewCHallenge: () => void;
}

interface ChanllengesProviderProps { 
    children: ReactNode;
}

export const ChanllengesContext = createContext({} as ChanllengesContextData)

export function ChallengesProvider({ children }: ChanllengesProviderProps) { 
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChanllengesCompleted] = useState(0)

    function levelUp(){ 
        setLevel(level + 1)
    }

    function startNewCHallenge() { 
        console.log('New challenge')
    }

    return (
        <ChanllengesContext.Provider value={{level, currentExperience, challengesCompleted, levelUp, startNewCHallenge}}>
            {children}
        </ChanllengesContext.Provider>
    )

}

