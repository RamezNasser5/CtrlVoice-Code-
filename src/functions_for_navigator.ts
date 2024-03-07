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

export function handleErrors() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        const diagnostics = vscode.languages.getDiagnostics(document.uri);
        if (diagnostics.length === 0) {
            say.speak('No errors found.');
            vscode.window.showInformationMessage('No errors found.');
            return;
        }
        else{
        const uniqueErrorLines: Set<number> = new Set();
        diagnostics.forEach((diagnostic) => {
            const { range } = diagnostic;
            for (let i = range.start.line; i <= range.end.line; i++) {
                if(i === range.start.line||i===range.end.line)
                {
                    uniqueErrorLines.add(i+1);
                }
                else
                {uniqueErrorLines.add(i);}
            }
        });
        const errorLines = Array.from(uniqueErrorLines).sort((a, b) => a - b);
        if (errorLines.length === 0) {
            say.speak('No errors found.');
            vscode.window.showInformationMessage('No errors found.');
            return;
        }
        else if(errorLines.length === 1){
        const errorLineNumber = errorLines[0] ;
        const newPosition = new vscode.Position(errorLines[0]-1, 0); 
        const newSelection = new vscode.Selection(newPosition, newPosition);
        editor.selection = newSelection;
        const errorMessage = `Error at line ${errorLineNumber}: ${diagnostics[0].message}.`;
        say.speak(errorMessage);
        vscode.window.showErrorMessage(errorMessage);
        }

        else if(errorLines.length > 1) {
            const newPosition = new vscode.Position(errorLines[0]-1, 0); 
            const newSelection = new vscode.Selection(newPosition, newPosition);
            editor.selection = newSelection; 
            const diagSet = new Set();
            for (const diagnostic of diagnostics) {
                diagSet.add(diagnostic.message);
            }
            const diag = Array.from(diagSet);
            const additionalErrorsMessage = `Sorry, your code contains several errors at the lines: ${errorLines.slice(0).join(', ')}, Expected errors: ${diag.slice(0).join(', ')}.`;
            say.speak(additionalErrorsMessage);
            vscode.window.showErrorMessage(additionalErrorsMessage);
        }
        else{
            const additionalWarningMessage = `There appears to be a problem although we have not detected any errors in your code.`;
            say.speak(additionalWarningMessage);
            vscode.window.showWarningMessage(additionalWarningMessage);
        }}
    } 
}
