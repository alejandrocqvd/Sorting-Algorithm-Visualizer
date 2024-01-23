/**
 * Sorting Algorithms for Visualization
 *
 * This module contains implementations of various sorting algorithms.
 * Each function is designed to track and return the steps involved in the sorting process,
 * allowing for visualization of these algorithms in action.
 */

let mergeSortSteps = [];
let quickSortSteps = [];

/**
 * Implements the Bubble Sort algorithm and tracks its steps.
 * @param {number[]} arr - The array to be sorted.
 * @returns {Object[]} An array of steps showing how the array is sorted.
 */
function bubbleSort(arr) {
    let steps = [];
    let n = arr.length;
    let swapped;
    let i, j, temp;

    for (i = 0; i < n - 1; i++) {
        swapped = false;
        steps.push({
            arrayState: [...arr],
            j: 0,
            swapped: false
        });
        for (j = 0; j < n - i - 1; j++) {
            steps.push({
                arrayState: [...arr],
                j: j,
                swapped: (arr[j] > arr[j + 1])
            });
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
            steps.push({
                arrayState: [...arr],
                j: j + 1,
                swapped: false
            });
        }
        if (swapped == false) break;
    }
    steps.push([...arr]);
    return steps;
}

/**
 * Implements the Selection Sort algorithm and tracks its steps.
 * @param {number[]} arr - The array to be sorted.
 * @returns {Object[]} An array of steps showing how the array is sorted.
 */
function selectionSort(arr) {
    let steps = [];
    let n = arr.length;
    let i, j, temp, min;

    for (i = 0; i < n - 1; i++) {
        min = i;
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            steps.push({
                arrayState: [...arr],
                j: i,
                min: min,
                swapped: false
            });
            temp = arr[min];
            arr[min] = arr[i];
            arr[i] = temp;
            steps.push({
                arrayState: [...arr],
                j: i,
                min: min,
                swapped: true
            });
        }
    }
    return steps;
}

/**
 * Implements the Insertion Sort algorithm and tracks its steps.
 * @param {number[]} arr - The array to be sorted.
 * @returns {Object[]} An array of steps showing how the array is sorted.
 */
function insertionSort(arr) {
    let steps = [];
    let n = arr.length;
    let i, j, key;

    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;

        steps.push({
            arrayState: [...arr],
            key: i,
            compare: j,
            shifted: false,
            inserted: false
        });
        let a = 0;
        while (j >= 0 && arr[j] > key) {
            if (a != 0) {
                steps.push({
                    arrayState: [...arr],
                    key: j + 1,
                    compare: j,
                    shifted: false,
                    inserted: false
                });
            };
            a++;

            arr[j + 1] = arr[j];
            
            steps.push({
                arrayState: [...arr],
                key: j + 1,
                compare: j,
                shifted: true,
                inserted: false
            });
            j--;
        }
        arr[j + 1] = key;
    }
    return steps;
}

/**
 * Helper function for Merge Sort to merge two sub-arrays.
 * @param {number[]} arr - The array containing the sub-arrays to be merged.
 * @param {number[]} indexArr - The array of indices for tracking visualizations.
 * @param {number} l - The starting index of the first subarray.
 * @param {number} m - The ending index of the first subarray and one less than the starting index of the second subarray.
 * @param {number} r - The ending index of the second subarray.
 */
function merge(arr, indexArr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1), LIndices = new Array(n1);
    let R = new Array(n2), RIndices = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = arr[l + i];
        LIndices[i] = indexArr[l + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
        RIndices[j] = indexArr[m + 1 + j];
    }

    let i = 0, j = 0, k = l;
    let idx2;

    while (i < n1 && j < n2) {

        if (L[i] <= R[j]) {
            arr[k] = L[i];
            idx2 = indexArr.indexOf(LIndices[i]);
            mergeSortSteps.push({
                arrayState: [...indexArr],
                idx1: k,
                idx2: idx2  
            });
            indexArr[k] = LIndices[i];
            mergeSortSteps.push({
                arrayState: [...indexArr],
                idx1: k,
                idx2: idx2  
            });
            i++;
        } else {
            arr[k] = R[j];
            idx2 = indexArr.indexOf(RIndices[j]);
            mergeSortSteps.push({
                arrayState: [...indexArr],
                idx1: k,
                idx2: idx2  
            });
            indexArr[k] = RIndices[j];
            mergeSortSteps.push({
                arrayState: [...indexArr],
                idx1: k,
                idx2: idx2  
            });
            j++;
        }
        k++;
    }

    mergeSortSteps.push({
        arrayState: [...indexArr],
        idx1: k,
        idx2: idx2  
    });
    while (i < n1) {
        arr[k] = L[i];
        idx2 = indexArr.indexOf(LIndices[i]);
        indexArr[k] = LIndices[i];
        mergeSortSteps.push({
            arrayState: [...indexArr],
            idx1: k,
            idx2: idx2  
        });
        i++; k++;
    }

    mergeSortSteps.push({
        arrayState: [...indexArr],
        idx1: k,
        idx2: idx2  
    });
    while (j < n2) {
        arr[k] = R[j];
        idx2 = indexArr.indexOf(RIndices[j]);
        indexArr[k] = RIndices[j];
        mergeSortSteps.push({
            arrayState: [...indexArr],
            idx1: k,
            idx2: idx2  
        });
        j++; k++;
    }
}

/**
 * Recursively sorts an array using the Merge Sort algorithm and tracks its steps.
 * @param {number[]} arr - The array to be sorted.
 * @param {number} l - The starting index of the array segment to be sorted.
 * @param {number} r - The ending index of the array segment to be sorted.
 * @param {number[]} indexArr - The array of indices for tracking visualizations.
 */
function mergeSort(arr, l, r, indexArr) {
    if (l >= r) return;

    let m = l + Math.floor((r - l) / 2);

    mergeSort(arr, l, m, indexArr);
    mergeSort(arr, m+1, r, indexArr);
    merge(arr, indexArr, l, m, r);
}

/**
 * Initiates the Merge Sort process and tracks its steps.
 * @param {number[]} arr - The array to be sorted.
 * @returns {Object[]} An array of steps showing how the array is sorted.
 */
function runMergeSort(arr) {
    let indexArr = Array.from({length: arr.length}, (_, i) => i);
    mergeSortSteps = [];
    mergeSortSteps.push({
        originalArr: [...arr]
    });
    mergeSort(arr, 0, arr.length - 1, indexArr);
    return mergeSortSteps;
}

/**
 * Implements the Heap Sort algorithm and tracks its steps.
 * @param {number[]} arr - The array to be sorted.
 * @returns {Object[]} An array of steps showing how the array is sorted.
 */
function heapSort(arr) {
    let steps = [];
    let indexArr = Array.from({length: arr.length}, (_, i) => i);
    steps.push({
        originalArr: [...arr]
    });
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(arr, indexArr, n, i, steps);
        steps.push({
            arrayState: [...arr], 
            indexArr: [...indexArr]
        });

    for (let i = n - 1; i > 0; i--) {
        swap(arr, indexArr, 0, i, steps);
        heapify(arr, indexArr, i, 0, steps);
        steps.push({
            arrayState: [...arr], 
            indexArr: [...indexArr]
        });
    }
    return steps;
}

/**
 * Forms a heap from a portion of an array.
 * @param {number[]} arr - The array containing the heap.
 * @param {number[]} indexArr - The array of indices for tracking visualizations.
 * @param {number} n - The number of elements in the heap.
 * @param {number} i - The index of the current root element.
 * @param {Object[]} steps - The array of steps showing the sorting process.
 */
function heapify(arr, indexArr, n, i, steps) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest])
        largest = l;

    if (r < n && arr[r] > arr[largest])
        largest = r;

    if (largest != i) {
        swap(arr, indexArr, i, largest, steps);
        heapify(arr, indexArr, n, largest, steps);
    }
}

/**
 * Swaps two elements in an array and tracks the swap.
 * @param {number[]} arr - The array where the swap will occur.
 * @param {number[]} indexArr - The array of indices for tracking visualizations.
 * @param {number} i - The index of the first element to swap.
 * @param {number} j - The index of the second element to swap.
 * @param {Object[]} steps - The array of steps showing the sorting process.
 */
function swap(arr, indexArr, i, j, steps) {
    steps.push({
        arrayState: [...indexArr],
        idx1: i,
        idx2: j,
    });

    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    temp = indexArr[i];
    indexArr[i] = indexArr[j];
    indexArr[j] = temp;

    steps.push({
        arrayState: [...indexArr],
        idx1: i,
        idx2: j,
    });
}

/**
 * Checks if an array is sorted.
 * @param {number[]} arr - The array to check.
 * @param {number} n - The number of elements in the array.
 * @returns {boolean} True if the array is sorted, false otherwise.
 */
function isSorted(arr, n) {
    for(let i = 1; i < n; i++) 
        if (arr[i] < arr[i-1])
            return false;
    return true;
}

/**
 * Swaps two elements in an array.
 * @param {number[]} arr - The array where the swap will occur.
 * @param {number} xp - The index of the first element to swap.
 * @param {number} yp - The index of the second element to swap.
 */
function bogoSwap(arr, xp, yp) {
    let temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

/**
 * Randomly shuffles an array.
 * @param {number[]} arr - The array to shuffle.
 * @param {number} n - The number of elements in the array.
 * @returns {number[]} The shuffled array.
 */
function shuffle(arr, n) {
    let i, j = n;
    for (i = 0; i < n; i++){
        let idx = Math.floor(Math.random() * n);
        bogoSwap(arr, j - i - 1, idx);
    }
    return arr; 
}

/**
 * Implements the Bogo Sort algorithm and tracks its steps.
 * @param {number[]} arr - The array to be sorted.
 * @returns {Object[]} An array of steps showing how the array is sorted.
 */
function bogoSort(arr) {
    let steps = [];
    let n = arr.length;
    let maxIterations = 50;
    let iterations = 0;

    steps.push({
        originalArr: [...arr]
    });

    while (!isSorted(arr, n) && iterations < maxIterations) {
        shuffle(arr, n);
        steps.push({
            arrayState: [...arr]
        });
        iterations++;
    }
    return steps;
}

/**
 * Partitions an array for the Quick Sort algorithm.
 * @param {number[]} arr - The array to be partitioned.
 * @param {number[]} indexArr - The array of indices for tracking visualizations.
 * @param {number} low - The starting index of the segment to be partitioned.
 * @param {number} high - The ending index of the segment to be partitioned.
 * @returns {number} The partition index.
 */
function partition(arr, indexArr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
   
    for (let j = low; j <= high - 1; j++) {
        quickSortSteps.push({
            arrayState: [...indexArr],
            pivotIndex: high,
            idx1: i,
            idx2: j
        });
        
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            [indexArr[i], indexArr[j]] = [indexArr[j], indexArr[i]];
        }
    }

    quickSortSteps.push({
        arrayState: [...indexArr],
        pivotIndex: high,
        idx1: i+1,
        idx2: high
    });

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    [indexArr[i+1], indexArr[high]] = [indexArr[high], indexArr[i+1]];

    return i + 1;
}

/**
 * Recursively sorts an array using the Quick Sort algorithm and tracks its steps.
 * @param {number[]} arr - The array to be sorted.
 * @param {number} low - The starting index of the array segment to be sorted.
 * @param {number} high - The ending index of the array segment to be sorted.
 * @param {number[]} indexArr - The array of indices for tracking visualizations.
 */
function quickSort(arr, low, high, indexArr) {
    if (low < high) {
        let pi = partition(arr, indexArr, low, high);

        quickSort(arr, low, pi - 1, indexArr);
        quickSort(arr, pi + 1, high, indexArr);
    }
}

/**
 * Initiates the Quick Sort process and tracks its steps.
 * @param {number[]} arr - The array to be sorted.
 * @returns {Object[]} An array of steps showing how the array is sorted.
 */
function runQuickSort(arr) {
    let indexArr = Array.from({length: arr.length}, (_, i) => i);
    quickSortSteps = [];
    quickSortSteps.push({
        originalArr: [...arr]
    });
    quickSort(arr, 0, arr.length - 1, indexArr);
    quickSortSteps.push({
        arrayState: [...indexArr],
    });
    return quickSortSteps;
}

export { bubbleSort, selectionSort, insertionSort, runMergeSort, heapSort, runQuickSort, bogoSort };