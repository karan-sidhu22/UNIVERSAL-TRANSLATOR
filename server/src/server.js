import express from "express";
import cors from "cors";
import translateRoutes from "./routes/translate.js";
import speechRoutes from "./routes/speech.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/translate", translateRoutes);
app.use("/api/speech", speechRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
