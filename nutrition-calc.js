< !--nutrition - calc.js-- >
    // Nutrition Calculator JavaScript

    // Initialize the nutrition calculator
    function initNutritionCalculator() {
        const calculatorForm = document.getElementById('nutrition-calculator-form');
        const resultContainer = document.getElementById('nutrition-results');

        if (calculatorForm) {
            calculatorForm.addEventListener('submit', function (e) {
                e.preventDefault();
                calculateNutrition();
            });

            // Initialize input fields with event listeners for real-time calculations
            const inputFields = calculatorForm.querySelectorAll('input[type="number"], select');
            inputFields.forEach(field => {
                field.addEventListener('change', function () {
                    if (document.getElementById('auto-calculate').checked) {
                        calculateNutrition();
                    }
                });
            });
        }

        // Initialize reset button if it exists
        const resetButton = document.getElementById('reset-calculator');
        if (resetButton) {
            resetButton.addEventListener('click', function () {
                calculatorForm.reset();
                if (resultContainer) {
                    resultContainer.innerHTML = '';
                    resultContainer.classList.add('hidden');
                }

                // Reset any charts
                if (window.nutritionChart) {
                    window.nutritionChart.destroy();
                    window.nutritionChart = null;
                }
            });
        }
    }

// Calculate nutrition based on form inputs
function calculateNutrition() {
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value) || 0;
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    const height = parseFloat(document.getElementById('height').value) || 0;
    const activityLevel = parseFloat(document.getElementById('activity-level').value) || 1.2;
    const goal = document.getElementById('goal').value;

    // Validate inputs
    if (age <= 0 || weight <= 0 || height <= 0) {
        showError('נא למלא את כל השדות עם ערכים תקינים');
        return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityLevel;

    // Adjust based on goal
    let calorieGoal;
    switch (goal) {
        case 'lose':
            calorieGoal = tdee - 500; // 500 calorie deficit for weight loss
            break;
        case 'gain':
            calorieGoal = tdee + 500; // 500 calorie surplus for weight gain
            break;
        default:
            calorieGoal = tdee; // Maintain weight
    }

    // Calculate macronutrients (protein, carbs, fat)
    // These are general guidelines and can be adjusted based on specific needs
    let protein, carbs, fat;

    if (goal === 'lose') {
        protein = weight * 2.2; // Higher protein for weight loss (g)
        fat = weight * 0.8; // Moderate fat (g)
        carbs = (calorieGoal - (protein * 4) - (fat * 9)) / 4; // Remaining calories from carbs
    } else if (goal === 'gain') {
        protein = weight * 1.8; // Moderate-high protein for muscle gain (g)
        fat = weight * 1; // Moderate fat (g)
        carbs = (calorieGoal - (protein * 4) - (fat * 9)) / 4; // Remaining calories from carbs
    } else {
        protein = weight * 1.6; // Moderate protein for maintenance (g)
        fat = weight * 0.9; // Moderate fat (g)
        carbs = (calorieGoal - (protein * 4) - (fat * 9)) / 4; // Remaining calories from carbs
    }

    // Ensure values are positive and rounded
    carbs = Math.max(0, Math.round(carbs));
    protein = Math.round(protein);
    fat = Math.round(fat);

    // Display results
    displayNutritionResults({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        calorieGoal: Math.round(calorieGoal),
        protein,
        carbs,
        fat
    });

    // Create or update chart
    createNutritionChart(protein, carbs, fat);
}

// Display nutrition calculation results
function displayNutritionResults(results) {
    const resultContainer = document.getElementById('nutrition-results');
    if (!resultContainer) return;

    resultContainer.classList.remove('hidden');

    // Create results HTML
    let resultsHTML = `
        <div class="nutrition-result">
            <h3 class="text-xl font-bold mb-3">תוצאות חישוב התזונה שלך</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p class="mb-2"><strong>BMR (קצב חילוף חומרים בסיסי):</strong> ${results.bmr} קלוריות</p>
                    <p class="mb-2"><strong>TDEE (סך הוצאת אנרגיה יומית):</strong> ${results.tdee} קלוריות</p>
                    <p class="mb-4"><strong>יעד קלוריות יומי:</strong> ${results.calorieGoal} קלוריות</p>
                </div>
                
                <div>
                    <p class="mb-2"><strong>חלבון:</strong> ${results.protein}g (${Math.round(results.protein * 4)} קלוריות)</p>
                    <p class="mb-2"><strong>פחמימות:</strong> ${results.carbs}g (${Math.round(results.carbs * 4)} קלוריות)</p>
                    <p class="mb-2"><strong>שומן:</strong> ${results.fat}g (${Math.round(results.fat * 9)} קלוריות)</p>
                </div>
            </div>
            
            <div class="mt-4">
                <canvas id="nutrition-chart" class="nutrition-chart"></canvas>
            </div>
            
            <div class="mt-4 text-sm text-gray-600">
                <p>* תוצאות אלו הן הערכה כללית. התייעץ עם תזונאי מוסמך לתוכנית תזונה מותאמת אישית.</p>
            </div>
        </div>
    `;

    resultContainer.innerHTML = resultsHTML;
}

// Create a chart to visualize macronutrient distribution
function createNutritionChart(protein, carbs, fat) {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }

    const ctx = document.getElementById('nutrition-chart');
    if (!ctx) return;

    // Calculate calorie values
    const proteinCals = protein * 4;
    const carbsCals = carbs * 4;
    const fatCals = fat * 9;

    // Destroy previous chart if it exists
    if (window.nutritionChart) {
        window.nutritionChart.destroy();
    }

    // Create new chart
    window.nutritionChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['חלבון', 'פחמימות', 'שומן'],
            datasets: [{
                data: [proteinCals, carbsCals, fatCals],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Heebo, sans-serif'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} קלוריות (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Show error message
function showError(message) {
    const errorContainer = document.getElementById('calculator-error');
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.classList.remove('hidden');

        // Hide error after 5 seconds
        setTimeout(() => {
            errorContainer.classList.add('hidden');
        }, 5000);
    } else {
        alert(message);
    }
}
