import React, { useState, useEffect } from 'react'

import './App.css';

export interface StreamerData {
  userID: string;
  displayName: string;
  picture: string;
  score: number;
}

function App() {

  const [isItemLoading, setIsItemLoading] = useState<boolean>(true);
  const [itemDataList, setItemDataList] = useState<any[]>([])

  const getItemsData = async () => {
    try {
      const response = await fetch('https://webcdn.17app.co/campaign/pretest/data.json');
      const json = await response.json();
      setItemDataList(json);
    } catch (error) {
      console.error(error);
    } finally {
      // This code is for testing of loading indicator
      await wait(2)
      setIsItemLoading(false);
    }
  }
  
  useEffect(() => {
    getItemsData()
  }, []);

  //This code is for testing of loading indicator
  function wait(seconds: number) {
    return new Promise(resolve => {
      setTimeout(() => { resolve('') }, seconds * 1000);
    })
  }


  return (
    <div className="App">
      {isItemLoading ?
        <div><p>Loading data...</p></div>
        : itemDataList.map((item, i) => (
          <>
            <p>{item.userID}</p>
            <p>{item.displayName}</p>
            <p>{item.picture}</p>
            <p>{item.score}</p>
          </>
        ))
      }
    </div >
  );
}

export default App;
