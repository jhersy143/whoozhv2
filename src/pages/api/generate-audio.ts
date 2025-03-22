// pages/api/generate-audio.ts
import { TextToSpeechClient, protos } from '@google-cloud/text-to-speech';
import fs from 'fs-extra';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import 'dotenv/config'; // Add this line at the top

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }
    //console.log("key "+ process.env.GOOGLE_PRIVATE_KEY)
    try {
        const client = new TextToSpeechClient({
            keyFilename: path.join(process.cwd(), 'whoozh-0c85c67b61d1.json'),
        });
     
        const { text } = req.body;

        const request = {
            input: { text: text },
            voice: { languageCode: 'en-US', name: 'en-US-Wavenet-F' },
            audioConfig: { audioEncoding: 'MP3' },
        };

        const [response] = await client.synthesizeSpeech(request);

        if (!response || !response.audioContent) {
            throw new Error("No audio content received from Google Cloud Text-to-Speech API");
        }

        const audioContent = response.audioContent;

        const filename = `audio-${Date.now()}.mp3`;
        const audioFilePath = path.join(process.cwd(), 'public', 'audios', filename);

        await fs.ensureDir(path.join(process.cwd(), 'public', 'audios'));

        await fs.writeFile(audioFilePath, audioContent, 'binary');

        const audioUrl = `/${filename}`;
        res.status(200).json({ audioUrl: audioUrl });

    } catch (error) {
        console.error('Error generating or saving audio:', error);
        res.status(500).json({ error: 'Failed to generate or save audio' });
    }
}