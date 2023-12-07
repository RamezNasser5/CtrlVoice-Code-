import * as vscode from 'vscode';
import * as read from "./functions_for_voice";


function findPageStart(document: vscode.TextDocument, currentLine: number): number {
    for (let line = currentLine - 1; line >= 0; line--) {
        const text = document.lineAt(line).text;
        if (text.includes('function')) {
            return line;
        }
    }
    return 0;
}

function findPageEnd(document: vscode.TextDocument, currentLine: number): number {

    for (let line = currentLine + 1; line < document.lineCount; line++) {
        const text = document.lineAt(line).text;
        if (text.includes('function')) {
            return line;
        }
    }
    return document.lineCount - 1;
}

export function jumpToNextLineAndRead() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const currentPosition = editor.selection.active;
        const newPosition = currentPosition.translate(1, 0);
        const newSelection = new vscode.Selection(newPosition, newPosition);
        editor.selection = newSelection;
        editor.revealRange(new vscode.Range(newPosition, newPosition));
        read.readLine();
    }
}

export function jumpToPreviousLineAndRead() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const currentPosition = editor.selection.active;
        const newPosition = currentPosition.translate(-1, 0);
        const newSelection = new vscode.Selection(newPosition, newPosition);
        editor.selection = newSelection;
        editor.revealRange(new vscode.Range(newPosition, newPosition));
        read.readLine();
    }
}

export function jumpToBeginOfPage() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const currentPosition = editor.selection.active;
        const currentLine = currentPosition.line;
        const nextFunctionLine = findPageStart(editor.document, currentLine);
        const newPosition = new vscode.Position(nextFunctionLine, 0);
        const newSelection = new vscode.Selection(newPosition, newPosition);
        editor.selection = newSelection;
        editor.revealRange(new vscode.Range(newPosition, newPosition));
    }
}

export function jumpToEndOfPage() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const currentPosition = editor.selection.active;
        const currentLine = currentPosition.line;
        const previousFunctionLine = findPageEnd(editor.document, currentLine);
        const newPosition = new vscode.Position(previousFunctionLine, 0);
        const newSelection = new vscode.Selection(newPosition, newPosition);
        editor.selection = newSelection;
        editor.revealRange(new vscode.Range(newPosition, newPosition));
    }
}



export function goToLineEnd() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const position = editor.selection.active;
        const newPosition = position.with(position.line, Number.MAX_VALUE);
        const newSelection = new vscode.Selection(newPosition, newPosition);
        editor.selection = newSelection;
    }
}

export function goToLineStart() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const position = editor.selection.active;
        const newPosition = position.with(position.line, 0);
        const newSelection = new vscode.Selection(newPosition, newPosition);
        editor.selection = newSelection;
    }
}
