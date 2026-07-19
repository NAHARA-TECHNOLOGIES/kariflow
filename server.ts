import express, { type Request, type Response } from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: process.cwd() });
const handle = nextApp.getRequestHandler();

async function startServer() {
  await nextApp.prepare();
  const app = express();
  const PORT = 3000;

  // Next.js request handler
  app.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();