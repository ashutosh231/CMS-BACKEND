import cron from "node-cron";
import Artifact from "../models/artifact.js";

/**
 * Auto-publish draft artifacts every 3 hours
 *//// Cron expression: "0 */3 * * *" 
 //* Runs at: 12:00 AM, 3:00 AM, 6:00 AM, 9:00 AM, 12:00 PM, 3:00 PM, 6:00 PM, 9:00 PM
 ////*/
export const autoPublishDrafts = () => {
  console.log("📅 Auto-publish drafts cron job scheduled (every 3 hours)");
  
  // Schedule to run every 3 hours
  cron.schedule("0 */3 * * *", async () => {
    try {
      console.log("\n🔄 Running auto-publish cron job...");
      
      // Find all artifacts with DRAFT status and update to PUBLISHED
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
        console.log(`✅ Auto-published ${result.modifiedCount} draft artifact(s)`);
      } else {
        console.log("ℹ️  No draft artifacts found to publish");
      }
    } catch (error) {
      console.error("❌ Auto-publish cron job error:", error.message);
    }
  });
};
