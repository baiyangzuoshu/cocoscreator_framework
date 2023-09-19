import UIBase from "../../../Framework/Scripts/UI/UIBase";
import UIWindow from "../../../Framework/Scripts/UI/UIWindow";
import * as fgui from "fairygui-cc";
export default class CooldownDemo extends UIBase {
	private _btn0: fgui.GProgressBar = null!;
	private _btn1:fgui.GProgressBar = null!;

    onLoad() {
        this.loadMainGUI("Cooldown", "Main")
        this.guiMakeFullScreen();

        this._btn0 = this.getGUIChild("b0") as fgui.GProgressBar;
		this._btn1 = this.getGUIChild("b1") as fgui.GProgressBar;
        
        this._btn0.getChild("icon").icon = "Icons/k0";
		this._btn1.getChild("icon").icon = "Icons/k1";

        fgui.GTween.to(0, 100, 5).setTarget(this._btn0, "value").setRepeat(-1);
        fgui.GTween.to(10, 0, 10).setTarget(this._btn1, "value").setRepeat(-1);
    }
}
