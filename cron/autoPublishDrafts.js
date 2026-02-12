import cron from "node-cron";
import Artifact from "../models/artifact.js";
export const autoPublishDrafts = () => {
  console.log(" Auto-publish drafts cron job scheduled (every 3 hours)");
  cron.schedule("0 */3 * * *", async () => {
    try {
      console.log("\n Running auto-publish cron job...");
      const result = await Artifact.updateMany(
        { status: "DRAFT" },
        { 
          $set: { 
            status: "PUBLISHED",
            updatedAt: new Date()
          } 
        }
      );
      if (result.modifiedCount > 0) {
        console.log(` Auto-published ${result.modifiedCount} draft artifact(s)`);
      } else {
        console.log(" No draft artifacts found to publish");
      }
    } catch (error) {
      console.error(" Auto-publish cron job error:", error.message);
    }
  });
};
