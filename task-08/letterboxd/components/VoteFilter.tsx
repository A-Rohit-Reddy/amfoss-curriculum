'use client'
import React, { useRef, useState } from 'react';
import { Kavoon } from 'next/font/google';
import styles from '../app/movies/movies.module.css';
import '../styles/filterButtons.css';

const kavoon = Kavoon({
  subsets: ['latin'],
  weight: '400'
})

const VoteFilter = ({ isDialogOpen, setIsDialogOpen, setSelectedVote, selectedVotes }) => {
  const dialogRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const voteOptions = [9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5];

  const handleClick = () => {
    if (!isDialogOpen) {
      dialogRef.current.showModal();
      setIsDialogOpen(true);
    } else {
      setIsClosing(true);
      setTimeout(() => {
        dialogRef.current.close();
        setIsDialogOpen(false);
        setIsClosing(false);
      }, 400);
    }
  };

  const handleSelect = (votes) => {
    setSelectedVote(votes);
    setIsClosing(true);
    setTimeout(() => {
      dialogRef.current.close();
      setIsDialogOpen(false);
      setIsClosing(false)
    },400)
  }

  const buttonText = (votes) => {
    const select = voteOptions.find((l) => l === votes)
    return select? `${select}+ ▼` : 'Votes'
  }

  return (
    <>
      <button className={styles.filterBy} onClick={handleClick}>
        {buttonText(selectedVotes)}
      </button>

      <dialog ref={dialogRef} className={isClosing ? 'dialog-slide-close' : (isDialogOpen ? 'dialog-slide-open' : '')}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div>
            <h2 style={{color: '#022541', textAlign: 'center', fontSize: '45px', marginBottom: '50px', marginLeft: '790px'}} className={kavoon.className}>Year Of Release</h2>
          </div>
          <div style={{paddingLeft: '100px'}}>
            <button onClick={handleClick} style={{backgroundColor: '#66FCF1', border: 'none'}}>
              <img 
              src='cancel.png'
              width={60}
              height={60}
              />
            </button>
          </div>
        </div>
        <div className='filter-grid'>
          {voteOptions.map((vote) => (
            <button key={vote} className='filter-button' onClick={() => handleSelect(vote)}>
              {vote}+
            </button>
          ))}
        </div>
      </dialog>
    </>
  );
};

export default VoteFilter;
