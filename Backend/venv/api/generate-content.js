import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Alternative to ollama package

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
// Direct Ollama API endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const ollamaResponse = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'phi4-mini', // or any model you've pulled
        prompt: prompt,
        stream: false
        
      })
    });

    const data = await ollamaResponse.json();
    res.json({
      response: data.response || 'No response generated'
    }); 
    
  } catch (error) {
    console.error('Ollama error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});