const { t } = require('localizify');
var nodemailer = require('nodemailer');

module.exports = {
  sendMail: function(req, res, user, token) { 
          // Send the email
          var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: 'kejto', pass: process.env.SENDGRID } });
          var mailOptions = { from: 'no-reply@coindome.com', to: user.email, subject: t('tokenSubject'), text: 'Hello,\n\n' + t('verifyContent') +' \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
          transporter.sendMail(mailOptions, function (err) {
            if (err) { return res.status(500).send({ success: false, message: err.message }); }
              return res.status(200).json({
                success: true,
                message: t('verify') + user.email
              });
          });
  },
};