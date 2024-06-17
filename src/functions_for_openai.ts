import { GoogleGenerativeAI } from "@google/generative-ai";
import say from 'say';
import * as vscode from 'vscode';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyCKb-OZto7o3tahH1CANNzW3DJXf4DYBkE');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function chatInterface() {

  const editor = vscode.window.activeTextEditor;
  var lineText = "";

  if (editor) {
    const selection = editor.selection;
    const lineStart = new vscode.Position(selection.active.line, 0);
    const lineEnd = new vscode.Position(selection.active.line + 1, 0);
    const lineRange = new vscode.Range(lineStart, lineEnd);
    lineText = editor.document.getText(lineRange);
  }

  const prompt = `Explain this line ${lineText}`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  vscode.window.showInformationMessage(text);
  say.speak(text);
}

export async function EditCode(transcript: string) {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const fullText = editor.document.getText();

    const prompt = `${transcript} ${fullText} and give me only my complete code after modifying it`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const newText = response.text();

    vscode.window.showInformationMessage(newText);

    editor.edit(editBuilder => {
      const documentStart = new vscode.Position(0, 0);
      const documentEnd = new vscode.Position(editor.document.lineCount + 1, 0);
      const documentRange = new vscode.Range(documentStart, documentEnd);
      const chars: string[] = [];
      var flage = false;
      for (let index = 0; index < newText.length; index++) {
        if (newText[index] !== "`") {
          chars[index] = newText[index];
        }
        while (newText[index] !== "\n" && !flage) {
          chars[index] = "";
          index++;
        }
        flage = true;
      }
      editBuilder.replace(documentRange, chars.join(''));
    });

    say.speak(newText);
  }
}
//AIzaSyCKb-OZto7o3tahH1CANNzW3DJXf4DYBkE
