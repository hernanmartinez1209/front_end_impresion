document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const printButton = document.getElementById('printButton');
    const statusMessage = document.getElementById('statusMessage');
    const printFrame = document.createElement('iframe');
    printFrame.style.display = 'none'; // Ocultar el iframe

    document.body.appendChild(printFrame);

    let selectedFile = null;

    fileInput.addEventListener('change', () => {
        selectedFile = fileInput.files[0];
        if (selectedFile) {
            if (selectedFile.type === 'application/pdf') {
                const fileURL = URL.createObjectURL(selectedFile);
                printFrame.src = fileURL;
                printButton.disabled = false;
                statusMessage.textContent = `Archivo PDF seleccionado: ${selectedFile.name}`;
            } else {
                statusMessage.textContent = 'Solo se admiten archivos PDF para impresión directa desde el navegador.';
                printButton.disabled = true;
            }
        } else {
            statusMessage.textContent = 'Ningún archivo seleccionado.';
            printButton.disabled = true;
            printFrame.src = ''; // Limpiar el iframe
        }
    });

    printButton.addEventListener('click', () => {
        if (selectedFile && selectedFile.type === 'application/pdf') {
            statusMessage.textContent = 'Intentando imprimir...';
            printFrame.contentWindow.focus(); // Enfocar el iframe
            printFrame.contentWindow.print();
            statusMessage.textContent = 'Impresión iniciada (depende de la configuración de su navegador).';
        } else {
            statusMessage.textContent = 'Por favor, selecciona un archivo PDF primero.';
        }
    });
});