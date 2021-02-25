import { useContext } from 'react'
import { ChanllengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export default function Profile() {
    const { level } = useContext(ChanllengesContext)

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/otavioluism.png" alt="Diego Fernandes"/>
            <div>
                <strong>Otávio Luis Martins</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}