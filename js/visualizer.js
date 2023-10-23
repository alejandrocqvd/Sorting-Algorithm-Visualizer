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

function updateVisualArray(steps, speed) {
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

export { createArray, createVisualArray, updateVisualArray };