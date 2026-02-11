import {transporter} from "../config/mail.js"

export const sendMail= async ({to,subject,html}) =>{
    try{
        const info=await transporter.sendMail({
            from:`"CMS APP" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        console.log("Email sent:",info.messageId);
        return info;
    }catch(error){
        console.error("❌ Email failed:",error.messageId);
        throw new Error("Email could not be sent");
    }
}