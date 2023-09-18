import { Component, Node, log, error, warn, find, Prefab, instantiate, director, Label, Button } from 'cc';
import { ResManager } from './ResManager';

export class Debug extends Component {
    public static Instance: Debug = null;
    private logLabel: Label = null;
    private windowRoot: Node = null;
    private showAndHideBt: Button = null;
    private isShow = false;
    private logLines = new Array<string>();

    protected onLoad(): void {
        if(Debug.Instance !== null) {
            this.destroy();
            return;
        }

        Debug.Instance = this;
    }

    public async Init() {
        var debugPrefab = await ResManager.Instance.IE_GetAsset("FMDebug", "DebugWindow", Prefab)
        var debugWindow = instantiate(debugPrefab as Prefab);
        this.node.parent.addChild(debugWindow);
        if(debugWindow === null) {
            return;
        }

        this.windowRoot = debugWindow.getChildByName("WindowRoot");
        this.logLabel = this.windowRoot.getChildByName("LogContentLabel").getComponent(Label);
        this.logLabel.string = "没有日志";
        // console.log("$$$$$ ", this.logLabel);

        this.showAndHideBt = debugWindow.getChildByName("ShowAndHide").getComponent(Button);
        this.showAndHideBt.node.on('click', this.OnShowAndHideDebugWindow, this);
        this.isShow = true;
        this.OnShowAndHideDebugWindow();

        director.addPersistRootNode(debugWindow);
    }

    private OnShowAndHideDebugWindow(): void {
        this.isShow = !this.isShow;
        if(this.isShow) {
            this.windowRoot.active = true;
        }
        else {
            this.windowRoot.active = false;
        }
    }

    public static Log(...optionalParams: any[]): void {
        var str = "";
        for(var i = 0; i < arguments.length; i ++) {
            str = str + arguments[i];
        }
        
        log(str);

        if(Debug.Instance !== null) { // DebugWindow已经出来了
            Debug.Instance.logLines.push(str);
            Debug.Instance.UpdateContentToDebugWindow();
        }
    }

    public static Error(...optionalParams: any[]): void {
        var str = "";
        for(var i = 0; i < arguments.length; i ++) {
            str = str + arguments[i];
        }
        
        error(str);
        if(Debug.Instance !== null) { // DebugWindow已经出来了
            Debug.Instance.logLines.push(str);
            Debug.Instance.UpdateContentToDebugWindow();
        }
    }

    public static Warning(...optionalParams: any[]): void {
        var str = "";
        for(var i = 0; i < arguments.length; i ++) {
            str = str + arguments[i];
        }
        
        warn(str)
        if(Debug.Instance !== null) { // DebugWindow已经出来了
            Debug.Instance.logLines.push(str);
            Debug.Instance.UpdateContentToDebugWindow();
        }
    }

    private UpdateContentToDebugWindow(): void {
        var contentStr = "";
        var max_num = (this.logLines.length < 20) ? this.logLines.length : 20;
        for(var i = 0; i < max_num; i ++) {
            contentStr = contentStr + this.logLines[this.logLines.length - 1 - i] + "\n"
        }

        this.logLabel.string = contentStr;
    }
}


