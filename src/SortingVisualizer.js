import React, { useState, useEffect } from 'react';
import {
  getBubbleSortAnimations,
  getSelectionSortAnimations,
  getInsertionSortAnimations,
  getQuickSortAnimations,
  getMergeSortAnimations,
  getRadixSortAnimations,
} from './sortingAlgorithms';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState('medium');

  const speeds = {
    slow: 100,
    medium: 50,
    fast: 10,
    veryFast: 1,
  };

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < 100; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }
    setArray(newArray);
  };

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const animateSorting = (animations) => {
    setIsSorting(true);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdxOrValue, type] = animations[i];
      if (type === 'compare') {
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = 'red';
          arrayBars[barTwoIdxOrValue].style.backgroundColor = 'red';
        }, i * speeds[speed]);
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = '#3498db';
          arrayBars[barTwoIdxOrValue].style.backgroundColor = '#3498db';
        }, (i + 1) * speeds[speed]);
      } else if (type === 'swap') {
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdxOrValue].style;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }, i * speeds[speed]);
      } else if (type === 'overwrite') {
        setTimeout(() => {
          arrayBars[barOneIdx].style.height = `${barTwoIdxOrValue}px`;
        }, i * speeds[speed]);
      }
    }
    setTimeout(() => {
      setIsSorting(false);
    }, animations.length * speeds[speed]);
  };

  const handleSort = (algorithm) => {
    if (isSorting) return;
    const arrayCopy = array.slice();
    let animations;
    switch (algorithm) {
      case 'bubble':
        animations = getBubbleSortAnimations(arrayCopy);
        break;
      case 'selection':
        animations = getSelectionSortAnimations(arrayCopy);
        break;
      case 'insertion':
        animations = getInsertionSortAnimations(arrayCopy);
        break;
      case 'quick':
        animations = getQuickSortAnimations(arrayCopy);
        break;
      case 'merge':
        animations = getMergeSortAnimations(arrayCopy);
        break;
      case 'radix':
        animations = getRadixSortAnimations(arrayCopy);
        break;
      default:
        return;
    }
    animateSorting(animations);
  };

  return (
    <div className="sorting-visualizer">
      <h1>Sorting Visualizer</h1>
      <div className="controls">
        <button onClick={resetArray} disabled={isSorting}>
          Generate New Array
        </button>
        <select value={speed} onChange={(e) => setSpeed(e.target.value)}>
          <option value="slow">Slow</option>
          <option value="medium">Medium</option>
          <option value="fast">Fast</option>
          <option value="veryFast">Very Fast</option>
        </select>
        <button onClick={() => handleSort('bubble')} disabled={isSorting}>
          Bubble Sort
        </button>
        <button onClick={() => handleSort('selection')} disabled={isSorting}>
          Selection Sort
        </button>
        <button onClick={() => handleSort('insertion')} disabled={isSorting}>
          Insertion Sort
        </button>
        <button onClick={() => handleSort('quick')} disabled={isSorting}>
          Quick Sort
        </button>
        <button onClick={() => handleSort('merge')} disabled={isSorting}>
          Merge Sort
        </button>
        <button onClick={() => handleSort('radix')} disabled={isSorting}>
          Radix Sort
        </button>
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;