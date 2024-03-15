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