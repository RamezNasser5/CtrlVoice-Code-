"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
var vscode = require("vscode");
var say = require("say");
function convertTextToSpeech(text) {
    say.speak(text);
}
function activate(context) {
    var disposable = vscode.commands.registerCommand('extension.exampleCommand', function () {
        var editor = vscode.window.activeTextEditor;
        if (editor) {
            var selection = editor.selection;
            var lineStart = new vscode.Position(selection.active.line, 0);
            var lineEnd = new vscode.Position(selection.active.line + 1, 0);
            var lineRange = new vscode.Range(lineStart, lineEnd);
            var lineText = editor.document.getText(lineRange);
            convertTextToSpeech(lineText);
            // Show the current line text as an information message
            vscode.window.showInformationMessage('Current Line: ' + lineText);
        }
    });
    context.subscriptions.push(disposable);
    return disposable;
}
exports.activate = activate;
function deactivate() {
    // Cleanup, if needed
}
exports.deactivate = deactivate;
