import express from "express";
import cors from "cors";
import path from "path";
import { uploadsRouter } from "./modules/uploads/routes";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use((req, _, next) => {
  console.log(`\n\n#### Method - ${req.method}; path: ${req.path}`);
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", uploadsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
