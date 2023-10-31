import { bubbleSort, selectionSort, insertionSort, runMergeSort, heapSort, bogoSort } from './sortingAlgorithms.js';
import { createArray, updateVisualArray } from './visualizer.js';

let arr = [];
let totalTime = 25000;
let chosenAlgorithm = 'bubble-sort';

document.querySelectorAll('.primary-button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.primary-button').forEach(btn => {
            btn.classList.remove('primary-active');
        });
        button.classList.add('primary-active');
        chosenAlgorithm = button.id;
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const arraySlider = document.getElementById('array-slider');
    const visualizerContainer = document.getElementById('visualizer-container');
    const bubbleButton = document.getElementById('bubble-sort');

    bubbleButton.classList.add('primary-active');

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

    arraySlider.addEventListener('input', (event) => {
        const arraySize = arraySlider.value;
        
        visualizerContainer.innerHTML = '';

        arr = createArray(arraySize);
        let j = 0;

        for (let i = 0; i < arraySize; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${arr[j]}%`;
            j += 1;
            visualizerContainer.appendChild(bar);
        }
    });
});

document.getElementById('sort-button').addEventListener('click', function() {
    let sortingSteps, speed;

    switch (chosenAlgorithm) {
        case 'bubble-sort':
            sortingSteps = bubbleSort(arr);
            break;
        case 'selection-sort':
            sortingSteps = selectionSort(arr);
            break;
        case 'insertion-sort':
            sortingSteps = insertionSort(arr);
            break;
        case 'merge-sort':
            sortingSteps = runMergeSort(arr);
            break;
        case 'heap-sort':
            sortingSteps = heapSort(arr);
            break;
        case 'quick-sort':
            sortingSteps = quickSort(arr);
            break;
        case 'bogo-sort':
            sortingSteps = bogoSort(arr);
            break;
    }

    speed = totalTime / sortingSteps.length;
    updateVisualArray(chosenAlgorithm, sortingSteps, speed);
});