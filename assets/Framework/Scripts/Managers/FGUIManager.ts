import { AssetManager, Component } from "cc";
import * as fgui from "fairygui-cc";

export default class FGUIManager extends Component {
    private guiObjects={}
    public static Instance: FGUIManager = null!;
    // LIFE-CYCLE CALLBACKS:
    protected onLoad(): void {
        if(FGUIManager.Instance !== null) {
            this.destroy();
            return;
        }

        FGUIManager.Instance = this;
         //创建UI根节点
         fgui.GRoot.create();
    }

    public loadPackageByPath(path:string):number{
        if(this.guiObjects[path]){
            return -1;
        }

        fgui.UIPackage.loadPackage(path, this.onUILoaded.bind(this));

        return 0;
    }

    public loadPackageByBundle(bundle: AssetManager.Bundle, path: string):number{
        if(this.guiObjects[path]){
            return -1;
        }
        
        fgui.UIPackage.loadPackage(bundle,path,this.onUILoaded.bind(this));

        return 0;
    }

    public onUILoaded(error: any, pkg: fgui.UIPackage) {
        if(error){
            console.error("onUILoaded error",error)
            return
        }
        this.guiObjects[pkg.path]=pkg;

        console.log("onUILoaded",error,pkg)
    }
}
