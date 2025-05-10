const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware zum Parsen von JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statisches Verzeichnis für index.html und andere Dateien einrichten
app.use(express.static(path.join(__dirname)));

// Verzeichnis für die hochgeladenen Dateien
const uploadDir = path.join(__dirname, 'media');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer Konfiguration für Dateiuploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Hochgeladene Dateien in den 'media'-Ordner speichern
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Original-Dateinamen beibehalten
    }
});

const upload = multer({ storage });

// Route für das Hochladen von Dateien
app.post('/upload', upload.single('mediaFile'), (req, res) => {
    res.send('Datei erfolgreich hochgeladen!');
});

// Route zum Speichern der TXT-Datei im Hauptverzeichnis
app.post('/save-txt', (req, res) => {
    const { content } = req.body;

    const txtFilePath = path.join(__dirname, 'media.txt');
    fs.writeFile(txtFilePath, content, (err) => {
        if (err) {
            console.error('Fehler beim Speichern der TXT-Datei:', err);
            return res.status(500).send('Fehler beim Speichern der TXT-Datei.');
        }
        // NEU: Schreibe auch einen neuen Zeitstempel in reload.txt damit sich index.html erkennt
        const now = new Date().toISOString();
        fs.writeFile(path.join(__dirname, 'reload.txt'), now, (err2) => {
            if (err2) {
                console.error('Fehler beim Schreiben der reload.txt:', err2);
            }
            res.send('TXT-Datei erfolgreich gespeichert!');
        });
    });
});

// Route zum Abrufen der verfügbaren Dateien im 'media'-Verzeichnis
app.get('/media-files', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).send('Fehler beim Abrufen der Dateien.');
        }
        res.json(files);
    });
});

// Route zum Abrufen des Inhalts der 'media.txt' Datei
app.get('/media.txt', (req, res) => {
    const txtFilePath = path.join(__dirname, 'media.txt');

    fs.readFile(txtFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Fehler beim Lesen der TXT-Datei:', err);
            return res.status(500).send('Fehler beim Lesen der TXT-Datei.');
        }
        res.send(data); // Sende den Inhalt der Datei zurück
    });
});

// Route zum Löschen einer Datei im 'media'-Verzeichnis
app.delete('/delete', (req, res) => {
    const { file } = req.query; // Datei über die URL (query string) erhalten
    const filePath = path.join(uploadDir, file);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('Datei nicht gefunden.');
        }

        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).send('Fehler beim Löschen der Datei.');
            }
            res.send(`Datei "${file}" erfolgreich gelöscht.`);
        });
    });
});


// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
