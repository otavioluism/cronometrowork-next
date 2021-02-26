import { GetServerSideProps } from 'next'
import styles from '../styles/pages/Home.module.css' 

import { ChallengesProvider } from "../contexts/ChallengesContext"
import { CountdownProvider } from '../contexts/CountdownContext'

import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from '../components/Countdown'
import ChallengeBox from "../components/ChallengeBox";

import Head from "next/head"

interface PropsCookies { 
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}


export default function Home(props: PropsCookies) {

  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}
    >
        <div className={styles.container}>

            <Head>
                <title>Início | move.it</title>
            </Head>

            <ExperienceBar />

            <CountdownProvider >
              <section>
                <div>
                    <Profile />
                    <CompletedChallenges />
                    <Countdown />
                </div>
                <div>
                    <ChallengeBox />
                </div>
              </section>
            </CountdownProvider>
        </div>
    </ChallengesProvider>
  )
}

// tudo que eu faço nessa função padrão roda no servidor NODE do NEXT.js e não no browser
// que é a camada que interliga o frontend e o backend
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  
  return { 
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}