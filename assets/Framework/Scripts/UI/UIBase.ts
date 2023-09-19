import { Button, Component, Node, Prefab, director, error, find, instantiate } from 'cc';
import * as fgui from "fairygui-cc";

export default class UIBase extends Component {
    private gui: fgui.GComponent;
    public view:any={}
    private pkgName:string=""
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    public loadMainGUI(pkgName: string, resName: string){
        this.pkgName=pkgName;

        this.gui = fgui.UIPackage.createObject(pkgName, resName) as fgui.GComponent;
        fgui.GRoot.inst.addChild(this.gui);

        this.traverseAllChildren(this.gui,"");
        //console.log(this.view)
    }

    private traverseAllChildren(node:fgui.GComponent,url:string):void
    {
        if(!node||!node._children){
            return
        }

        for(let i=0;i<node._children.length;i++)
        {
            let child=node._children[i]
            let name=child.name
            this.view[url+name]=child

            this.traverseAllChildren(child.asCom,url+name+"/")
        }
    }

    public guiMakeFullScreen(): void
    {
        this.gui.makeFullScreen();
    }

    public buttonAddClickEvent(name:string,func:Function,target:any):void{
        this.gui.getChild(name).onClick(func,target)
    }

    public createGUIObject(resName: string, userClass?: new () => fgui.GObject): fgui.GObject
    {
        let obj=fgui.UIPackage.createObject(this.pkgName, resName,userClass);

        return obj;
    }

    public getGUIChild(name: string): fgui.GObject
    {
        return this.gui.getChild(name)
    }

    public getGUIController(name:string):fgui.Controller
    {
        return this.gui.getController(name);
    }

    public getChildrenNum():number{
        return this.gui.numChildren;
    }

    public getGUIChildAt(idx:number):fgui.GObject{
        return this.gui.getChildAt(idx);
    }

    public getGUIItemURL(resName: string): string
    {
        return fgui.UIPackage.getItemURL(this.pkgName, resName);
    }

    public getMainGUI():fgui.GComponent{
        return this.gui;
    }

    public setGUISize(width:number,height:number):void{
        this.gui.setSize(width, height);
    }

    onDestroy() {
        this.gui.dispose();
    }
}
