import express from "express";

const app = express();
const port = Number(process.env.PORT || 8080); // Cloud Run uses 8080

app.get("/", (_req, res) => {
  res.send("Hello from Maintenance Inventory ??");
});

// Simple health check for smoke tests
app.get("/healthz", (_req, res) => res.status(200).send("ok"));

app.listen(port, () => {
  console.log(`MaintenanceInv listening on ${port}`);
});