// components/LanguageFilters.js
import React,{useState, useRef, useEffect} from 'react';
import { Irish_Grover, Kavoon } from 'next/font/google';

const irish = Irish_Grover({
    weight: '400',
    subsets: ['latin']
})

const kavoon = Kavoon({
  subsets: ['latin'],
  weight: '400'
})

import styles from '../app/movies/movies.module.css'
import '../styles/filterButtons.css'
import '../public/cancel.png'

/*const LanguageFilters = ({ onSelectLanguage }) => {
  const languages = [
    {code: 'en-US', label: 'English'},
    {code: 'fr', label: 'French'},
    { code: 'hi', label: 'Hindi' },
    { code: 'te', label: 'Telugu' },
    { code: 'ta', label: 'Tamil' },
    { code: 'ml', label: 'Malayalam' },
    { code: 'kn', label: 'Kannada' },
  ];

  const [selected,setSelected] = useState('')

  const handleChange = (e) =>{
    const value = e.target.value;
    setSelected(value);
    onSelectLanguage(value);
  }

  return (
    <div>
        <select value={selected} onChange={handleChange} className={irish.className} style={{backgroundColor: '#66FCF1', width: '160px', height: '60px', textAlign: 'center', borderRadius: '20px', color: '#022541', fontSize: '20px'}}>
            <option value="" disabled hidden>
                Language
            </option>
            {languages.map(lang => (
                <option key= {lang.code} value={lang.code}>
                    {lang.label}
                </option>
            ))}
        </select>
    </div>
  );
};

export default LanguageFilters;*/


const LanguageFilters = ({ isDialogOpen, setIsDialogOpen, setSelectedLanguage, selectedLanguage }) => {
  const dialogRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const languages = [
    { code: 'en-US', label: 'English' },
    { code: 'fr', label: 'French' },
    { code: 'hi', label: 'Hindi' },
    { code: 'te', label: 'Telugu' },
    { code: 'ta', label: 'Tamil' },
    { code: 'ml', label: 'Malayalam' },
    { code: 'kn', label: 'Kannada' },
    { code: 'es', label: 'Spanish' },
    { code: 'de', label: 'German' },
    { code: 'it', label: 'Italian' },
    { code: 'ru', label: 'Russian' },
    { code: 'zh', label: 'Chinese' },
    { code: 'ja', label: 'Japanese' },
    { code: 'ko', label: 'Korean' },
    { code: 'ar', label: 'Arabic' },
    { code: 'pt', label: 'Portuguese' },
    { code: 'bn', label: 'Bengali' },
    { code: 'ur', label: 'Urdu' },
    { code: 'tr', label: 'Turkish' },
    { code: 'mr', label: 'Marathi' }
  ];  
  
  

  const handleClick = () => {
    if (!isDialogOpen) {
      dialogRef.current.showModal();
      setIsDialogOpen(true)
    } else {
      setIsClosing(true);
      setTimeout(()=> {
        dialogRef.current.close();
        setIsDialogOpen(false);
        setIsClosing(false);
      },400)
    }
  };

  const handleSelect = (code) => {
    setSelectedLanguage(code);
    setIsClosing(true);
    setTimeout(()=> {
      dialogRef.current.close();
      setIsDialogOpen(false);
      setIsClosing(false);
    },400)
  }

  const buttonText = (code) => {
    const lang = languages.find((l) => l.code === code)
    return lang? `${lang.label}   ▼` : 'Language'
  }

  return (
    <>
      <button className={styles.filterBy} onClick={handleClick}>
        {buttonText(selectedLanguage)}
      </button>

      <dialog ref={dialogRef}  className={isClosing ? 'dialog-slide-close' : (isDialogOpen ? 'dialog-slide-open' : '')}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div>
            <h2 style={{color: '#022541', textAlign: 'center', fontSize: '45px', marginBottom: '50px', marginLeft: '790px'}} className={kavoon.className}>Language</h2>
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
          {languages.map((lang)=>(
            <div className={irish.className} key={lang.code} >
              <button className='filter-button' onClick={()=>handleSelect(lang.code)}>
                {lang.label}
              </button>
            </div>
          ))}
        </div>
      </dialog>
    </>
  );
};

export default LanguageFilters;
