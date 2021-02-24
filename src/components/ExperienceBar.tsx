import { useContext } from 'react';
import { ChanllengesContext } from '../contexts/ChallengesContext'

import styles from "../styles/components/ExperienceBar.module.css"

export default function ExperienceBar() { 
    const { currentExperience, experienceToNextLevel } = useContext(ChanllengesContext)

    const percentToNextLevel = Math.round((currentExperience * 100)) / experienceToNextLevel

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>

                <div style={{ width: `${percentToNextLevel}%` }} />

                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
                    {currentExperience} px
                </span>
                
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}