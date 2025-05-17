'use client';
import React, { useRef, useState } from 'react';
import { Kavoon } from 'next/font/google';
import styles from '../app/movies/movies.module.css';
import '../styles/filterButtons.css';

const kavoon = Kavoon({
  subsets: ['latin'],
  weight: '400'
});

const RegionFilter = ({ isDialogOpen, setIsDialogOpen, setSelectedRegion, selectedRegion}) => {
  const dialogRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const regionOptions = [
    { code: 'US', label: 'United States' },
    { code: 'IN', label: 'India' },
    { code: 'FR', label: 'France' },
    { code: 'DE', label: 'Germany' },
    { code: 'JP', label: 'Japan' },
    { code: 'KR', label: 'South Korea' },
    { code: 'GB', label: 'United Kingdom' },
    { code: 'CN', label: 'China' },
    { code: 'CA', label: 'Canada' },
    { code: 'ES', label: 'Spain' },
    { code: 'IT', label: 'Italy' },
    { code: 'RU', label: 'Russia' }
  ];

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

  const handleSelect = (region) => {
    setSelectedRegion(region);
    setIsClosing(true);
    setTimeout(() => {
      dialogRef.current.close();
      setIsDialogOpen(false);
      setIsClosing(false)
    },400)
  }

  const buttonText = (region) => {
    const select = regionOptions.find((l) => l.code === region)
    return select? `${select.label}  ▼` : 'Region'
  }

  return (
    <>
      <button className={styles.filterBy} onClick={handleClick}>
        {buttonText(selectedRegion)}
      </button>

      <dialog ref={dialogRef} className={isClosing ? 'dialog-slide-close' : (isDialogOpen ? 'dialog-slide-open' : '')}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ color: '#022541', textAlign: 'center', fontSize: '45px', marginBottom: '50px', marginLeft: '790px' }} className={kavoon.className}>Region of Release</h2>
          </div>
          <div style={{ paddingLeft: '100px' }}>
            <button onClick={handleClick} style={{ backgroundColor: '#66FCF1', border: 'none' }}>
              <img src='cancel.png' width={60} height={60} alt="close" />
            </button>
          </div>
        </div>
        <div className='filter-grid'>
          {regionOptions.map((region) => (
            <button key={region.code} className='filter-button' onClick={() => handleSelect(region.code)}>
              {region.label}
            </button>
          ))}
        </div>
      </dialog>
    </>
  );
};

export default RegionFilter;
