const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/verify-captcha', async (req, res) => {
	const { captchaToken } = req.body;

	if (!captchaToken) {
		return res.status(400).json({ success: false, message: 'No CAPTCHA token provided' });
	}

	const sk = process.env.CAPTCHA_SECRET_KEY;
	const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${sk}&response=${captchaToken}`;

	try {
		const response = await axios.post(verificationURL);
		if (response.data.success) {
			return res.json({ success: true, message: 'CAPTCHA verified successfully' });
		} else {
			return res.status(400).json({ success: false, message: 'CAPTCHA verification failed' });
		}
	} catch (error) {
		console.error('Error verifying CAPTCHA:', error);
		return res.status(500).json({ success: false, message: 'Server error' });
	}
});

module.exports = router;
