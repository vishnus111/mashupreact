const express = require('express');
const Url = require('../models/Url');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, async (req, res) => {
    const { url, title } = req.body;
    const user = req.user.id;

    try {
        const urlCount = await Url.countDocuments({ user });
        if (urlCount >= 5) return res.status(400).json({ msg: 'URL limit reached' });

        const newUrl = new Url({ url, title, user });
        await newUrl.save();

        res.json(newUrl);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/list', authMiddleware, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const urls = await Url.find({ user: req.user.id })
            .sort({ addedAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Url.countDocuments({ user: req.user.id });
        res.json({
            urls,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.put('/edit/:id', authMiddleware, async (req, res) => {
    const { title } = req.body;

    try {
        let url = await Url.findById(req.params.id);
        if (!url) return res.status(404).json({ msg: 'URL not found' });

        if (url.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

        url.title = title;
        await url.save();

        res.json(url);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
        let url = await Url.findById(req.params.id);
        if (!url) return res.status(404).json({ msg: 'URL not found' });

        if (url.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

        await url.remove();

        res.json({ msg: 'URL deleted' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
