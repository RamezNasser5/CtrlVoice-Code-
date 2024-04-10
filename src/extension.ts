import * as vscode from 'vscode';
import * as read from "./register_execute_commands";

export function activate(context: vscode.ExtensionContext): vscode.Disposable {
    //vscode.window.showErrorMessage(`${context.extensionUri}`);
    //file:///d%3A/programers/material/level_4/CtrlVoice-Code-/ChatRoom/download.jpg
    const {
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
        OpenChatdisposable,
        OpenFeedbackdisposable,
        OpenAIdisposable,
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
        OpenChatdisposable,
        OpenFeedbackdisposable,
        OpenAIdisposable,
    );

    for (let i = 1; i <= 15; i++) {
        const readLineCommandId = `extension.readLine${i}`;
        const jumpToNextLineCommandId = `extension.jumpToNextLine${i}`;
        const jumpToPreviousLineCommandId = `extension.jumpToPreviousLine${i}`;
        const jumpToBeginOfPageCommandId = `extension.jumpToBeginOfPage${i}`;
        const jumpToEndOfPageCommandId = `extension.jumpToEndOfPage${i}`;
        const goToLineStartCommandId = `extension.goToLineStart${i}`;
        const goToLineEndCommandId = `extension.goToLineEnd${i}`;
        const stopReadingCommandId = `extension.stopReading${i}`;
        const readProblemCommandId = `extension.readProblems${i}`;
        const handleErrorsCommandId = `extension.handleErrors${i}`;
        const readNextSuggestionCommandId = `extension.readNextSuggestion${i}`;
        const openChatCommandId = `extension.openChat${i}`;
        const openFeedbackCommandId = `extension.openFeedback${i}`;
        const openAICommandId = `extension.openAI${i}`;

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
            openChatCommandId,
            openFeedbackCommandId,
            openAICommandId,
        );
    }
    return readLineDisposable;
}

export function deactivate(): void {
    // Cleanup, if needed
}


// "snippets": [
//     {
//         "language": "javascript",
//         "path": "./snippets/javascript.json"
//     }  
//   ],


//My API key : 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