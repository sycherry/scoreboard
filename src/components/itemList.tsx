import { useState, useEffect } from 'react'
import { SetColumn, ItemIndex, Picture, Score } from './itemList.styles';
import { ItemListProps } from './itemList.props';

export function ItemList(props: ItemListProps) {

    const { newIndex, imageLink, updatedScore, displayName, index } = props;
    const [currentScore, setCurrentScore] = useState(updatedScore);

    // animate score changes
    useEffect(() => {
        const timer = setInterval(() => {
            const plusScore = updatedScore - currentScore;
            // update score incrementally 5 times
            const updates = Math.floor(plusScore / 5);
            setCurrentScore(currentScore + updates);
        }, 20);
        return () => {
            clearInterval(timer);
        };
    }, [updatedScore, currentScore]);

    //console.log("updatedScore",updatedScore)

    return (
        <SetColumn newIndex={newIndex} index={index}>
            <ItemIndex>{newIndex ? newIndex + 1 : index + 1}</ItemIndex>
            <Picture imageLink={imageLink}></Picture>
            <p>{displayName}</p>
            <Score>{currentScore}</Score>
        </SetColumn>
    );
};
