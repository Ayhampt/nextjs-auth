import nodemailer from "nodemailer";
import User from "@/models/user.models";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: parseInt(process.env.MAILER_PORT || ""),
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });


    const action = emailType === "VERIFY" ? "verify your email" : "reset your password";

    const endPoint = emailType === "VERIFY" ? "verifyemail" : "forgotpass";


    const link = `${process.env.DOMAIN}/${endPoint}?token=${hashedToken}`

    const mailOptions = {
      from: "hgjghjg@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>
          Click <a href="${link}">here</a> to ${action}, or copy and paste the link below into your browser:
          <br><br>
          ${link}
        </p>
      `
    };

    const mailresponse = await transporter.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


