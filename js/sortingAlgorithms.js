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

export { bubbleSort, selectionSort };