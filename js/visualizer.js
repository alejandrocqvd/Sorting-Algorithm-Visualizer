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

function createVisualArray(arr) {
    const container = document.getElementById('visualizer-container');
    arr.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        container.appendChild(bar);
    })
}

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
        case 'bogo-sort':
            updateBogoSort(steps, speed);
            break;
    }
}

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



export { createArray, createVisualArray, updateVisualArray };