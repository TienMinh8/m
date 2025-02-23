const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Thư mục chứa các file static

// Thêm middleware xử lý CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// API endpoint để lưu wish
app.post('/api/save-wish', async (req, res) => {
    try {
        const wishesPath = path.join(__dirname, 'public', 'wishes.json');
        
        // Lưu toàn bộ danh sách wishes mới
        await fs.writeFile(wishesPath, JSON.stringify({
            wishes: req.body.wishes
        }, null, 2));
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving wish:', error);
        res.status(500).json({ error: 'Failed to save wish' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 