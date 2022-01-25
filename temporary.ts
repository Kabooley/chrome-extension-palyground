// observerはupdateという関数を持つことにするとして
//
//
/*
    たとえばstateが変更になったら常に通知される状況だとして
    stateの一覧
        iProgress: 進行状況を保存しているオブジェクト
        iPageStatus: Udemy講義ページの状態を保存しているオブジェクト
        iTabId: 拡張機能を有効にするUdemy講義ページのタブIDを保存しているオブジェクト
        iSubtitles: 取得した整形字幕データを保存しているオブジェクト

    それぞれのプロパティが変更になる場合とは？

    iProgress: {
        isContentScriptInjected: boolean;   // contentScriptがインジェクトされていたらtrue
        isCaptureSubtitleInjected: boolean;  // captureSubtitleはインジェクトされていたらtrue
        isControllerInjected: boolean;
        capturing: boolean;  // 要らないかも...
        captured: boolean;  // 字幕データを取得で来たらtrue
        restructured: boolean;  // ExTranscriptが展開で来たらtrue
    }

    iPageStatus: {
        isEnglish: boolean;
        isOpended: boolean;
        isWindowTooSmall: boolean;
    }
*/

interface iProgress {
    isContentScriptInjected: boolean; // contentScriptがインジェクトされていたらtrue
    isCaptureSubtitleInjected: boolean; // captureSubtitleはインジェクトされていたらtrue
    isControllerInjected: boolean;
    capturing: boolean; // 要らないかも...
    captured: boolean; // 字幕データを取得で来たらtrue
    restructured: boolean; // ExTranscriptが展開で来たらtrue
}

// かならずstate全てを受け取る
const domain = (
    // 新しくなったプロパティだけ送信される
    newState: { [Property in keyof iProgress]?: iProgress[Property] },
    // 更新前のプロパティはすべて送信される
    prevState: { [Property in keyof iProgress]: iProgress[Property] }
) => {};
