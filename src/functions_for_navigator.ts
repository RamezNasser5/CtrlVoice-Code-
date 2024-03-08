import * as vscode from 'vscode';
import * as read from "./functions_for_voice";
import say from 'say';



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

let currentErrorIndex = 0;

export function handleErrors() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const document = editor.document;
    const diagnostics = vscode.languages.getDiagnostics(document.uri);
    
    // Extract unique error lines
    const uniqueErrorLines: Set<number> = new Set();
    diagnostics.forEach((diagnostic) => {
        const { range } = diagnostic;
        for (let i = range.start.line; i <= range.end.line; i++) {
            uniqueErrorLines.add(i + 1); // Add 1 to make lines 1-based
        }
    });
    
    // Convert set to sorted array
    const errorLines = Array.from(uniqueErrorLines).sort((a, b) => a - b);
    
    // If there are no errors, do nothing
    if (errorLines.length === 0) {
        return;
    }
    
    // Ensure currentErrorIndex stays within bounds
    currentErrorIndex %= errorLines.length;

    // Move cursor to the next error line
    const newPosition = new vscode.Position(errorLines[currentErrorIndex] - 1, 0); // Convert back to 0-based
    const newSelection = new vscode.Selection(newPosition, newPosition);
    editor.selection = newSelection;

    // Update currentErrorIndex for next iteration
    currentErrorIndex++;
}


