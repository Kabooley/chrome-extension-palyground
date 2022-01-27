/******************************************************
 * ANNOTATION OF background.ts
 * _____________________________________________________
 * Definition of annotation for background.ts.
 * This is like header file of C.
 * *****************************************************/
import { subtitle_piece } from "../utils/constants";
import { State } from "../utils/State";

// NOTE: 1/28 NEW CONSTANTS
// 
// interfaces and constants for State annotation

// interface for state saves progress 
export interface iProgress {
    isContentScriptInjected: boolean;
    isCaptureSubtitleInjected: boolean;
    isControllerInjected: boolean;
    isSubtitleCapturing: boolean;
    isSubtitleCaptured: boolean;
    isTranscriptRestructured: boolean;
};

// base object for State<iProgress>
export const progressBase: iProgress = {
    isContentScriptInjected: false,
    isCaptureSubtitleInjected: false,
    isControllerInjected: false,
    isSubtitleCapturing: false,
    isSubtitleCaptured: false,
    isTranscriptRestructured: false
} as const;

export interface iPageStatus {
    isTranscriptON: boolean;
    isEnglish: boolean;
    isWindowTooSmall: boolean;
}
// chrome browser Tab id that extension deployed
export interface iTabId {
    tabId: number;
};

// web page URL that extension deployed
export interface iContentUrl {
    url: string;
}

// Surgery subtitle data that going to be used by ExTranscript
export interface iSubtitle {
    subtitles: subtitle_piece[];
};


export interface iStateList {
    register: <TYPE extends object>(name: string, instance: State<TYPE>) => void;
    unregister: (name: string) => void;
    caller: <TYPE extends object>(name: string) => State<TYPE>;
    //
    // ADDED
    //
    showList: () => void;
    //
    // ADDED
    //
    length: () => number;
  }