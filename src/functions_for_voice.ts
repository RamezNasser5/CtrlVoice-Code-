import * as vscode from 'vscode';
import say from 'say';

export function readLine() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const selection = editor.selection;
        const lineStart = new vscode.Position(selection.active.line, 0);
        const lineEnd = new vscode.Position(selection.active.line + 1, 0);
        const lineRange = new vscode.Range(lineStart, lineEnd);
        const lineText = editor.document.getText(lineRange);

        say.speak(lineText);
    }
}

export function readEntireStory() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const fullText = editor.document.getText();
        say.speak(fullText);
    }
}