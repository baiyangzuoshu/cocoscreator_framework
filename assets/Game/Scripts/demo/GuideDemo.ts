import UIBase from "../../../Framework/Scripts/UI/UIBase";
import UIWindow from "../../../Framework/Scripts/UI/UIWindow";
import * as fgui from "fairygui-cc";
export default class GuideDemo extends UIBase {
    private _guideLayer: fgui.GComponent = null!;

    onLoad() {
        this.loadMainGUI("Guide", "Main");
        this.guiMakeFullScreen()

        this._guideLayer = this.createGUIObject("GuideLayer").asCom;
        this._guideLayer.makeFullScreen();
        this._guideLayer.addRelation(fgui.GRoot.inst, fgui.RelationType.Size);

        let bagBtn = this.getGUIChild("bagBtn");
        bagBtn.onClick(() => {
            this._guideLayer.removeFromParent();
        }, this);

        this.getGUIChild("n2").onClick(() => {
            fgui.GRoot.inst.addChild(this._guideLayer);
            let rect = bagBtn.localToGlobalRect(0, 0, bagBtn.width, bagBtn.height);
            rect = this._guideLayer.globalToLocalRect(rect.x, rect.y, rect.width, rect.height);

            let window = this._guideLayer.getChild("window");
            window.setSize(rect.width, rect.height);
            fgui.GTween.to2(window.x, window.y, rect.x, rect.y, 0.5).setTarget(window, window.setPosition);
        }, this);
    }
}
