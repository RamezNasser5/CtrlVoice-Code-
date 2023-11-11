declare module 'google-tts-api' {
    function getAudioUrl(text: string, options?: { lang?: string; slow?: boolean }): Promise<string>;
  
    export = getAudioUrl;
  }
  