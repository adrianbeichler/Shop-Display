# 📺 Digital Signage System (Node.js) (And a main.js for Electron)

This is a self-hosted digital signage system built with **Node.js** (and optional **Electron**), designed to **display images and videos** on a screen. Media content can be uploaded, reordered, and configured using a **browser-based interface**, making it ideal for kiosks, public displays, or information monitors.

---

## ✨ Features

- 🖼️ Show images and videos in a fullscreen loop  
- 🕒 Define display duration for each image  
- 🔄 Automatic playback loop with progress bar  
- 🔍 Media preview in web interface  
- ⬆️ Upload files directly via drag-and-drop  
- 🧾 Organize and reorder media with visual editor  
- 📁 Media and settings saved locally  
- 💻 Works offline, fully local  
- ⚙️ Based on Express.js and Electron  

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/adrianbeichler/Shop-Display.git
cd Shop-Display
```

### 2. Install dependencies

```bash
npm install
```

3. **Anwendung starten**
   ```bash
   npm start
   ```
   Die App startet im Vollbild-Kiosk-Modus und der Web-Editor ist erreichbar unter  
   [http://localhost:3001](http://localhost:3001).

---

## 🧱 Projektstruktur

```text
├── index.html         # Anzeige-Oberfläche (Vollbild)
├── upload.html        # Web-Oberfläche zur Medienverwaltung
├── server.js          # Express-Backend für Uploads & Dateioperationen
├── main.js            # Electron-Einstiegspunkt
├── media.txt          # Regelt Wiedergabe-Reihenfolge und Anzeigedauer
├── media/             # Ablage der hochgeladenen Dateien
├── reload.txt         # Dient zum Triggern eines Reloads
```



## 📄 Medien-Konfiguration (`media.txt`)

Jede Zeile enthält einen Dateinamen des Mediums.

Für Bilder kann optional eine eigene Anzeigedauer in Sekunden in runden Klammern angegeben werden:

```txt
**In Klammern wird die Anzeigezeit geschrieben (für Bilder) Videos brauchen keine Anzeigezeit
**Medien mit Dateinname hier hinzufügen und entsprechend der Reihnfolge mit Absätzen anordnen
** Kommentare sind auch möglich. Die Datei wird auch von /upload.html verwaltet
Beispiel.png (6)
TestBild.gif (10)
Der neue AStA Info-Monitor.mp4
```


## 🖥 Web Interface

Aufrufbar unter:  
👉 http://localhost:3001/upload.html

Dort kannst du:

- Bilder und Videos hochladen (`.jpg`, `.png`, `.gif`, `.mp4`, `.webm`, `.ogg`)
- Anzeigedauer für Bilder festlegen
- Medien per Drag & Drop umsortieren
- Nicht benötigte Dateien löschen
- Die Wiedergabeliste (`media.txt`) speichern
```

## ⚛️ Electron App
You can use and start this with Electron
You need to execute the main.js for that with Electron
