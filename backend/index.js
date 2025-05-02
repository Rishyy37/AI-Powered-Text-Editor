const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const NodeCache = require('node-cache');

dotenv.config();
const app = express();
const cache = new NodeCache({ stdTTL: 300 });

app.use(cors());
app.use(express.json());

app.post('/tone-adjust', async (req, res) => {
  const { text, toneLevel } = req.body;
  const cacheKey = `${text}-${toneLevel}`;
  const cached = cache.get(cacheKey);

  if (cached) return res.json({ result: cached });

  const prompt = `Rewrite the following text with a tone level of ${toneLevel} (0 = most formal, 100 = most casual):\n"${text}"`;

  try {
    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-small',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const adjustedText = response.data.choices[0].message.content;
    cache.set(cacheKey, adjustedText);
    res.json({ result: adjustedText });
  } catch (err) {
    res.status(500).json({ error: 'Mistral API failed' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
