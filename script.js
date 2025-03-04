const chartCanvas = document.getElementById('visualMeter').getContext('2d');
let visualMeter = new Chart(chartCanvas, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [100, 0, 100],
            backgroundColor: ['#E5E7EB', 'red', '#E5E7EB'], // Default colors
            borderWidth: 0,
            cutout: '65%',
            rotation: 270,
            circumference: 180,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 10 } },
        plugins: { tooltip: { enabled: false } },
    }
});

function modifyVisual() {
    let valueInput = document.getElementById('valueInputScore').value;
    valueInput = Math.max(-100, Math.min(100, valueInput)); 
    document.getElementById('score').innerText = valueInput;
    
    let leftSegment = valueInput < 0 ? Math.abs(valueInput) : 0;
    let rightSegment = valueInput > 0 ? valueInput : 0;
    let neutralLeftSegment = valueInput < 0 ? 100 - leftSegment : 100;
    let neutralRightSegment = valueInput > 0 ? 100 - rightSegment : 100;
    
    // Set color: Green for positive, Red for negative
    let segmentColor = valueInput >= 0 ? "green" : "red";
    
    visualMeter.data.datasets[0].data = [neutralLeftSegment, Math.abs(valueInput), neutralRightSegment];
    visualMeter.data.datasets[0].backgroundColor = ["#E5E7EB", segmentColor, "#E5E7EB"];
    visualMeter.update();
}
