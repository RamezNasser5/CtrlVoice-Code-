declare module 'node-record-lpcm16' {
    interface Options {
        sampleRateHertz?: number;
        threshold?: number;
        verbose?: boolean;
        recordProgram?: string;
        silence?: string;
    }

    export function record(options?: Options): {
        stream: () => NodeJS.ReadableStream;
        stop: () => void;
    };
}
