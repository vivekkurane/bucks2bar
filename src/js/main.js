// Set copyright year dynamically
document.addEventListener("DOMContentLoaded", function() {
    var yearSpan = document.getElementById('copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Store chart and update function in a higher scope
let chart, updateChart;

// Listen for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    // Get input fields for income and expenses
    var incomeInputs = document.querySelectorAll('.income-input');
    var expenseInputs = document.querySelectorAll('.expense-input');

    // Chart.js Bar Chart Example
    var ctx = document.getElementById('barChart');

    // Helper to get values from input fields or fallback to 0
    function getInputValues(inputs) {
        return Array.from(inputs).map(function(input) {
            var val = parseFloat(input.value);
            return isNaN(val) ? 0 : val;
        });
    }

    updateChart = function() {
        var incomeData = incomeInputs.length ? getInputValues(incomeInputs) : [];
        var expenseData = expenseInputs.length ? getInputValues(expenseInputs) : [];

        if (chart) {
            chart.data.datasets[0].data = incomeData;
            chart.data.datasets[1].data = expenseData;
            chart.update();
        }
    };

    if (ctx) {
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'Income',
                    data: incomeInputs.length ? getInputValues(incomeInputs) : [],
                    backgroundColor: 'rgba(13, 110, 253, 0.7)'
                }, {
                    label: 'Expenses',
                    data: expenseInputs.length ? getInputValues(expenseInputs) : [],
                    backgroundColor: 'rgba(220, 53, 69, 0.7)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Monthly Income vs Expenses' }
                }
            }
        });

        // Add event listeners to update chart on input change
        incomeInputs.forEach(function(input) {
            input.addEventListener('input', updateChart);
        });
        expenseInputs.forEach(function(input) {
            input.addEventListener('input', updateChart);
        });
    }
});

// If you use tabs, listen for tab change and update chart when chart tab is shown
document.addEventListener('DOMContentLoaded', function() {
    var chartTab = document.querySelector('[data-bs-toggle="tab"][href="#chart-tab"], [data-toggle="tab"][href="#chart-tab"]');
    if (chartTab) {
        chartTab.addEventListener('shown.bs.tab', function() {
            if (typeof updateChart === 'function') updateChart();
        });
    }
});
