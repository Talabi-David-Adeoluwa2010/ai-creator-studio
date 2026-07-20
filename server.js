const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Base safety check route to verify our server is live on Render
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: "Studio Engine Online", 
        version: "1.0.0-Alpha" 
    });
});

// The core endpoint where the frontend app will request an AI video render
app.post('/api/render-shot', async (req, res) => {
    const { scriptPrompt, characterId, cameraPath } = req.body;
    
    console.log(`Received render request for scene: ${scriptPrompt}`);

    // This placeholder response tells our app the request was successfully received
    res.status(202).json({
        message: "Render job successfully dispatched to cloud nodes",
        estimated_time: "15 seconds"
    });
});

app.listen(PORT, () => {
    console.log(`Studio server running seamlessly on port ${PORT}`);
});
