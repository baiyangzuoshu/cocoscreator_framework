import UIBase from "../../../Framework/Scripts/UI/UIBase";
import UIWindow from "../../../Framework/Scripts/UI/UIWindow";
import * as fgui from "fairygui-cc";
export default class HitTestDemo extends UIBase {
    onLoad() {

        this.loadMainGUI("HitTest","Main");
        this.guiMakeFullScreen();
    }
}
