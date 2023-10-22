// import { bubbleSort } from './sortingAlgorithms.js';
import { createArray } from './visualizer.js';

document.addEventListener('DOMContentLoaded', (event) => {
    const arraySlider = document.getElementById('array-slider');
    const visualizerContainer = document.getElementById('visualizer-container');

    arraySlider.addEventListener('input', (event) => {
        const arraySize = arraySlider.value;
        
        visualizerContainer.innerHTML = '';

        const arr = createArray(arraySize);
        let j = 0;

        for (let i = 0; i < arraySize; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${arr[j]}%`;
            if (arraySize > 70) {
                bar.style.marginLeft = '.1rem';
                bar.style.marinRight = '.1rem';
            }
            j += 1;
            visualizerContainer.appendChild(bar);
        }
    });
});

// document.getElementById('sort-button').addEventListener('click', function() {
//     const arrayToSort = [64, 34, 25, 12, 22, 11, 90];

//     const sortingSteps = bubbleSort(arrayToSort);

//     createVisualArray(arrayToSort);

//     const speed = 200;
//     updateVisualArray(sortingSteps, speed);
// });