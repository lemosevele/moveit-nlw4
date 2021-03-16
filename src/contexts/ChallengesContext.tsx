import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface ChallengesProviderProps{
    children: ReactNode;
}

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;

}

interface ChallengesContextData{
    level: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNextLevel: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setcurrentExperience] = useState(0);
    const [challengesCompleted, setchallengesCompleted] = useState(0);
    const [activeChallenge, setactiveChallenge] = useState(null);

    /** cálculo dos RPGS para definir xp para o próximo o level */
    const experienceToNextLevel = Math.pow((level+1) * 4, 2);

    function levelUp(){
        setLevel(level+1);
    }

    function startNewChallenge(){
        const randomChallengeBox = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeBox];
        setactiveChallenge(challenge);
    }

    function resetChallenge(){
        setactiveChallenge(null);
    }

    return(
        <ChallengesContext.Provider 
            value={ {
                level, 
                levelUp, 
                startNewChallenge,
                currentExperience, 
                challengesCompleted,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel
            } }>
                {children}
        </ChallengesContext.Provider>
    );
}