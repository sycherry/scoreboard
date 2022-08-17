import { useState, useEffect } from 'react';
import { ItemList } from '../components/itemList';
import { ItemDataList } from '../models/ItemDataList';
import { Container, ScoreBoard } from './scoreboard.styles';

function Scoreboard() {
    const [isItemLoading, setIsItemLoading] = useState<boolean>(true);
    const [itemDataList, setItemDataList] = useState<ItemDataList[]>([]);

    const getItemsData = async () => {
        try {
            const response = await fetch('https://webcdn.17app.co/campaign/pretest/data.json') 
            const json = await response.json();
            setItemDataList(json);
        } catch (error) {
            console.error(error);
        } finally {
            setIsItemLoading(false);
        }
    }

    useEffect(() => {
        getItemsData();
    }, []);

    useEffect(() => {

        // randomly select people to update and update the score randomly
        const max = 2000;
        const min = 200;

        const scoreRandomUpdate = [...itemDataList].map((item) => {
            const randomScore = Math.floor(Math.random() * (max - min + 1) + min);
             // randomly select 30%
            const shouldUpdate = Math.random() < 0.3;
            return {
                ...item,
                score: shouldUpdate ? item.score + randomScore : item.score
            };
        });

        // create new ranking and sort
        const newScoreArray = [...scoreRandomUpdate].map((item, i) => {
            return {
                ...item,
                // new ranking position
                newIndex: i
            };
        }).sort((a, b) => (a.score < b.score ? 1 : -1));

        // this will be called every 1 second
        const timer = setInterval(() => {
            setItemDataList(newScoreArray);
        }, 1000);

        // cleanup
        return () => {
            clearInterval(timer);
        };
    }, [itemDataList]);

    return (
        <Container>
            <ScoreBoard>
                {isItemLoading ?
                    <div><p>Loading data...</p></div>
                    : itemDataList.map((item, i) => (
                        <ItemList
                            key={i}
                            newIndex={item.newIndex}
                            imageLink={item.picture}
                            updatedScore={item.score}
                            displayName={item.displayName}
                            index={i} />
                ))}
            </ScoreBoard>
        </Container>
    );
}
export default Scoreboard;


