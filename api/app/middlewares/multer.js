const multer = require('multer');
const path = require('path'); // Importa el módulo 'path' para trabajar con rutas de archivos

// Configuración del almacenamiento para los archivos subidos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Especifica la carpeta donde se guardarán los archivos
        cb(null, path.join(__dirname, '../uploads/')); // Asegúrate de que la carpeta 'uploads' exista en la raíz de tu proyecto
    },
    filename: function (req, file, cb) {
        // Define cómo se nombrará el archivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname); // Obtiene la extensión del archivo original
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // Ejemplo: archivo-1678886400000-123456789.pdf
    }
});

// Filtro para aceptar solo ciertos tipos de archivos (opcional)
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png']; // Ejemplo: solo PDF, JPG y PNG
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Acepta el archivo
    } else {
        cb(null, false); // Rechaza el archivo
    }
};

// Crea el middleware de subida de Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter, // Aplica el filtro de archivos (opcional)
    limits: { fileSize: 1024 * 1024 * 5 } // Limita el tamaño del archivo a 5MB (opcional)
});

module.exports = upload;