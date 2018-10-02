import React from 'react';
import { Result } from './Result';
import { Outline } from './Outline';
import { changePage, handleKey } from '../actions';
import '../style/ResultsList.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import glass from '../images/glass.svg';

export const ResultsList = ({ results, outline, screenshots, query }) => {
  const ResultsArray = []
  const len = results.length
  for (let i = 0; i < len; i++) {
    ResultsArray.push(<Result data={results[i]} screenshots={screenshots} />)
  }

  return (
    <div>
      <div className="top-bar" ><h3 className="heading-1">Spresso</h3><h3 className="heading-2">Search</h3>
        <input defaultValue={decodeURI(query)} onKeyPress={(e) => handleKey(e, 'reset')} /><img className="glass" src={glass} />
      </div>
      <Outline outline={outline} />
      <InfiniteScroll
        dataLength={len}
        next={changePage}
        hasMore={true}
        loader={<p className="loading-text">Loading...</p>}
      >
        {ResultsArray}
      </InfiniteScroll>
    </div>
  )
}