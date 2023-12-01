import * as vscode from 'vscode';
import * as read from "./register_execute_commands";




export function activate(context: vscode.ExtensionContext): vscode.Disposable {
    const { readLineDisposable, 
        jumpToNextLineDisposable, 
        jumpToPreviousLineDisposable, 
        jumpToBeginOfPageDisposable, 
        jumpToEndOfPageDisposable, 
        readStoryDisposable, 
        goToLineEndDisposable, 
        goToLineStartDisposable } = read.registerCommands();

    context.subscriptions.push(
        readLineDisposable,
        jumpToNextLineDisposable,
        jumpToPreviousLineDisposable,
        jumpToBeginOfPageDisposable,
        jumpToEndOfPageDisposable,
        readStoryDisposable,
        goToLineEndDisposable,
        goToLineStartDisposable
    );

    for (let i = 1; i <= 9; i++) {
        const readLineCommandId = `extension.readLine${i}`;
        const jumpToNextLineCommandId = `extension.jumpToNextLine${i}`;
        const jumpToPreviousLineCommandId = `extension.jumpToPreviousLine${i}`;
        const jumpToBeginOfPageCommandId = `extension.jumpToBeginOfPage${i}`;
        const jumpToEndOfPageCommandId = `extension.jumpToEndOfPage${i}`;
        const goToLineStartCommandId = `extension.goToLineStart${i}`;
        const goToLineEndCommandId = `extension.goToLineEnd${i}`;

        read.addSubscriptions(context, 
            readLineCommandId, 
            jumpToNextLineCommandId,
            jumpToPreviousLineCommandId, 
            jumpToBeginOfPageCommandId, 
            jumpToEndOfPageCommandId, 
            goToLineStartCommandId, 
            goToLineEndCommandId);
    }
    return readLineDisposable;

}


export function deactivate(): void {
    // Cleanup, if needed
}
