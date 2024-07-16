// pages/api/predict.js
import { spawn } from "child_process";
import path from "path";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { input } = req.body;

    const pythonProcess = spawn("python3", [
      path.resolve("./model_load.py"),
      input,
    ]);

    pythonProcess.stdout.on("data", (data) => {
      res.status(200).json({ prediction: data.toString() });
    });

    pythonProcess.stderr.on("data", (data) => {
      res.status(500).json({ error: data.toString() });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
