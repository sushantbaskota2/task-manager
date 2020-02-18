const apiKey = process.env.SENDGRID_API_KEY;
const sgmail = require('@sendgrid/mail');

sgmail.setApiKey(apiKey);

const sendWelcomeEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'cservice@sushantbaskota.com',
        subject: 'Thanks for joining in',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    });
};

const sendCancellationEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'cservice@sushantbaskota.com',
        subject: 'Sorry to see you go',
        text: `Goodbye, ${name}. I hope we can see you back`
    });
};

module.exports = { sendWelcomeEmail, sendCancellationEmail };
