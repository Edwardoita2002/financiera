// src/utils/sendMessages.js (o donde tengas tu función de utilidad)
import axios from 'axios'; // ¡Importa Axios!

const sendMessages = async (formData) => {
    const backendUrl = 'YOUR_BACKEND_API_ENDPOINT'; // <--- IMPORTANTE: Reemplaza con tu endpoint real

    try {
        const response = await axios.post(backendUrl, formData); // Axios envía formData como JSON por defecto para POST

        // Axios maneja automáticamente si la respuesta fue exitosa (código 2xx)
        // y parsea el JSON por ti. Si hay un error (4xx, 5xx), lanzará una excepción.

        console.log('Message sent successfully:', response.data); // Los datos de la respuesta están en response.data
        return response.data; // Retorna la respuesta del backend
    } catch (error) {
        // Axios proporciona más detalles en el objeto de error
        if (error.response) {
            // El servidor respondió con un estado de error (ej. 400, 500)
            console.error('Server error:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to send message due to server error.');
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta (ej. red caída)
            console.error('Network error:', error.request);
            throw new Error('No response from server. Check your network connection.');
        } else {
            // Algo más causó el error
            console.error('Error:', error.message);
            throw new Error('An unexpected error occurred: ' + error.message);
        }
    }
};

export default sendMessages;