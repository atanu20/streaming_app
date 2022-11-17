var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
  auth: {
    api_key: process.env.SEND_GRID_API_KEY,
  },
};
var mailer = nodemailer.createTransport(sgTransport(options));

const sendEmailGrid = (name, to, url, txt, work) => {
  if (work === 'actvation') {
    var email = {
      from: process.env.SEND_GRID_MAIL,
      to: to,
      subject: 'SHOWBOX ACCOUNT VERIFICATION',
      html: `
                          <div style="max-width: 700px;background-color:ghostwhite;box-shadow:0px 2px 15px black; margin:auto; border: 5px solid #ddd; padding: 50px 20px; font-size: 110%;">
                          <h2 style=" text-transform: capitalize;color: teal;">Hi ${name} </h2>
                          <p>Thank You for signing up, we're excited to get you started on ShowBox.
                          </p>
                          <p>Please click on the link below to activate your account.</p>
                          
                          <a href=${url} target='_blank' style="background: #5E50F9; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
                      
                          
                          </div>
                      `,
    };
  } else if (work == 'delete video') {
    var email = {
      from: process.env.SEND_GRID_MAIL,
      to: to,
      subject: 'VIOLATES OUR SAFETY POLICY',
      html: `
                          <div style="max-width: 700px;background-color:ghostwhite;box-shadow:0px 2px 15px black; margin:auto; border: 5px solid #ddd; padding: 50px 20px; font-size: 110%;">
                          <h2 style=" text-transform: capitalize;color: teal;">Hi ${name} </h2>
                          <p>We wanted to let you know our team reviewed your content, and we think it violates our safety policy. 
                          </p>
                          <p>Video : <span style="color:#5E50F9"> ${txt}</span> </p>
                        
                         <p>We realize this may be disappointing news, but it's our job to make sure that <a href=${url} target='_blank' style="color:#5E50F9">SHOWBOX</a>  is a safe place for all.</p>

                      <p>Sincerely, <br/>
                      The ShowBox Team</p>
                          
                          </div>
                      `,
    };
  }

  mailer.sendMail(email, function (err, res) {
    if (err) {
      console.log(err);
    }
    console.log(res);
  });
};

module.exports = sendEmailGrid;
