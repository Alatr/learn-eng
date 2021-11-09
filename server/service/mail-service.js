// import nodemailer from "nodemailer";
// import * as env from "../pass-conf.js";

// class MailService {
//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       host: env.SMTP_HOST,
//       port: env.SMTP_PORT,
//       secure: false,
//       auth: {
//         pass: env.APP_PASSWORD,
//         user: env.SMTP_USER,
//       },
//     });
//   }
//   async sandActivationMail(to, link) {
//     await this.transporter.sendMail({
//       from: process.env.SMTP_USER,
//       to,
//       subject: `Activation account to ${process.env.API_URL}`,
//       text: "",

//       html: `
//         <div>
//           <h1>For activation click to link</h1>
//           <a href="${link}">${link}</a>
//         </div>
//       `,
//     });
//   }
// }

// export default new MailService();
