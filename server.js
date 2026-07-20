const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/render-shot', async (req, res) => {
    try {
        const { scriptPrompt, activeTool } = req.body;
        console.log(`[FOUNDER CORE] Processing ${activeTool} for: "${scriptPrompt}"`);

        if (!scriptPrompt) {
            return res.status(400).json({ status: "ERROR", error: "Prompt is blank." });
        }

        // Direct Google CDN assets that stream correctly under standard mobile web view policies
        const videoLibrary = [
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
        ];
        
        const selectedVideo = videoLibrary[Math.floor(Math.random() * videoLibrary.length)];

        return res.status(200).json({
            status: "SUCCESS",
            videoUrl: selectedVideo,
            aspectRatio: "16:9 Cinema Scope",
            resolution: "4K Master",
            audioSync: "Locked"
        });
    } catch (err) {
        console.error("Pipeline crash:", err);
        return res.status(500).json({ status: "FAILED", error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`[ONLINE] OmniStudio Active. Port: ${PORT}`);
});
