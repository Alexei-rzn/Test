// Функция для начала сканирования с камеры
document.getElementById('start-scan').addEventListener('click', function () {
    Quagga.init({
        inputStream: {
            type: "LiveStream",
            constraints: {
                facingMode: "environment" // Использовать заднюю камеру телефона
            },
            target: document.querySelector('#interactive')    // Здесь будет отображаться видео
        },
        decoder: {
            readers: ["ean_reader"] // Чтение штрих-кодов EAN
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        Quagga.start();
    });

    // Обработчик для получения результата сканирования
    Quagga.onDetected(function (data) {
        const barcode = data.codeResult.code;
        console.log('Barcode detected: ', barcode);
        fetchProductInfo(barcode); // Получение информации о товаре
    });
});

// Функция для отправки штрих-кода, введенного вручную
document.getElementById('submit-barcode').addEventListener('click', function () {
    const manualBarcode = document.getElementById('manual-barcode').value;
    if (manualBarcode) {
        fetchProductInfo(manualBarcode);
    }
});

// Функция для получения информации о товаре с Open Food Facts API
function fetchProductInfo(barcode) {
    fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 1) { // Если товар найден
                const product = data.product;
                document.getElementById('barcode-result').innerHTML = `
                    <h2>Product Found</h2>
                    <p><strong>Product Name:</strong> ${product.product_name}</p>
                    <p><strong>Brand:</strong> ${product.brands}</p>
                    <p><strong>Ingredients:</strong> ${product.ingredients_text || 'N/A'}</p>
                    <p><strong>Nutrition Info:</strong> ${product.nutriments ? 'Available' : 'Not Available'}</p>
                `;
            } else {
                document.getElementById('barcode-result').innerHTML = '<p>Product not found!</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
            document.getElementById('barcode-result').innerHTML = '<p>Error fetching product data.</p>';
        });
}
