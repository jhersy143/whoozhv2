import * as PlayHT from 'playht';
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import axios from 'axios'; 

PlayHT.init({
    apiKey: "1736f3027c4449aa90fc9128c12a1961" ,
    userId: process.env.PLAYHT_USER_ID || 'oxc7tms7ujOPsI9q07wXvFAPTZ62',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { text } = req.body;
            const generated = await PlayHT.generate(text);

            if (!generated || !generated.audioUrl) { // Check for audioUrl
                return res.status(500).json({ error: 'Failed to generate audio URL' });
            }

            // Download the audio file
            const audioResponse = await axios.get(generated.audioUrl, {
                responseType: 'arraybuffer', // Important: Get binary data
            });

            // Save audio to folder
            const filename = `audio-${Date.now()}.mp3`;
            const filePath = path.join(process.cwd(), 'public', 'audios', filename);

            fs.writeFileSync(filePath, Buffer.from(audioResponse.data, 'binary'));

            const audioUrl = `/audios/${filename}`;
            res.status(200).json({ audioUrl });
        } catch (error) {
            console.error('PlayHT Error:', error);
            res.status(500).json({ error: 'Failed to generate and save audio' });
        }
    } else {
        res.status(405).end();
    }
}