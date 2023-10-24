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

function merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) 
        L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) 
        R[j] = arr[m + 1 + j];

    let i = 0, j = 0, k = l;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i++];
        } else {
            arr[k] = R[j++];
        }
        k++;
    }
    
    while (i < n1) {
        arr[k++] = L[i++];
    }
    
    while (j < n2) {
        arr[k++] = R[j++];
    }
}

function mergeSort(arr, l, r) {
    if (l >= r) return;

    let m = l + Math.floor((r - l) / 2);
    
    mergeSort(arr, l, m);
    mergeSort(arr, m+1, r);
    merge(arr, l, m, r);
}

function runMergeSort(arr) {
    mergeSort(arr, 0, arr.length - 1);
    let steps = [...mergeSortSteps];
    mergeSortSteps.length = 0;
    return steps;
}

export { bubbleSort, selectionSort, insertionSort, runMergeSort };