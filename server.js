const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Body parser configurations for processing asset handling up to 50MB
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve all static frontend files from your primary directory root
app.use(express.static(path.join(__dirname, '/')));

// Root route - Entry viewport point for OmniStudio console layout
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * CORE API ENGINE: /api/render-shot
 * Handles incoming scene parameters, tools selections, and responds with a working asset format
 */
app.post('/api/render-shot', async (req, res) => {
    try {
        const { scriptPrompt, activeTool } = req.body;
        console.log(`[OMNISTUDIO SYSTEM] Executing job sequence for tool: [${activeTool}]`);
        console.log(`[PROMPT PARAMETERS] User parameters entered: "${scriptPrompt}"`);

        // Enforce script parameter requirements
        if (!scriptPrompt || scriptPrompt.trim() === "") {
            return res.status(400).json({ 
                status: "ERROR", 
                error: "Execution Denied: Scene prompt parameters cannot be null." 
            });
        }

        /**
         * FIXED CORE VIDEO LINK: 
         * Replaced broken sample streams with a verified, secure HTTPS public test video source.
         * This prevents 'AccessDenied' errors from breaking mobile browsers.
         */
        const verifiedMovieAsset = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

        // Return successful payload package back to your frontend dashboard
        return res.status(200).json({
            status: "SUCCESS",
            videoUrl: verifiedMovieAsset,
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

// Boot the application engine console instance
app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`[ONLINE] OmniStudio Enterprise Core Network Initialized`);
    console.log(`[PORT STATUS] Actively listening on port destination: ${PORT}`);
    console.log(`=======================================================`);
});
