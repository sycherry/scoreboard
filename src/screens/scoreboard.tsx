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
        const scoreRandomUpdate = [...itemDataList];
        
        // randomly select people to update and update the score randomly
        [...scoreRandomUpdate]
        .forEach((element) => {
            const max = 2000;
            const min = 200;
            const randomScore = Math.floor(Math.random() * (max - min + 1) + min);
            //randomly select 30%
            const shouldUpdate = Math.random() < 0.3;
            element.score = shouldUpdate ? element.score + randomScore : element.score
        });

        [...scoreRandomUpdate]
            // sort array for new index(new ranking)
            .sort((a, b) => (a.score < b.score ? 1 : -1))
            // update new index
            .forEach((element, index) => {
                element.newIndex = index;
            });
  
        //this will be called every 1 second
        const timer = setInterval(() => {
            setItemDataList(scoreRandomUpdate);
        }, 2000);

        //cleanup
        return () => {
            clearInterval(timer);
        };
    }, [itemDataList]);

    return (
        <Container>
            <ScoreBoard>
                {isItemLoading &&
                    <div><p>Loading data...</p></div>}
                <ul>
                    {itemDataList.map((item, i) => (
                        <ItemList
                            key={i}
                            newIndex={item.newIndex}
                            imageLink={item.picture}
                            updatedScore={item.score}
                            displayName={item.displayName}
                            index={i} />
                    ))}
                </ul>
            </ScoreBoard>
        </Container>
    );
}
export default Scoreboard;


