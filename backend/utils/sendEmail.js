// const nodemailer = require("nodemailer");

// module.exports = async (email, subject, text)=>{
//     try {
//         const transporter =nodemailer.createTransport({
//             host:process.env.HOST,
//             service:process.env.SERVICE,
//             port:Number(process.env.EMAIL_PORT),
//             secure:Boolean(process.env.SECURE),
//             auth:{
//                 user:process.env.USER,
//                 pass:process.env.PASS
//             }
//         })

//         await transporter.sendMail({
//             from:process.env.USER,
//             to:email,
//             subject: subject,
//             text:text
//         })

//         console.log("Email sent Successfully")
//     } catch (error) {
//         console.log("Email not sent")
//         console.log(error)

//     }
// }

const nodemailer = require("nodemailer");

module.exports = async (email, subject, url, user) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const html = `
    <html>
    <head></head>
    <body>
        <div style="background-color: #f2f2f2; padding: 20px; width: 80%; max-width: 600px; margin: 20px auto;">
            <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                 <div style="text-align: center; margin-bottom: 20px;">
<div style="background-color: #9bbffa; border-radius: 5px; padding: 10px; height: auto;">
     <h1>${subject}</h1>
</div>
</div>
                <p>Hi, ${user.fname} ${user.lname}</p>
               <p>Thank you for using our service. To verify your account, please click the link below:</p>
              <div style="text-align: center;">
            <a href="${url}" style="text-decoration: none; background-color: #007BFF; color: #fff; padding: 10px 20px; border-radius: 5px; margin-top: 10px; display: inline-block;">Verify Account</a>
        </div>
            </div>
        </div>
    </body>
    </html>
    
`;

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: subject,
      text: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent Successfully");
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};
