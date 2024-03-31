<<<<<<< HEAD
import * as vscode from 'vscode';


export function openFeedbackInterface() {
    const panel = vscode.window.createWebviewPanel(
        'OpenFeedback',
        'Open Feeadback',
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
            <iframe src="http://localhost:3000/"></iframe>
        </body>
        </html>
    `;
}
=======
import { readFileSync } from 'fs';
import * as vscode from 'vscode';


export function openFeedbackInterface(context: vscode.ExtensionContext) {
    
    const editor = vscode.window.activeTextEditor;
    if (editor) {
            // Show the webview panel
            const panel = vscode.window.createWebviewPanel(
                'feedbackInterface',
                'Feedback Interface',
                vscode.ViewColumn.One,
                {
                    enableScripts: true ,
                }
            );
            vscode.window.showErrorMessage(`${context.extensionUri}`);
            panel.webview.html = getFeedWebviewContent();
        
    } else {
        vscode.window.showErrorMessage('No active text editor.');
    }
}

function getFeedWebviewContent(): string { 
    const filePath = readFileSync(__dirname + './../feedback/feedback.html' , {encoding : 'utf-8'});
    return filePath;
}
>>>>>>> 180045896e03e82b250439c94528d5260d33f006
