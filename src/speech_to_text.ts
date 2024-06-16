import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import * as vscode from 'vscode';
import Microphone from 'node-microphone';

const API_KEY = '15ef8eb55ab245e3a0b440a997c2d1d3';

export async function speechToText() {
    try {
        vscode.window.showInformationMessage('Recording audio for 5 seconds...');
        const audioFilePath = await recordAudio();

        // Check if the file is created and not empty
        const fileStats = fs.statSync(audioFilePath);
        if (fileStats.size === 0) {
            vscode.window.showErrorMessage('Recorded audio file is empty.');
            return;
        }

        vscode.window.showInformationMessage('Sending audio to AssemblyAI...');
        const transcription = await sendAudioToAssemblyAI(audioFilePath);
        vscode.window.showInformationMessage('Transcription: ' + transcription);
    } catch (error) {
        if (error instanceof Error) {
            vscode.window.showErrorMessage('Error: ' + error.message);
        } else {
            vscode.window.showErrorMessage('An unknown error occurred.');
        }
    }
}

async function recordAudio(): Promise<string> {
    return new Promise((resolve, reject) => {
        const audioFilePath = path.join(__dirname, 'audio.wav');
        const fileStream = fs.createWriteStream(audioFilePath);

        const mic = new Microphone();
        const micStream = mic.startRecording();

        micStream.pipe(fileStream);

        setTimeout(() => {
            mic.stopRecording();
            fileStream.close();
            resolve(audioFilePath);
        }, 5000); // Record for 5 seconds
    });
}

async function sendAudioToAssemblyAI(audioFilePath: string): Promise<string> {
    const uploadUrl = 'https://api.assemblyai.com/v2/upload';
    const transcriptUrl = 'https://api.assemblyai.com/v2/transcript';

    // Upload the audio file
    const audioBuffer = fs.readFileSync(audioFilePath);
    const uploadResponse = await axios.post(uploadUrl, audioBuffer, {
        headers: {
            'authorization': API_KEY,
            'content-type': 'application/octet-stream'
        }
    });
    console.log('Upload response:', uploadResponse.data);

    // Request transcription
    const transcriptResponse = await axios.post(transcriptUrl, {
        audio_url: uploadResponse.data.upload_url
    }, {
        headers: {
            'authorization': API_KEY,
            'content-type': 'application/json'
        }
    });
    console.log('Transcript response:', transcriptResponse.data);

    const transcriptId = transcriptResponse.data.id;

    // Poll for the transcription result
    let transcriptionResult;
    while (true) {
        const result = await axios.get(`${transcriptUrl}/${transcriptId}`, {
            headers: { 'authorization': API_KEY }
        });
        console.log('Polling result:', result.data);

        if (result.data.status === 'completed') {
            transcriptionResult = result.data.text;
            break;
        } else if (result.data.status === 'failed') {
            throw new Error('Transcription failed');
        }

        await new Promise(res => setTimeout(res, 5000)); // Wait for 5 seconds before polling again
    }

    return transcriptionResult;
}
