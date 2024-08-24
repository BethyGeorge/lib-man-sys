const supabase = require('../config/supabase');
const webpush = require('web-push');
const transporter = require('../config/nodemailer');

// Web Push Notification Setup
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const sendWebNotification = async (req, res) => {
  const { userId, message } = req.body;

  const { data: user, error } = await supabase
    .from('users')
    .select('webPushSubscription')
    .eq('id', userId)
    .single();

  if (error || !user) return res.status(400).json({ error: 'User not found or no subscription' });

  const subscription = user.webPushSubscription;

  try {
    await webpush.sendNotification(subscription, JSON.stringify({ message }));
    res.status(200).json({ message: 'Notification sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send notification' });
  }
};

const sendEmailNotification = async (req, res) => {
  const { userId, subject, text } = req.body;

  const { data: user, error } = await supabase
    .from('users')
    .select('email')
    .eq('id', userId)
    .single();

  if (error || !user) return res.status(400).json({ error: 'User not found' });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: user.email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).json({ error: 'Failed to send email' });
    res.status(200).json({ message: 'Email sent', info });
  });
};

module.exports = { sendWebNotification, sendEmailNotification };
