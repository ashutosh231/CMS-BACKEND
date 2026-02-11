import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
});

//for verification
export const verifyMail = async ()=>{
    try{
        await transporter.verify();
        console.log("✅ Mail server ready");
    } catch(error){
        console.log("❌ Mail server error:",error.message);
    }
};