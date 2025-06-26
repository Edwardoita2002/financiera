const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Sirve archivos estáticos del build de Vite
app.use(express.static(path.join(__dirname, '../client/dist')));

// API de ejemplo
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde el servidor Express con Vite!' });
});

// Enviar index.html para rutas del frontend
//app.get('/*', (req, res) => {
//  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


