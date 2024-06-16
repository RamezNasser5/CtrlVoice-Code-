import * as vscode from 'vscode';
import * as read from "./register_execute_commands";

export function activate(context: vscode.ExtensionContext): vscode.Disposable {
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
        explanCodeDisposable,
        speachToTextDisposable,
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
        explanCodeDisposable,
        speachToTextDisposable,
    );

    for (let i = 1; i <= 16; i++) {
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
        const explanCodeCommandId = `extension.explainCode${i}`;
        const speachToTextCommandId = `extension.SpeechToText${i}`;

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
            explanCodeCommandId,
            speachToTextCommandId,
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
