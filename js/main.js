import { bubbleSort } from './sortingAlgorithms.js';
import { createArray, updateVisualArray } from './visualizer.js';

let arr = [];
let totalTime = 30000;

document.addEventListener('DOMContentLoaded', (event) => {
    const arraySlider = document.getElementById('array-slider');
    const visualizerContainer = document.getElementById('visualizer-container');

    arraySlider.addEventListener('input', (event) => {
        const arraySize = arraySlider.value;
        
        visualizerContainer.innerHTML = '';

        arr = createArray(arraySize);
        let j = 0;

        for (let i = 0; i < arraySize; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${arr[j]}%`;
            if (arraySize > 70) {
                bar.style.marginLeft = '.1rem';
                bar.style.marginRight = '.1rem';
            }
            j += 1;
            visualizerContainer.appendChild(bar);
        }
    });
});

document.getElementById('sort-button').addEventListener('click', function() {
    const sortingSteps = bubbleSort(arr);

    const speed = totalTime / sortingSteps.length;

    updateVisualArray(sortingSteps, speed);
});