const express = require('express');
const path = require('path');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

// Body parser configurations
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * DIRECT VIDEO STREAM PROXY:
 * Serves the video directly from your server to bypass iOS CORS / Cross-Origin restrictions.
 */
app.get('/api/video', (req, res) => {
    const videoUrl = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
    
    https.get(videoUrl, (stream) => {
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Access-Control-Allow-Origin', '*');
        stream.pipe(res);
    }).on('error', (err) => {
        res.status(500).send("Video proxy error");
    });
});

/**
 * DOWNLOAD ENDPOINT:
 * Forces mobile devices to download the file directly instead of opening a broken external page.
 */
app.get('/api/download', (req, res) => {
    const videoUrl = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
    
    res.setHeader('Content-Disposition', 'attachment; filename="omnistudio-movie.mp4"');
    res.setHeader('Content-Type', 'video/mp4');
    
    https.get(videoUrl, (stream) => {
        stream.pipe(res);
    }).on('error', (err) => {
        res.status(500).send("Download error");
    });
});

/**
 * CORE RENDER API
 */
app.post('/api/render-shot', async (req, res) => {
    try {
        const { scriptPrompt, activeTool } = req.body;
        console.log(`[OMNISTUDIO SYSTEM] Executing job sequence for tool: [${activeTool}]`);

        if (!scriptPrompt || scriptPrompt.trim() === "") {
            return res.status(400).json({ 
                status: "ERROR", 
                error: "Execution Denied: Scene prompt parameters cannot be null." 
            });
        }

        // Return same-origin endpoints!
        return res.status(200).json({
            status: "SUCCESS",
            videoUrl: "/api/video",
            downloadUrl: "/api/download",
            aspectRatio: "16:9 Cinema Scope",
            resolution: "4K Master Build",
            audioSync: "Locked Architecture Mode"
        });

    } catch (err) {
        console.error("[CRITICAL SYSTEM CRASH]:", err);
        return res.status(500).json({ 
            status: "FAILED", 
            error: "Internal cluster compilation failure: " + err.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`[ONLINE] OmniStudio Enterprise Core Network Initialized`);
    console.log(`[PORT STATUS] Actively listening on port destination: ${PORT}`);
    console.log(`=======================================================`);
});
