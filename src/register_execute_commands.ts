import * as vscode from 'vscode';
import * as chat from "./functions_for_chat";
import * as feedback from "./functions_for_feedback";
import * as navigator from "./functions_for_navigator";
import * as openAI from "./functions_for_openai";
import * as read from "./functions_for_voice";
import * as speach from "./speech_to_text";

export function registerCommands() {
    const readLineDisposable = vscode.commands.registerCommand('extension.readLine', () => {
        read.readLine();
    });

    const goToLineEndDisposable = vscode.commands.registerCommand('extension.goToLineEnd', () => {
        navigator.goToLineEnd();
    });

    const goToLineStartDisposable = vscode.commands.registerCommand('extension.goToLineStart', () => {
        navigator.goToLineStart();
    });

    const jumpToNextLineDisposable = vscode.commands.registerCommand('extension.jumpToNextLine', () => {
        navigator.jumpToNextLineAndRead();
    });

    const jumpToPreviousLineDisposable = vscode.commands.registerCommand('extension.jumpToPreviousLine', () => {
        navigator.jumpToPreviousLineAndRead();
    });

    const jumpToBeginOfPageDisposable = vscode.commands.registerCommand('extension.jumpToBeginOfPage', () => {
        navigator.jumpToBeginOfPage();
    });

    const jumpToEndOfPageDisposable = vscode.commands.registerCommand('extension.jumpToEndOfPage', () => {
        navigator.jumpToEndOfPage();
    });

    const readStoryDisposable = vscode.commands.registerCommand('extension.readStory', () => {
        read.readEntireStory();
    });

    const stopReadingDisposable = vscode.commands.registerCommand('extension.stopReading', () => {
        read.stopReading();
    });

    const readProblemDisposable = vscode.commands.registerCommand('extension.readProblems', () => {
        read.readProblems();
    });

    const handleErrorsDisposable = vscode.commands.registerCommand('extension.handleErrors', () => {
        navigator.handleErrors();
    });

    const readOptionsDisposable = vscode.commands.registerCommand('extension.readNextSuggestion', async () => {
        read.readNextSuggestion();
    });

    const OpenFeedbackdisposable = vscode.commands.registerCommand('extension.openFeedback', () => {
        feedback.openFeedbackInterface();
    });

    const OpenChatdisposable = vscode.commands.registerCommand('extension.openChat', () => {
        chat.openChatInterface();
    });

    const OpenAIdisposable = vscode.commands.registerCommand('extension.openAI', () => {
        openAI.chatInterface();
    });

    const explanCodeDisposable = vscode.commands.registerCommand('extension.explainCode', () => {
        openAI.EditCode('any thing');
    });

    const speachToTextDisposable = vscode.commands.registerCommand('extension.SpeechToText', async () => {
        speach.speechToText();
    });


    return {
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
    };
}

export function addSubscriptions(context: vscode.ExtensionContext,
    readLine: string,
    jumpToNextLineCommandId: string,
    jumpToPreviousLineCommandId: string,
    jumpToBeginOfPageCommandId: string,
    jumpToEndOfPageCommandId: string,
    goToLineStartCommandId: string,
    goToLineEndCommandId: string,
    stopReadingCommandId: string,
    readProblemCommandId: string,
    handleErrorsCommandId: string,
    readNextSuggestionCommandId: string,
    openChatCommandId: string,
    openFeedbackCommandId: string,
    openAICommandId: string,
    explanCodeCommandId: string,
    speachToTextCommandId: string,
) {

    context.subscriptions.push(
        vscode.commands.registerCommand(readLine, () => {
            vscode.commands.executeCommand('extension.readLine');
        }),
        vscode.commands.registerCommand(jumpToNextLineCommandId, () => {
            vscode.commands.executeCommand('extension.jumpToNextLine');
        }),
        vscode.commands.registerCommand(jumpToPreviousLineCommandId, () => {
            vscode.commands.executeCommand('extension.jumpToPreviousLine');
        }),
        vscode.commands.registerCommand(jumpToBeginOfPageCommandId, () => {
            vscode.commands.executeCommand('extension.jumpToBeginOfPage');
        }),
        vscode.commands.registerCommand(jumpToEndOfPageCommandId, () => {
            vscode.commands.executeCommand('extension.jumpToEndOfPage');
        }),
        vscode.commands.registerCommand(goToLineStartCommandId, () => {
            vscode.commands.executeCommand('extension.goToLineStart');
        }),
        vscode.commands.registerCommand(goToLineEndCommandId, () => {
            vscode.commands.executeCommand('extension.goToLineEnd');
        }),
        vscode.commands.registerCommand(stopReadingCommandId, () => {
            vscode.commands.executeCommand('extension.stopReading');
        }),
        vscode.commands.registerCommand(readProblemCommandId, () => {
            vscode.commands.executeCommand('extension.stopReading');
        }),
        vscode.commands.registerCommand(handleErrorsCommandId, () => {
            vscode.commands.executeCommand('extension.handleErrors');
        }),
        vscode.commands.registerCommand(readNextSuggestionCommandId, () => {
            vscode.commands.executeCommand('extension.readNextSuggestion');
        }),
        vscode.commands.registerCommand(openChatCommandId, () => {
            vscode.commands.executeCommand('extension.openChat');
        }),
        vscode.commands.registerCommand(openFeedbackCommandId, () => {
            vscode.commands.executeCommand('extension.openFeedback');
        }),
        vscode.commands.registerCommand(openAICommandId, () => {
            vscode.commands.executeCommand('extension.openAI');
        }),
        vscode.commands.registerCommand(explanCodeCommandId, () => {
            vscode.commands.executeCommand('extension.explainCode');
        }),
        vscode.commands.registerCommand(speachToTextCommandId, () => {
            vscode.commands.executeCommand('extension.SpeechToText');
        }),
    );
}

// console.log(context);
// const panel = vscode.window.createWebviewPanel(
//     'openChat',
//     'Chat',
//     vscode.ViewColumn.One,
//     {
//         localResourceRoots: [vscode.Uri.joinPath(context?.extensionUri, 'ChatRoom')]
//     },
// );
//const onDiskPath = vscode.Uri.joinPath( context?.extensionUri , 'ChatRoom', 'chat.css');
//const catGifSrc = panel.webview.asWebviewUri(onDiskPath);
