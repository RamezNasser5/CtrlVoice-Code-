import * as vscode from 'vscode';
import say from 'say';

interface Disposable {
  dispose(): void;
}

export function activate(context: vscode.ExtensionContext): Disposable {
  const disposable = vscode.commands.registerCommand('extension.exampleCommand', () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const selection = editor.selection;
      const lineStart = new vscode.Position(selection.active.line, 0);
      const lineEnd = new vscode.Position(selection.active.line + 1, 0);
      const lineRange = new vscode.Range(lineStart, lineEnd);
      const lineText = editor.document.getText(lineRange);

      say.speak(lineText);

      // Show the current line text as an information message
      vscode.window.showInformationMessage('Current Line: ' + lineText);
    }
  });

  context.subscriptions.push(disposable);

  return disposable;
}

export function deactivate(): void {
  // Cleanup, if needed
}
