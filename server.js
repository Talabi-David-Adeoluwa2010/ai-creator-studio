const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Upgrading parsing limits to handle high-capacity file ingestion frameworks smoothly
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/render-shot', async (req, res) => {
    const { scriptPrompt } = req.body;
    console.log(`Executing engine render pass for sequence: ${scriptPrompt}`);

    res.status(202).json({
        message: "Dynamic multi-track parameters accepted by engine cluster.",
        estimated_time: "15 seconds"
    });
});

app.listen(PORT, () => {
    console.log(`OmniStudio deployment instance actively processing on port ${PORT}`);
});
