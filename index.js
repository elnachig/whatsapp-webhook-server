const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ====== VERIFICACIÓN DEL WEBHOOK (GET) ======
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "nachi123";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verificado correctamente");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ====== RECEPCIÓN DE MENSAJES DE META (POST) ======
app.post("/webhook", (req, res) => {
  console.log("Mensaje recibido:");
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

// ====== INICIAR SERVIDOR ======
app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
