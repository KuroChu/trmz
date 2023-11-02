const express = require('express');
const { getLongUrl, trackVisit, createQrCode} = require('./shorts.service');

const shortsRouter = express.Router();

shortsRouter.get('/', async (req, res) => {
  res.status(404).sendFile('/public/404.html', {root: '.'})
});
shortsRouter.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const longUrl = await getLongUrl(slug);

    if (longUrl) {
      await trackVisit(slug, req);
      res.redirect(302, longUrl);
    } else {
      res.status(404).sendFile('/public/404.html', {root: '.'})
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

shortsRouter.get('/:slug/follow', async (req, res) => {
  const { slug } = req.params;

  try{
    await trackVisit(slug, req);
    res.set('Content-Type', 'image/gif');
    res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
  } catch (err) {
    console.error('Error tracking visit:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

shortsRouter.get('/:slug/qr', async (req, res) => {
  const { slug } = req.params;
  const { size=300, format='png', margin=0, ecl='L' } = req.query;
  console.log("Slug is: ", slug);

  try {
    const url = `${req.protocol}://${req.get('host')}/${slug}`;
    const qrCodeDataUrl = await createQrCode(url, size, format, margin, ecl);
    const imageBuffer = Buffer.from(qrCodeDataUrl.split(',')[1], 'base64');
    res.set('Content-Type', 'image/png');
    res.set('Content-Length', imageBuffer.length);
    res.status(200).send(imageBuffer);
  } catch (err) {
    console.error('Error generating QR code:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = shortsRouter;
