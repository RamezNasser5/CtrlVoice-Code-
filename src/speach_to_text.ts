import * as vscode from "vscode";

export function speachToText() {
    const panel = vscode.window.createWebviewPanel(
        'speechToText',
        'Speech to Text',
        vscode.ViewColumn.One,
        {
            enableScripts: true
        }
    );

    panel.webview.html = getWebviewContent();

    panel.webview.onDidReceiveMessage(
        message => {
            switch (message.command) {
                case 'insertText':
                    const activeTextEditor = vscode.window.activeTextEditor;
                    if (activeTextEditor) {
                        activeTextEditor.edit(editBuilder => {
                            editBuilder.insert(activeTextEditor.selection.active, message.text);
                        });
                    }
                    return;
            }
        },
        undefined,
    );
}

function getWebviewContent() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Speech to Text</title>
</head>
<body>
    <h1>Speech to Text</h1>
    <button id="start">Start Recognition</button>
    <button id="stop">Stop Recognition</button>
    <script>
        const vscode = acquireVsCodeApi();
        const startButton = document.getElementById('start');
        const stopButton = document.getElementById('stop');

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            console.log('Speech recognition started');
        };

        recognition.onend = () => {
            console.log('Speech recognition ended');
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log('Speech recognition result:', transcript);
            vscode.postMessage({ command: 'insertText', text: transcript });
        };

        startButton.addEventListener('click', () => {
            console.log('Start button clicked');
            recognition.start();
        });

        stopButton.addEventListener('click', () => {
            console.log('Stop button clicked');
            recognition.stop();
        });
    </script>
</body>
</html>`;
}
