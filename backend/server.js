import express from 'express';
import cors from 'cors';
import Retell from 'retell-sdk';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(cors());

const retellClient = new Retell({ apiKey: process.env.RETELL_API_KEY });

app.post('/register-call', async (_req, res) => {
  try {
    // Usamos createWebCall para obtener el access_token
    const webCallResponse = await retellClient.call.createWebCall({
      agent_id: process.env.AGENT_ID,
    });
    
    // Enviamos la respuesta completa (que incluye el access_token)
    res.json(webCallResponse);

  } catch (error) {
    console.error('Error creating web call:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});