import { Button, Component, Node, Prefab, director, error, find, instantiate } from 'cc';
import * as fgui from "fairygui-cc";

export default class UIWindow extends fgui.Window {
    public view:any={}
    public constructor() {
        super();
    }

    public loadWindow(pkgName: string, resName: string){
        this.contentPane = fgui.UIPackage.createObject(pkgName, resName).asCom;
        this.traverseAllChildren(this.contentPane,"")
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

    public windowCenter(restraint?: boolean): void
    {
        this.center(restraint);
    }

    public getWindowChildByName(name: string): fgui.GObject
    {
        return this.contentPane.getChild(name)
    }

    public getWindowTransition(transName: string): fgui.Transition
    {
        return this.contentPane.getTransition(transName)
    }
}
