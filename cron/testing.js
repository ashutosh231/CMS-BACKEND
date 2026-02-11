import cron from "node-cron";

export const testing = () => {
    console.log("Testing Function schedule");
    cron.schedule("31 15 * * *",()=>{
        console.log("Cron job running every minute");
    })
}
//ngrok?ans:- 