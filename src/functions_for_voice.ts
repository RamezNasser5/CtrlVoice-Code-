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

export function stopReading() {
    say.stop();
}


let diagnosticIndex = 0;
export function readProblems() {
    const diagnostics = vscode.languages.getDiagnostics();
    if (diagnostics.length === 0) {
        vscode.window.showInformationMessage("No problems to read.");
        say.speak("No problems have been detected in workspace");
        return;
    }

    const flattenedDiagnostics = diagnostics.flatMap(([uri, diagnosticList]) => {
        return diagnosticList.map(diagnostic => ({
            uri,
            diagnostic
        }));
    });

    flattenedDiagnostics.sort((a, b) => {
        const lineDiff = a.diagnostic.range.start.line - b.diagnostic.range.start.line;
        if (lineDiff !== 0) {
            return lineDiff;
        }
        return a.diagnostic.range.start.character - b.diagnostic.range.start.character;
    });

    const { uri, diagnostic } = flattenedDiagnostics[diagnosticIndex];

    const lineNumber = diagnostic.range.start.line + 1;
    const lineContent = vscode.window.activeTextEditor?.document.lineAt(diagnostic.range.start.line).text;
    const message = `Error ${diagnosticIndex + 1} of ${flattenedDiagnostics.length}: Line ${lineNumber}, ${lineContent} - ${diagnostic.message}`;

    say.speak(message);

    diagnosticIndex = (diagnosticIndex + 1) % flattenedDiagnostics.length;
}