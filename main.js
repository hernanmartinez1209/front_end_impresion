document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileName');
    const printButton = document.getElementById('printButton');
    const statusMessage = document.getElementById('statusMessage');
    const copiesInput = document.getElementById('copies');
    const pageSizeSelect = document.getElementById('pageSize');
    const orientationSelect = document.getElementById('orientation');
    const colorSelect = document.getElementById('color');

    let selectedFile = null;

    fileInput.addEventListener('change', () => {
        selectedFile = fileInput.files[0];
        if (selectedFile) {
            fileNameDisplay.textContent = `Archivo seleccionado: ${selectedFile.name}`;
            printButton.disabled = false;
            statusMessage.textContent = 'Listo para imprimir.';
        } else {
            fileNameDisplay.textContent = 'Ningún archivo seleccionado.';
            printButton.disabled = true;
            statusMessage.textContent = 'Listo para cargar un archivo.';
        }
    });

    printButton.addEventListener('click', () => {
        if (selectedFile) {
            statusMessage.textContent = 'Intentando imprimir...';
            // **Aquí usarías Print.js para imprimir el archivo seleccionado**
            // Print.js tiene soporte limitado para archivos directamente desde un input file.
            // Generalmente funciona mejor con URLs de archivos (PDF, imágenes) o contenido HTML/JSON.

            // Si el archivo es una imagen o PDF, podrías intentar crear una URL del objeto:
            const fileURL = URL.createObjectURL(selectedFile);
            printJS(fileURL); // Intenta imprimir la URL del objeto

            // Para otros tipos de archivos, necesitarías una lógica diferente (quizás renderizar en un iframe y luego imprimir el iframe, o convertir en el cliente).
            // statusMessage.textContent = 'Impresión iniciada (depende del tipo de archivo y Print.js).';
        } else {
            statusMessage.textContent = 'Por favor, selecciona un archivo primero.';
        }
    });
});