import { useState, useEffect } from 'react'

function App() {
  const [circles, setCircles] = useState([])
  const [history, setHistory] = useState([])

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i=0;i<6;i++) {
      color += letters[Math.floor(Math.random()*16)];
    }
    return color;
  }

  const getRandomSize = () => {
    return Math.floor(Math.random()*90) + 10;
  }

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newCircle = {
      x,
      y,
      radius: getRandomSize(),
      color: getRandomColor()
    };

    setHistory([...history,circles]);
    setCircles([...circles,newCircle]);
  }

  const handleUndo = () => {
    if (history.length > 0) {
      setCircles(history[history.length-1])
      setHistory(history.slice(0,-1))
    }
  }

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      e.preventDefault();
      handleUndo();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [circles, history]);

  return (
    <>
    {/* <button onClick={handleUndo} disabled={history.lenght===0}>
      Desfazer
    </button> */}
    <svg 
     width="100vw"
     height="100vh" 
     onClick={handleClick}
     
    >
      {circles.map((circle,index) => (
        <circle 
         key={index} 
         cx={circle.x} 
         cy={circle.y} 
         r={circle.radius}
         fill={circle.color}
        />
      ))}  
    </svg>
    </>
  )
}

export default App
