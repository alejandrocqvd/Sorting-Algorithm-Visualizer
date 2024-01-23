/**
 * Sorting Algorithm Visualization Helper Functions
 *
 * This module contains helper functions for creating and updating the visual representation of sorting algorithms.
 * It includes functions to create a random array, visualize it, and update the visualization based on the sorting steps.
 */

/**
 * Creates an array of a specified size with random values.
 * @param {number} size - The size of the array to be created.
 * @returns {number[]} An array of random numbers.
 */
function createArray(size) {
    const min = 10;
    const max = 90;
    const distance = (max - min) / Math.max(1, size - 1);

    let arr = Array.from({length: size}, (_, i) => Math.round(min + i * distance));
    
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Creates a visual representation of an array in the DOM.
 * @param {number[]} arr - The array to be visualized.
 */
function createVisualArray(arr) {
    const container = document.getElementById('visualizer-container');
    arr.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        container.appendChild(bar);
    })
}

/**
 * Updates the visual representation of the array based on the sorting algorithm and its steps.
 * @param {string} sort - The name of the sorting algorithm being visualized.
 * @param {Object[]} steps - The steps of the sorting process.
 * @param {number} speed - The speed at which the visualization updates.
 */
function updateVisualArray(sort, steps, speed) {
    switch (sort) {
        case 'bubble-sort':
            updateBubbleSort(steps, speed);
            break;
        case 'selection-sort':
            updateSelectionSort(steps, speed);
            break;
        case 'insertion-sort':
            updateInsertionSort(steps, speed);
            break;
        case 'merge-sort':
            updateMergeSort(steps, speed);
            break;
        case 'heap-sort':
            updateHeapSort(steps, speed);
            break;
        case 'quick-sort':
            updateQuickSort(steps, speed);
            break;
        case 'bogo-sort':
            updateBogoSort(steps, speed);
            break;
    }
}

/**
 * Updates the visual representation for Bubble Sort.
 * @param {Object[]} steps - The steps of the Bubble Sort process.
 * @param {number} speed - The speed at which the visualization updates.
 */
function updateBubbleSort(steps, speed) {
    const bars = document.querySelectorAll('.bar');
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            bars.forEach(bar => bar.classList.remove('i-highlight'));
            bars.forEach(bar => bar.classList.remove('j-highlight'));

            bars[step.j].classList.add('i-highlight');
            bars[step.j + 1].classList.add('j-highlight');
            
            if (step.swapped) {
                [bars[step.j].style.height, bars[step.j + 1].style.height] =
                [bars[step.j + 1].style.height, bars[step.j].style.height];

                bars.forEach(bar => bar.classList.remove('i-highlight'));
                bars.forEach(bar => bar.classList.remove('j-highlight'));

                bars[step.j].classList.add('j-highlight');
                bars[step.j + 1].classList.add('i-highlight');
            }
        }, index * speed);
    });
}

/**
 * Updates the visual representation for Selection Sort.
 * @param {Object[]} steps - The steps of the Selection Sort process.
 * @param {number} speed - The speed at which the visualization updates.
 */
function updateSelectionSort(steps, speed) {
    const bars = document.querySelectorAll('.bar');
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            bars.forEach(bar => bar.classList.remove('i-highlight'));
            bars.forEach(bar => bar.classList.remove('j-highlight'));

            bars[step.j].classList.add('i-highlight');
            bars[step.min].classList.add('j-highlight');
            
            if (step.swapped) {
                [bars[step.j].style.height, bars[step.min].style.height] =
                [bars[step.min].style.height, bars[step.j].style.height];

                bars.forEach(bar => bar.classList.remove('i-highlight'));
                bars.forEach(bar => bar.classList.remove('j-highlight'));

                bars[step.j].classList.add('j-highlight');
                bars[step.min].classList.add('i-highlight');
            }
        }, index * speed);
    });

    setTimeout(() => {
        bars.forEach(bar => bar.classList.remove('i-highlight'));
        bars.forEach(bar => bar.classList.remove('j-highlight'));
    }, (steps.length + 1) * speed);
}

/**
 * Updates the visual representation for Insertion Sort.
 * @param {Object[]} steps - The steps of the Insertion Sort process.
 * @param {number} speed - The speed at which the visualization updates.
 */
function updateInsertionSort(steps, speed) {
    const bars = document.querySelectorAll('.bar');

    steps.forEach((step, index) => {
        setTimeout(() => {
            bars.forEach(bar => bar.classList.remove('i-highlight'));
            bars.forEach(bar => bar.classList.remove('j-highlight'));

            bars[step.key].classList.add('i-highlight');
            
            if (step.compare !== null) { 
                bars[step.compare].classList.add('j-highlight');
            }
            if (step.shifted) {
                bars.forEach(bar => bar.classList.remove('i-highlight'));
                bars.forEach(bar => bar.classList.remove('j-highlight'));
                [bars[step.compare].style.height, bars[step.key].style.height] = 
                [bars[step.key].style.height, bars[step.compare].style.height];
                bars[step.key].classList.add('j-highlight');
                bars[step.compare].classList.add('i-highlight');
            }
        }, index * speed);
    });

    setTimeout(() => {
        bars.forEach(bar => bar.classList.remove('i-highlight'));
        bars.forEach(bar => bar.classList.remove('j-highlight'));
    }, (steps.length + 1) * speed);
}

/**
 * Updates the visual representation for Merge Sort.
 * @param {Object[]} steps - The steps of the Merge Sort process.
 * @param {number} speed - The speed at which the visualization updates.
 */
function updateMergeSort(steps, speed) {
    const bars = document.querySelectorAll('.bar');
    const arr = steps[0].originalArr;
    const n = arr.length;
    
    steps.forEach((step, index) => {
        for (let i = 0; i < n; i++) {
            setTimeout(() => {
                bars.forEach(bar => bar.classList.remove('i-highlight'));
                bars.forEach(bar => bar.classList.remove('j-highlight'));

                bars[step.idx1].classList.add('i-highlight');
    
                if (step.idx2 != null && step.idx2 >= 0 && step.idx2 < bars.length) {
                    bars[step.idx2].classList.add('j-highlight');
                }
    
                let idx = step.arrayState[i];
    
                bars[i].style.height = `${arr[idx]}%`;

            }, index * speed)
        }
    });

    setTimeout(() => {
        bars.forEach(bar => bar.classList.remove('i-highlight'));
        bars.forEach(bar => bar.classList.remove('j-highlight'));
    }, (steps.length + 1) * speed);
}

/**
 * Updates the visual representation for Heap Sort.
 * @param {Object[]} steps - The steps of the Heap Sort process.
 * @param {number} speed - The speed at which the visualization updates.
 */
function updateHeapSort(steps, speed) {
    const bars = document.querySelectorAll('.bar');
    const arr = steps[0].originalArr;
    const n = arr.length;
    
    steps.forEach((step, index) => {
        for (let i = 0; i < n; i++) {
            setTimeout(() => {
                bars.forEach(bar => bar.classList.remove('i-highlight'));
                bars.forEach(bar => bar.classList.remove('j-highlight'));

                bars[step.idx1].classList.add('i-highlight');
    
                if (step.idx2 != null && step.idx2 >= 0 && step.idx2 < bars.length) {
                    bars[step.idx2].classList.add('j-highlight');
                }
    
                let idx = step.arrayState[i];
    
                bars[i].style.height = `${arr[idx]}%`;

            }, index * speed)
        }
    });

    setTimeout(() => {
        bars.forEach(bar => bar.classList.remove('i-highlight'));
        bars.forEach(bar => bar.classList.remove('j-highlight'));
    }, (steps.length + 1) * speed);
}

/**
 * Updates the visual representation for Bogo Sort.
 * @param {Object[]} steps - The steps of the Bogo Sort process.
 * @param {number} speed - The speed at which the visualization updates.
 */
function updateBogoSort(steps, speed) {
    const bars = document.querySelectorAll('.bar');
    const arr = steps[0].originalArr;
    const n = arr.length;

    steps.forEach((step, index) => {
        for (let i = 0; i < n; i++) {
            setTimeout(() => {
                bars[i].style.height = `${step.arrayState[i]}%`;
            }, index * (speed / 3));
        }
    });
}

/**
 * Updates the visual representation for Quick Sort.
 * @param {Object[]} steps - The steps of the Quick Sort process.
 * @param {number} speed - The speed at which the visualization updates.
 */
function updateQuickSort(steps, speed) {
    const bars = document.querySelectorAll('.bar');
    const arr = steps[0].originalArr;
    const n = arr.length;
    
    steps.forEach((step, index) => {
        for (let i = 0; i < n; i++) {
            setTimeout(() => {
                bars.forEach(bar => bar.classList.remove('i-highlight'));
                bars.forEach(bar => bar.classList.remove('j-highlight'));
                bars.forEach(bar => bar.classList.remove('p-highlight'));

                bars[step.pivotIndex].classList.add('p-highlight');

                if (step.idx1 != null) {
                    bars[step.idx1].classList.add('i-highlight');
                }
    
                if (step.idx2 != null && step.idx2 >= 0 && step.idx2 < bars.length) {
                    bars[step.idx2].classList.add('j-highlight');
                }
    
                let idx = step.arrayState[i];
    
                bars[i].style.height = `${arr[idx]}%`;

            }, index * speed)
        }
    });

    setTimeout(() => {
        bars.forEach(bar => bar.classList.remove('i-highlight'));
        bars.forEach(bar => bar.classList.remove('j-highlight'));
        bars.forEach(bar => bar.classList.remove('p-highlight'));
    }, (steps.length + 1) * speed);
}

export { createArray, createVisualArray, updateVisualArray };