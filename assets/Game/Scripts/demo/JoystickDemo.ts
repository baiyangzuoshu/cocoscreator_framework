import UIBase from "../../../Framework/Scripts/UI/UIBase";
import UIWindow from "../../../Framework/Scripts/UI/UIWindow";
import * as fgui from "fairygui-cc";
import JoystickModule from "./JoystickModule"

export default class JoystickDemo extends UIBase {
    private _joystick: JoystickModule = null!;
    private _text: fgui.GTextField = null!;

    onLoad() {
        this.loadMainGUI("Joystick", "Main");
        this.setGUISize(fgui.GRoot.inst.width, fgui.GRoot.inst.height)

        this._text = this.getGUIChild("n9") as fgui.GTextField;

        this._joystick = new JoystickModule(this.getMainGUI());
        this._joystick.on(JoystickModule.JoystickMoving, this.onJoystickMoving, this);
        this._joystick.on(JoystickModule.JoystickUp, this.onJoystickUp, this);
    }

    private onJoystickMoving(degree: number): void {
        this._text.text = "" + degree;
    }

    private onJoystickUp(): void {
        this._text.text = "";
    }
}