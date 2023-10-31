let mergeSortSteps = [];

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

function merge(arr, idxexArr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1), Lidxices = new Array(n1);
    let R = new Array(n2), Ridxices = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = arr[l + i];
        Lidxices[i] = idxexArr[l + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
        Ridxices[j] = idxexArr[m + 1 + j];
    }

    let i = 0, j = 0, k = l;
    let idx2;

    while (i < n1 && j < n2) {

        if (L[i] <= R[j]) {
            arr[k] = L[i];
            idx2 = idxexArr.idxexOf(Lidxices[i]);
            mergeSortSteps.push({
                arrayState: [...idxexArr],
                idx1: k,
                idx2: idx2  
            });
            idxexArr[k] = Lidxices[i];
            mergeSortSteps.push({
                arrayState: [...idxexArr],
                idx1: k,
                idx2: idx2  
            });
            i++;
        } else {
            arr[k] = R[j];
            idx2 = idxexArr.idxexOf(Ridxices[j]);
            mergeSortSteps.push({
                arrayState: [...idxexArr],
                idx1: k,
                idx2: idx2  
            });
            idxexArr[k] = Ridxices[j];
            mergeSortSteps.push({
                arrayState: [...idxexArr],
                idx1: k,
                idx2: idx2  
            });
            j++;
        }
        k++;
    }

    mergeSortSteps.push({
        arrayState: [...idxexArr],
        idx1: k,
        idx2: idx2  
    });
    while (i < n1) {
        arr[k] = L[i];
        idx2 = idxexArr.idxexOf(Lidxices[i]);
        idxexArr[k] = Lidxices[i];
        mergeSortSteps.push({
            arrayState: [...idxexArr],
            idx1: k,
            idx2: idx2  
        });
        i++; k++;
    }

    mergeSortSteps.push({
        arrayState: [...idxexArr],
        idx1: k,
        idx2: idx2  
    });
    while (j < n2) {
        arr[k] = R[j];
        idx2 = idxexArr.idxexOf(Ridxices[j]);
        idxexArr[k] = Ridxices[j];
        mergeSortSteps.push({
            arrayState: [...idxexArr],
            idx1: k,
            idx2: idx2  
        });
        j++; k++;
    }
}


function mergeSort(arr, l, r, idxexArr) {
    if (l >= r) return;

    let m = l + Math.floor((r - l) / 2);

    mergeSort(arr, l, m, idxexArr);
    mergeSort(arr, m+1, r, idxexArr);
    merge(arr, idxexArr, l, m, r);
}

function runMergeSort(arr) {
    let idxexArr = Array.from({length: arr.length}, (_, i) => i);
    mergeSortSteps = [];
    mergeSortSteps.push({
        originalArr: [...arr]
    });
    mergeSort(arr, 0, arr.length - 1, idxexArr);
    return mergeSortSteps;
}

function heapSort(arr) {
    let steps = [];
    let idxexArr = Array.from({length: arr.length}, (_, i) => i);
    steps.push({
        originalArr: [...arr]
    });
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(arr, idxexArr, n, i, steps);

    for (let i = n - 1; i > 0; i--) {
        swap(arr, idxexArr, 0, i, steps);
        heapify(arr, idxexArr, i, 0, steps);
    }

    return steps;
}

function heapify(arr, idxexArr, n, i, steps) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest])
        largest = l;

    if (r < n && arr[r] > arr[largest])
        largest = r;

    if (largest != i) {
        swap(arr, idxexArr, i, largest, steps);
        heapify(arr, idxexArr, n, largest, steps);
    }
}

function swap(arr, idxexArr, i, j, steps) {
    steps.push({
        arrayState: [...idxexArr],
        idx1: i,
        idx2: j,
    });

    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    temp = idxexArr[i];
    idxexArr[i] = idxexArr[j];
    idxexArr[j] = temp;

    steps.push({
        arrayState: [...idxexArr],
        idx1: i,
        idx2: j,
    });
}

function isSorted(arr, n) {
    for(let i = 1; i < n; i++) 
        if (arr[i] < arr[i-1])
            return false;
    return true;
}

function bogoSwap(arr, xp, yp) {
    let temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

function shuffle(arr, n) {
    let i, j = n;
    for (i = 0; i < n; i++){
        let idx = Math.floor(Math.random() * n);
        bogoSwap(arr, j - i - 1, idx);
    }
    return arr; 
}

function bogoSort(arr) {
    let steps = [];
    let n = arr.length;
    let maxIterations = 30;
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

export { bubbleSort, selectionSort, insertionSort, runMergeSort, heapSort, bogoSort };