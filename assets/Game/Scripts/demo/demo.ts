import FGUIManager from '../../../Framework/Scripts/Managers/FGUIManager';
import { ResManager } from '../../../Framework/Scripts/Managers/ResManager';
import { _decorator, Component, Node, Prefab, BufferAsset, AssetManager } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import MainMenu from './MainMenu';

@ccclass('demo')
export class demo extends Component {
    private test:number=0;
    private _currentDemo: any;
    private _closeButton: any;    
    start() {
        this.addComponent(FGUIManager);
        console.log("1111111111")
        this.loadMainGUI();
        console.log("22222222222222")
        this.node.on("start_demo", this.onDemoStart, this);
    }

    async loadMainGUI(){
        let arr=[
            "MainMenu","Bag","Chat","HitTest","Basics","Cooldown","Guide","Joystick","LoopList","ListEffect",
            "PullToRefresh","ScrollPane","ModalWaiting","Transition","TreeView","VirtualList"
        ]
        arr.forEach(async (v,k,_)=>{
            console.log(v,k)
            var bundle:AssetManager.Bundle = await ResManager.Instance.IE_LoadBundle("UI") as AssetManager.Bundle; 
            FGUIManager.getInstance().loadPackageByBundle(bundle,v)
        })
    }

    onDemoStart(demo) {
        this._currentDemo = demo;
        this._closeButton = fgui.UIPackage.createObject("MainMenu", "CloseButton");
        this._closeButton.setPosition(fgui.GRoot.inst.width - this._closeButton.width - 10, fgui.GRoot.inst.height - this._closeButton.height - 10);
        this._closeButton.addRelation(fgui.GRoot.inst, fgui.RelationType.Right_Right);
        this._closeButton.addRelation(fgui.GRoot.inst, fgui.RelationType.Bottom_Bottom);
        this._closeButton.sortingOrder = 100000;
        this._closeButton.onClick(this.onDemoClosed, this);
        fgui.GRoot.inst.addChild(this._closeButton);
    }

    onDemoClosed() {
        fgui.GRoot.inst.removeChildren(0, -1, true);
        this._currentDemo.destroy();

        this.addComponent(MainMenu);
    }

    update(deltaTime: number) {
        this.test++
        if(60==this.test){
            this.addComponent(MainMenu);
        }
    }
}


