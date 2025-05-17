'use client'
import React, { useRef, useState } from 'react';
import { Kavoon } from 'next/font/google';
import styles from '../app/movies/movies.module.css';
import '../styles/filterButtons.css';

const kavoon = Kavoon({
  subsets: ['latin'],
  weight: '400'
})

const YearFilter = ({ isDialogOpen, setIsDialogOpen, setSelectedYear, selectedYear }) => {
  const dialogRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1950; year--) {
    years.push(year);
  }

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

  const handleSelect = (year) => {
    setSelectedYear(year);
    setIsClosing(true);
    setTimeout(() => {
      dialogRef.current.close();
      setIsDialogOpen(false);
      setIsClosing(false)
    },400)
  }

  const buttonText = (year) => {
    const select = years.find((l) => l === year)
    return select? `${select}  ▼` : 'Year Of Release'
  }

  return (
    <>
      <button className={styles.filterBy} onClick={handleClick}>
        {buttonText(selectedYear)}
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
          {years.map((year) => (
            <button key={year} className='filter-button' onClick={() => handleSelect(year)}>
              {year}
            </button>
          ))}
        </div>
      </dialog>
    </>
  );
};

export default YearFilter;
