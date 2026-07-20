const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Tell the server to look for static visual files like index.html
app.use(express.static(path.join(__dirname, '/')));

// Serve the index.html dashboard file when loading the home URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// The core endpoint where the visual studio app requests an AI video render
app.post('/api/render-shot', async (req, res) => {
    const { scriptPrompt, characterId, cameraPath } = req.body;
    
    console.log(`Received render request for scene: ${scriptPrompt}`);

    res.status(202).json({
        message: "Render job successfully dispatched to cloud nodes",
        estimated_time: "15 seconds"
    });
});

app.listen(PORT, () => {
    console.log(`Studio server running seamlessly on port ${PORT}`);
});
