<<<<<<< HEAD
import * as vscode from 'vscode';
=======
import * as vscode from "vscode";
>>>>>>> 180045896e03e82b250439c94528d5260d33f006

export function openChatInterface() {
    // Show the webview panel
    const panel = vscode.window.createWebviewPanel(
        'OpenChat',
        'Open Chat',
        vscode.ViewColumn.One,
        {
            enableScripts: true 
        }
    );

    // Load your chat application URL
    panel.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chat Interface</title>
            <style>
                body, html {
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                }
                iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                }
            </style>
        </head>
        <body>
            <iframe src="http://localhost:5173/"></iframe>
        </body>
        </html>
    `;
}
