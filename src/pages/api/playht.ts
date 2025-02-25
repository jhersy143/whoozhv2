import * as PlayHT from 'playht';
import type { NextApiRequest, NextApiResponse } from 'next';

PlayHT.init({
    apiKey: "1736f3027c4449aa90fc9128c12a1961" ,
    userId: process.env.PLAYHT_USER_ID || 'oxc7tms7ujOPsI9q07wXvFAPTZ62',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { text } = req.body; // Parse the request body
            const generated = await PlayHT.generate(text);
            res.status(200).json(generated);
        } catch (error) {
            console.error('PlayHT Error:', error);
            res.status(500).json({ error: 'Failed to generate audio' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}