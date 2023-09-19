import UIBase from "../../../Framework/Scripts/UI/UIBase";
import UIWindow from "../../../Framework/Scripts/UI/UIWindow";
import * as fgui from "fairygui-cc";
export default class TransitionDemo extends UIBase {
    private _btnGroup: fgui.GGroup = null!;
    private _g1: fgui.GComponent = null!;
    private _g2: fgui.GComponent = null!;
    private _g3: fgui.GComponent = null!;
    private _g4: fgui.GComponent = null!;
    private _g5: fgui.GComponent = null!;
    private _g6: fgui.GComponent = null!;

    private _startValue: number = 0;
    private _endValue: number = 0;

    onLoad() {
        this.loadMainGUI("Transition", "Main");
        this.guiMakeFullScreen();

        this._btnGroup = this.getGUIChild("g0") as fgui.GGroup;

        this._g1 = fgui.UIPackage.createObject("Transition", "BOSS").asCom;
        this._g2 = fgui.UIPackage.createObject("Transition", "BOSS_SKILL").asCom;
        this._g3 = fgui.UIPackage.createObject("Transition", "TRAP").asCom;
        this._g4 = fgui.UIPackage.createObject("Transition", "GoodHit").asCom;
        this._g5 = fgui.UIPackage.createObject("Transition", "PowerUp").asCom;
        this._g6 = fgui.UIPackage.createObject("Transition", "PathDemo").asCom;

        //play_num_now是在编辑器里设定的名称，这里表示播放到'play_num_now'这个位置时才开始播放数字变化效果
        this._g5.getTransition("t0").setHook("play_num_now", this.__playNum.bind(this));

        this.getGUIChild("btn0").onClick(() => { this.__play(this._g1); });
        this.getGUIChild("btn1").onClick(() => { this.__play(this._g2); });
        this.getGUIChild("btn2").onClick(() => { this.__play(this._g3); });
        this.getGUIChild("btn3").onClick(this.__play4, this);
        this.getGUIChild("btn4").onClick(this.__play5, this);
        this.getGUIChild("btn5").onClick(() => { this.__play(this._g6); });
    }

    private __play(target: fgui.GComponent): void {
        this._btnGroup.visible = false;
        fgui.GRoot.inst.addChild(target);
        var t: fgui.Transition = target.getTransition("t0");
        t.play(() => {
            this._btnGroup.visible = true;
            fgui.GRoot.inst.removeChild(target);
        });
    }

    private __play4(): void {
        this._btnGroup.visible = false;
        this._g4.x = fgui.GRoot.inst.width - this._g4.width - 20;
        this._g4.y = 100;
        fgui.GRoot.inst.addChild(this._g4);
        var t: fgui.Transition = this._g4.getTransition("t0");
        //播放3次
        t.play(() => {
            this._btnGroup.visible = true;
            fgui.GRoot.inst.removeChild(this._g4);
        }, 3);
    }

    private __play5(): void {
        this._btnGroup.visible = false;
        this._g5.x = 20;
        this._g5.y = fgui.GRoot.inst.height - this._g5.height - 100;
        fgui.GRoot.inst.addChild(this._g5);
        var t: fgui.Transition = this._g5.getTransition("t0");
        this._startValue = 10000;
        var add: number = Math.ceil(Math.random() * 2000 + 1000);
        this._endValue = this._startValue + add;
        this._g5.getChild("value").text = "" + this._startValue;
        this._g5.getChild("add_value").text = "+" + add;
        t.play(() => {
            this._btnGroup.visible = true;
            fgui.GRoot.inst.removeChild(this._g5);
        });
    }

    private __playNum(): void {
        //这里演示了一个数字变化的过程
        fgui.GTween.to(this._startValue, this._endValue, 0.3)
            .setEase(fgui.EaseType.Linear)
            .onUpdate((tweener: fgui.GTweener) => {
                this._g5.getChild("value").text = "" + Math.floor(tweener.value.x);
            });
    }
}

