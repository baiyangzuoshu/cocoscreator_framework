import UIBase from "../../../Framework/Scripts/UI/UIBase";
import UIWindow from "../../../Framework/Scripts/UI/UIWindow";
import * as fgui from "fairygui-cc";
import { TestWin } from "./TestWin"

export default class ModalWaitingDemo extends UIBase {
    private _testWin: TestWin = null!;

    onLoad() {
        fgui.UIConfig.globalModalWaiting = "ui://ModalWaiting/GlobalModalWaiting";
        fgui.UIConfig.windowModalWaiting = "ui://ModalWaiting/WindowModalWaiting";

        this.loadMainGUI("ModalWaiting", "Main")
        this.setGUISize(fgui.GRoot.inst.width, fgui.GRoot.inst.height)

        this._testWin = new TestWin();
        this.getGUIChild("n0").onClick(() => { this._testWin.show(); });

        //这里模拟一个要锁住全屏的等待过程
        fgui.GRoot.inst.showModalWait();
        this.scheduleOnce(() => {
            fgui.GRoot.inst.closeModalWait();
        }, 3);
    }
}