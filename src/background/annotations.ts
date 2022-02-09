/******************************************************
 * ANNOTATION OF background.ts
 * _____________________________________________________
 * Definition of annotation for background.ts.
 * This is like header file of C.
 * *****************************************************/
import { subtitle_piece } from '../utils/constants';
import State from '../utils/background/State';

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
    isExTranscriptStructured: boolean;
}

// base object for State<iProgress>
export const progressBase: iProgress = {
    isContentScriptInjected: false,
    isCaptureSubtitleInjected: false,
    isControllerInjected: false,
    isSubtitleCapturing: false,
    isSubtitleCaptured: false,
    isExTranscriptStructured: false,
} as const;

export interface iPageStatus {
    isTranscriptDisplaying: boolean;
    isEnglish: boolean;
    // isWindowTooSmall: boolean;
}
// chrome browser Tab id that extension deployed
export interface iTabId {
    tabId: number;
}

// web page URL that extension deployed
export interface iContentUrl {
    url: string;
}

// Surgery subtitle data that going to be used by ExTranscript
export interface iSubtitle {
    subtitles: subtitle_piece[];
}

export interface iModel
    extends iProgress,
        iPageStatus,
        iContentUrl,
        iTabId,
        iSubtitle {}

export interface iStateModule<TYPE extends object> {
    register: (m: State<TYPE>) => void;
    unregister: () => void;
    getInstance: () => State<TYPE>;
}

// modelBaseは新規プロパティの追加も削除もない
export const modelBase: iModel = {
    isContentScriptInjected: false,
    isCaptureSubtitleInjected: false,
    isControllerInjected: false,
    isSubtitleCapturing: false,
    isSubtitleCaptured: false,
    // NOTE: ExTranscriptがONかどうか
    // RUNした後かどうか、でもある
    // 表示、非表示は関係ない
    isExTranscriptStructured: false,
    // NOTE: 本家トランスクリプトが表示されているかどうか
    // ONかどうかではなく、表示されているかどうか
    // これが非表示なら、ExTranscriptも非表示にする
    isTranscriptDisplaying: false,
    isEnglish: false,
    tabId: null,
    url: null,
    subtitles: null,
} as const;
