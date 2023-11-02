const axios = require('axios');
const crypto = require('crypto');
const qrcode = require('qrcode');
const { pool } = require('../utils/database');

const getLongUrl = async (shortCode) => {
  const res = await pool.query(`SELECT long_url FROM short_urls WHERE short_code = \'${shortCode}\'`)
  if (res.rowCount === 0) {
    return null;
  }
  return res.rows[0].long_url;
}

const trackVisit = async (shortCode, req) => {
  const referer = req.get('Referrer') || 'unknown';
  const userAgent = req.get('User-Agent') || 'unknown';
  const ipAddress = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim() || '1.1.1.1';

  const ipInfoRes = await axios.get(`https://freeipapi.com/api/json/${ipAddress}`);
  const ipInfo = ipInfoRes.data;

  const shortUrlRes = await pool.query(`SELECT id FROM short_urls WHERE short_code = \'${shortCode}\'`);
  if (shortUrlRes.rowCount === 0) {
    throw new Error('Short URL not found');
  }
  const shortUrlId = shortUrlRes.rows[0].id;

  const hashedIp = hashIpAddress(ipAddress);  // Assume hashIpAddress is a function you've defined elsewhere

  const queryText = 'INSERT INTO visits (short_url_id, referer, date, user_agent, country, region, hashed_ip, potential_bot) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  const queryValues = [
    shortUrlId,
    referer,
    new Date(),
    userAgent,
    ipInfo.countryName,
    ipInfo.regionName,
    hashedIp,
    userAgent.includes('bot')
  ];
  await pool.query(queryText, queryValues);
}

const hashIpAddress = (ipAddress) => {
  const hash = crypto.createHash('sha256');
  hash.update(ipAddress);
  return hash.digest('hex');
}

const createQrCode = async (url, size, format, margin, ecl) => {
  try {
    return await qrcode.toDataURL(url, {width: size, type: format, margin: margin, errorCorrectionLevel: ecl});
  } catch (err) {
    throw new Error('Failed to generate QR code: ' + err.message);
  }
}

module.exports = {
  getLongUrl,
  trackVisit,
  createQrCode
};
