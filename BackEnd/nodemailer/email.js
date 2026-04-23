import { Transporter } from "./nodemailer.config.js";
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";

export const SendVerificationEmail = async ( email, verificationToken ) =>{
    try {
        const response = await Transporter.sendMail({
            from: `"Basma" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify your Email!",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        })
        console.log("Email sent succesfully", response.messageId)
    } catch (error) {
        console.error(`Error sending verification email `, error)
        throw new Error(`Error sending verification email: ${error}`) 
        
    }
}

export const sendWelcomeEmail = async (email, name)=>{
    try {
        const htmlContent = `
        <h1>Welcome ${name} !</h1>
        <p>Thanks for joining us !</p>`
        const response = await Transporter.sendMail({
            from: `"Basma" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Welcome !",
            html: htmlContent
        })
        console.log("Welcome email sent successfully !", response.messageId)

    } catch (error) {

        console.error(`Error sending welcome email `, error)
        throw new Error(`Error sending welcome email: ${error}`) 
    }
}

export const sendPasswordResetEmail = async (email, resetUrl)=>{
    try {
        const response = await Transporter.sendMail({
            from: `"Basma" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Reset your password !",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl)
        })
        console.log("Password reset email sent successfully !", response.messageId)

    } catch (error) {
        console.error(`Error sending reset password email `, error)
        throw new Error(`Error sending reset password email: ${error}`)
    }
}

export const sendResetSuccessEmail = async (email) => {
    try {
        const response = await Transporter.sendMail({
            from: `"Basma" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset successful !",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE
        })
        console.log("Password reset success email sent successfully !", response.messageId)

    } catch (error) {
        console.error(`Error sending reset succes email `, error)
        throw new Error(`Error sending reset success email: ${error}`)
    }
}