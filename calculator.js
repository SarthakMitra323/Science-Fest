// --- CONFIGURATION ---
const KWH_PER_HOUR_ECO = 0.02;   // kWh consumed by your eco-fridge per hour
const KWH_PER_HOUR_STD = 0.08;   // kWh consumed by a standard mini-fridge per hour
const KG_CO2_PER_KWH = 0.475;    // Average kg of CO2 per kWh in India

// --- GET HTML ELEMENTS ---
const slider = document.getElementById('hours-slider');
const hoursValueSpan = document.getElementById('hours-value');
const kwhSavedSpan = document.getElementById('kwh-saved');
const co2SavedSpan = document.getElementById('co2-saved');
const ctx = document.getElementById('impact-chart').getContext('2d');

// --- CHART GRADIENTS & STYLING ---
const ecoGradient = ctx.createLinearGradient(0, 0, 0, 400);
ecoGradient.addColorStop(0, 'rgba(0, 170, 255, 1)');
ecoGradient.addColorStop(1, 'rgba(0, 102, 153, 1)');

const savedGradient = ctx.createLinearGradient(0, 0, 0, 400);
savedGradient.addColorStop(0, 'rgba(255, 99, 132, 1)');
savedGradient.addColorStop(1, 'rgba(153, 59, 79, 1)');

// --- INITIALIZE THE CHART ---
const impactChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Annual Energy (kWh)', 'Annual CO₂ (kg)'],
        datasets: [
            {
                label: 'Your Eco-Fridge',
                data: [0, 0],
                backgroundColor: ecoGradient,
                borderWidth: 0,
            },
            {
                label: 'Energy Wasted by Standard Fridge',
                data: [0, 0],
                backgroundColor: savedGradient,
                borderWidth: 0,
            }
        ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Annual Impact: Eco-Fridge vs. Standard Fridge',
                color: '#E0E0E0',
                font: { size: 18 }
            },
            legend: {
                labels: { color: '#E0E0E0' }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.dataset.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value.toFixed(1)}`;
                    }
                }
            }
        },
        scales: {
            y: {
                stacked: true, // Key property for stacked bars
                beginAtZero: true,
                ticks: { color: '#b0c4de' },
                grid: { color: 'rgba(176, 196, 222, 0.2)' }
            },
            x: {
                stacked: true, // Key property for stacked bars
                ticks: { color: '#b0c4de' },
                grid: { display: false }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    }
});

// --- FUNCTION TO CALCULATE AND UPDATE ---
function updateImpact() {
    const hoursPerDay = slider.value;
    hoursValueSpan.textContent = hoursPerDay;

    // --- Calculations ---
    const annualKwhEco = hoursPerDay * 365 * KWH_PER_HOUR_ECO;
    const annualKwhStd = hoursPerDay * 365 * KWH_PER_HOUR_STD;
    const annualKwhSaved = annualKwhStd - annualKwhEco;

    const annualCo2Eco = annualKwhEco * KG_CO2_PER_KWH;
    const annualCo2Saved = annualKwhSaved * KG_CO2_PER_KWH;

    // --- Update Chart Data ---
    // Dataset 0: The base consumption of the eco-fridge
    impactChart.data.datasets[0].data = [annualKwhEco, annualCo2Eco];
    // Dataset 1: The "extra" wasted amount, stacked on top
    impactChart.data.datasets[1].data = [annualKwhSaved, annualCo2Saved];
    impactChart.update();

    // --- Update Summary Cards ---
    kwhSavedSpan.textContent = annualKwhSaved.toFixed(1);
    co2SavedSpan.textContent = annualCo2Saved.toFixed(1);
}

// --- EVENT LISTENER & INITIAL CALL ---
slider.addEventListener('input', updateImpact);
updateImpact(); // Run once on page load