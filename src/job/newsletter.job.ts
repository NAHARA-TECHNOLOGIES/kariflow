import { newsletterService } from "@/services/newsletterEngine";

class NewsletterJob {
  private isRunning = false;

  async run() {
    if (this.isRunning) {
      console.log("[Newsletter Job] Previous run still active.");
      return;
    }

    this.isRunning = true;

    console.log(
      `[Newsletter Job] Started at ${new Date().toISOString()}`
    );

    try {
      const result = await newsletterService.sendNewsletter();

      console.log("[Newsletter Job] Finished.");

      console.table(result);

      return result;
    } catch (error) {
      console.error("[Newsletter Job]", error);
    } finally {
      this.isRunning = false;
    }
  }

  start(intervalMinutes = 60) {
    console.log(
      `[Newsletter Job] Scheduler started. Runs every ${intervalMinutes} minute(s).`
    );

    // First run immediately
    this.run();

    // Schedule subsequent runs
    setInterval(() => {
      this.run();
    }, intervalMinutes * 60 * 1000);
  }
}

export const newsletterJob = new NewsletterJob();