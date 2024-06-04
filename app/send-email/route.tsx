import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import sql, { ConnectionPool } from 'mssql';
dotenv.config();

const config = {
  user:process.env. DB_USER,
  password: process.env.DB_PASSWORD,
  server: 'nkmKcjXffhgQsgf\\sqlexpress',
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  options: {
    trustServerCertificate: true,
  },
};
export async function POST(req: any) {
  const body = await req.json();

  const { name, email, phone, message } = body;
  console.log('Form Data:', { name, email, phone, message });

  // try {
  //   const pool = await new ConnectionPool(config).connect();
  //   const result = await pool.query`
  //     INSERT INTO Form (Name, Email, Phone, Message)
  //     VALUES (${name}, ${email}, ${phone}, ${message});
  //   `;
  // } catch (error) {
  //   console.error('Error inserting form data:', error);
  //   return NextResponse.json({}, { status: 500 });
  // } finally {
  //   await sql.close();
  // }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const adminEmail = 'mahmoud.alshbib93@gmail.com'; 

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: [adminEmail], 
    subject: 'Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);


    const userMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Form Submission - Bestätigung',
      text: `Vielen Dank, ${name}, für Ihre Formulareinsendung. Wir haben Ihre Nachricht erhalten.`,
    };

    await transporter.sendMail(userMailOptions);

    console.log('E-Mails erfolgreich gesendet');
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('Fehler beim Senden der E-Mails:', error);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function GET(req: any) {
  return NextResponse.json({}, { status: 405 });
}





// import { NextResponse } from "next/server";
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// import sql, { ConnectionPool } from 'mssql';
// dotenv.config();

// const config = {
//   user:process.env. DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: 'nkmKcjXffhgQsgf\\sqlexpress',
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   options: {
//     trustServerCertificate: true,
//   },
// };
// export async function POST(req: any) {
//   const body = await req.json();

//   const { name, email, phone, message } = body;
//   console.log('Form Data:', { name, email, phone, message });

//   try {
//     const pool = await new ConnectionPool(config).connect();
//     const result = await pool.query`
//       INSERT INTO Form (Name, Email, Phone, Message)
//       VALUES (${name}, ${email}, ${phone}, ${message});
//     `;
//   } catch (error) {
//     console.error('Error inserting form data:', error);
//     return NextResponse.json({}, { status: 500 });
//   } finally {
//     await sql.close();
//   }

//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.SMTP_USER,
//     to: 'lorya.sh98@gmail.com',
//     subject: 'Form Submission',
//     text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
//   };
 
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');
//     return NextResponse.json({}, { status: 200 });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return NextResponse.json({}, { status: 500 });
//   }
// }

// export async function GET(req: any) {
//   return NextResponse.json({}, { status: 405 });
// }


