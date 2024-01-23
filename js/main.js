/**
 * Sorting Algorithm Visualizer
 * 
 * This JavaScript file provides functionality for a sorting algorithm visualizer.
 * It allows users to select different sorting algorithms, adjust the size of the array to be sorted,
 * and visually observe the sorting process. Supported algorithms include Bubble Sort, Selection Sort,
 * Insertion Sort, Merge Sort, Heap Sort, Quick Sort, and Bogo Sort. 
 * The visualization updates dynamically based on the chosen algorithm and array size.
 */

import { bubbleSort, selectionSort, insertionSort, runMergeSort, heapSort, runQuickSort, bogoSort } from './sortingAlgorithms.js';
import { createArray, updateVisualArray } from './visualizer.js';

let arr = [];
let totalTime = 25000;
let chosenAlgorithm = 'bubble-sort';

/**
 * Event listener for primary buttons.
 * Adds click event listeners to all primary buttons. On click, it updates the 
 * chosen algorithm and visually indicates the active algorithm.
 */
document.querySelectorAll('.primary-button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.primary-button').forEach(btn => {
            btn.classList.remove('primary-active');
        });
        button.classList.add('primary-active');
        chosenAlgorithm = button.id;
    });
});

/**
 * DOMContentLoaded event listener.
 * Initializes the visualizer once the DOM content is loaded.
 * Sets up the array size slider and initial array display.
 */
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
        const sortButton = document.getElementById('sort-button');
        sortButton.disabled = false;

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

/**
 * Click event listener for the 'sort-button'.
 * Initiates the sorting process based on the chosen algorithm.
 * Disables the sort button during sorting and re-enables it upon completion.
 */
document.getElementById('sort-button').addEventListener('click', function() {
    const sortButton = document.getElementById('sort-button');
    sortButton.disabled = true;

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
            sortingSteps = runQuickSort(arr);
            break;
        case 'bogo-sort':
            sortingSteps = bogoSort(arr);
            break;
    }

    speed = totalTime / sortingSteps.length;
    updateVisualArray(chosenAlgorithm, sortingSteps, speed);

    setTimeout(() => {
        sortButton.disabled = false;
    }, (sortingSteps.length + 1) * speed);
});