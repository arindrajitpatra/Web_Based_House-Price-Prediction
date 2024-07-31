document.getElementById('predict-button').addEventListener('click', function() {
    const formData = {
        bedrooms: document.getElementById('bedrooms').value,
        bathrooms: document.getElementById('bathrooms').value,
        sqft_living: document.getElementById('sqft_living').value,
        sqft_lot: document.getElementById('sqft_lot').value,
        floors: document.getElementById('floors').value,
        waterfront: document.getElementById('waterfront').value,
        view: document.getElementById('view').value,
        sqft_above: document.getElementById('sqft_above').value,
        sqft_basement: document.getElementById('sqft_basement').value
    };

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('prediction-output').textContent = `Error: ${data.error}`;
        } else {
            document.getElementById('prediction-output').textContent = `Predicted Price: $${data.prediction.toFixed(2)}`;
        }
    })
    .catch(error => {
        document.getElementById('prediction-output').textContent = `Error: ${error}`;
    });
});
