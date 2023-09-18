import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

import { UIComponent } from '../../../Framework/Scripts/UI/UIComponent';

@ccclass('UIGameUICtrl')
export class UIGameUICtrl extends UIComponent {
    private version: Label = null;
    
    start(): void {
        this.version = this.ViewComponent<Label>("version", Label);
        this.version.string = "3.8.0";
        this.AddButtonListener("Button", this, this.OnGameStart);
    }

    private OnGameStart(): void {
        console.log("OnGameStart");
    }
}
