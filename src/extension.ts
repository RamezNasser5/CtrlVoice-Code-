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
        goToLineStartDisposable,
        stopReadingDisposable,
        readProblemDisposable,
        handleErrorsDisposable,
        readOptionsDisposable,
     } = read.registerCommands();

    context.subscriptions.push(
        readLineDisposable,
        jumpToNextLineDisposable,
        jumpToPreviousLineDisposable,
        jumpToBeginOfPageDisposable,
        jumpToEndOfPageDisposable,
        readStoryDisposable,
        goToLineEndDisposable,
        goToLineStartDisposable,
        stopReadingDisposable,
        readProblemDisposable,
        handleErrorsDisposable,
        readOptionsDisposable,
    );

    for (let i = 1; i <= 10 ; i++) {
        const readLineCommandId = `extension.readLine${i}`;
        const jumpToNextLineCommandId = `extension.jumpToNextLine${i}`;
        const jumpToPreviousLineCommandId = `extension.jumpToPreviousLine${i}`;
        const jumpToBeginOfPageCommandId = `extension.jumpToBeginOfPage${i}`;
        const jumpToEndOfPageCommandId = `extension.jumpToEndOfPage${i}`;
        const goToLineStartCommandId = `extension.goToLineStart${i}`;
        const goToLineEndCommandId = `extension.goToLineEnd${i}`;
        const stopReadingCommandId = `extension.stopReading${i}`;
        const readProblemCommandId = `extension.stopReading${i}`;
        const  handleErrorsCommandId = `extension.handleErrors${i}`;
        const readNextSuggestionCommandId = `extension.stopReading${i}`;


        read.addSubscriptions(context, 
            readLineCommandId, 
            jumpToNextLineCommandId,
            jumpToPreviousLineCommandId, 
            jumpToBeginOfPageCommandId, 
            jumpToEndOfPageCommandId, 
            goToLineStartCommandId, 
            goToLineEndCommandId,
            stopReadingCommandId,
            readProblemCommandId,
            handleErrorsCommandId,
            readNextSuggestionCommandId,
            );
    }
    return readLineDisposable;

}


export function deactivate(): void {
    // Cleanup, if needed
}
