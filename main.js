document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const printButton = document.getElementById('printButton');
    const statusMessage = document.getElementById('statusMessage');

    fileInput.addEventListener('change', () => {
        const selectedFile = fileInput.files[0];
        if (selectedFile) {
            fileNameDisplay.textContent = `Archivo seleccionado: ${selectedFile.name}`;
            printButton.disabled = false;
            statusMessage.textContent = 'Listo para intentar imprimir.';
        } else {
            fileNameDisplay.textContent = 'Ningún archivo seleccionado.';
            printButton.disabled = true;
            statusMessage.textContent = 'Listo para cargar un archivo.';
        }
    });

    printButton.addEventListener('click', () => {
        const selectedFile = fileInput.files[0];

        if (selectedFile) {
            statusMessage.textContent = 'Intentando imprimir...';

            if (selectedFile.type === 'application/pdf') {
                // **Método preferido para PDF en móvil:** Usar iframe
                const fileURL = URL.createObjectURL(selectedFile);
                const printFrame = document.createElement('iframe');
                printFrame.style.position = 'absolute';
                printFrame.style.top = '-9999px';
                document.body.appendChild(printFrame);
                printFrame.onload = function() {
                    printFrame.contentWindow.focus();
                    printFrame.contentWindow.print();
                    document.body.removeChild(printFrame);
                    statusMessage.textContent = 'Intento de impresión de PDF iniciado.';
                };
                printFrame.src = fileURL;
            } else if (selectedFile.type.startsWith('image/')) {
                // **Intento de imprimir imagen con Print.js:**
                const fileURL = URL.createObjectURL(selectedFile);
                printJS(fileURL, 'image');
                statusMessage.textContent = 'Intento de impresión de imagen iniciado.';
            } else if (selectedFile.type === 'text/plain') {
                // **Ejemplo básico para texto plano (puede no ser ideal para impresión compleja):**
                const reader = new FileReader();
                reader.onload = function(e) {
                    printJS({ printable: e.target.result, type: 'raw-text' });
                    statusMessage.textContent = 'Intento de impresión de texto iniciado.';
                };
                reader.readAsText(selectedFile);
            } else if (selectedFile.type === 'application/msword' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                statusMessage.textContent = 'Los archivos de Word pueden requerir conversión a PDF para una impresión más fiable en el navegador. Considere usar una herramienta en línea o una aplicación para convertir el archivo a PDF primero.';
                // **En este punto, podrías ofrecer una opción para que el usuario descargue el archivo
                // y lo imprima con una aplicación nativa en su celular.**
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(selectedFile);
                downloadLink.download = selectedFile.name;
                downloadLink.textContent = 'Descargar archivo de Word para imprimir con otra aplicación.';
                statusMessage.appendChild(document.createElement('br'));
                statusMessage.appendChild(downloadLink);
            } else {
                statusMessage.textContent = `Formato de archivo "${selectedFile.type}" no soportado para impresión directa desde el navegador móvil. Considere convertir a PDF o usar una aplicación nativa para imprimir.`;
                // **Similar a Word, podrías ofrecer una opción de descarga.**
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(selectedFile);
                downloadLink.download = selectedFile.name;
                downloadLink.textContent = `Descargar archivo "${selectedFile.name}" para imprimir con otra aplicación.`;
                statusMessage.appendChild(document.createElement('br'));
                statusMessage.appendChild(downloadLink);
            }
        } else {
            statusMessage.textContent = 'Por favor, selecciona un archivo primero.';
        }
    });
});