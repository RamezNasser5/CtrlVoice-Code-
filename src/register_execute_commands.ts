import * as vscode from 'vscode';
import * as navigator from "./functions_for_navigator";
import * as read from "./functions_for_voice";

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
    return { readLineDisposable, 
        jumpToNextLineDisposable, 
        jumpToPreviousLineDisposable, 
        jumpToBeginOfPageDisposable, 
        jumpToEndOfPageDisposable, 
        readStoryDisposable, 
        goToLineEndDisposable, 
        goToLineStartDisposable };
}

export function addSubscriptions(context: vscode.ExtensionContext,
    readLine: string,
    jumpToNextLineCommandId: string,
    jumpToPreviousLineCommandId: string,
    jumpToBeginOfPageCommandId: string,
    jumpToEndOfPageCommandId: string,
    goToLineStartCommandId: string,
    goToLineEndCommandId: string) {

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
        })
    );
}
