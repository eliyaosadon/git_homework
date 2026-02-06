import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const images = [
    "https://hips.hearstapps.com/hmg-prod/images/lychee-fruit-sugar-1530136136.jpg?crop=1xw:1xh;center,top&resize=640:*",
    "https://hips.hearstapps.com/hmg-prod/images/mango-fruit-sugar-1530136260.jpg?crop=1xw:1xh;center,top&resize=640:*",
    "https://hips.hearstapps.com/hmg-prod/images/cherries-sugar-fruit-1530136329.jpg?crop=1xw:1xh;center,top&resize=640:*",
  ]

  const [currentIndex, setCurrentIndex] = useState(0);

  const shiftImageForward = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const shiftImageBack = () => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>My Gallery</h1>

      <div className="slider-container">
        <button onClick={shiftImageBack} style={{ padding: '10px 20px', fontSize: '20px' }}>
          ⬅️ Previous
        </button>

        <img
          src={images[currentIndex]}
          alt="cat"
          style={{ width: '400px', height: '300px', objectFit: 'cover', margin: '0 20px', borderRadius: '10px' }}
        />

        <button onClick={shiftImageForward} style={{ padding: '10px 20px', fontSize: '20px' }}>
          Next ➡️
        </button>
      </div>

      <p>תמונה {currentIndex + 1} מתוך {images.length}</p>
    </div>
  );
}

export default App;