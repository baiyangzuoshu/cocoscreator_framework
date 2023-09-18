import { Camera, Canvas, Component, Node, Prefab, director, error, find, instantiate } from 'cc';
import { UIComponent } from '../UI/UIComponent';
import { ResManager } from './ResManager';

export class UIManager extends Component {
    
    private uiMap: any = {};

    public static Instance: UIManager = null!;
    private uiCanvas: Canvas = null;
    private uiCamera: Camera = null;
    
    protected onLoad(): void {
        if(UIManager.Instance !== null) {
           this.destroy();
           return; 
        }

        UIManager.Instance = this;
    }

    public Init(): void {
        var canvasNode = find("Canvas");
        if(!canvasNode) {
            error("[UIManager]:can not find UI main Canvas !");
            return;
        }

        this.uiMap = {};
        director.addPersistRootNode(canvasNode);
        this.uiCanvas = canvasNode.getComponent(Canvas);
        this.uiCamera = canvasNode.getChildByName("Camera").getComponent(Camera);
    }

    public ShowUIPrefab(uiPrefab: Prefab, parent: Node = null, withOutCtrl: boolean = false): UIComponent {
        var uiView: Node = instantiate(uiPrefab) as Node;
        parent = (!parent)? this.uiCanvas.node : parent;
        parent.addChild(uiView);

        //往根节点上挂下UI视图脚本;
        var uiCtrl = null;
        if(!withOutCtrl) {
            uiView.addComponent(uiPrefab.data.name + "UICtrl");
        }
        
        this.uiMap[uiPrefab.data.name] = uiView;

        return uiCtrl as UIComponent;
    }

    public async IE_ShowUIView(viewName: string, parent: Node = null, bundleName: string = null, withOutCtrl: boolean = false): Promise<UIComponent> {
        // 实例化UI视图出来; 
        if(!bundleName) {
            bundleName = "GUI";
        }
        var uiPrefab = await ResManager.Instance.IE_GetAsset(bundleName, viewName, Prefab);
        if(!uiPrefab) {
            console.log("cannot find ui Prefab: ", viewName);
            return null!;
        }

        return this.ShowUIPrefab(uiPrefab as Prefab, parent, withOutCtrl);
   }

    public DestroyUIView(viewName: string): void {
        if(!this.uiMap[viewName]) {
            return;
        }

        this.uiMap[viewName].destroy();
        this.uiMap[viewName] = null;
    }

    // 对话框等节点池用这个删除一个UI
    public RemoveUIViewFromParent(viewName: string): Node {
        if(!this.uiMap[viewName]) {
            return null;
        }

        this.uiMap[viewName].removeFromParent();
        var item = this.uiMap[viewName];
        this.uiMap[viewName] = null;

        return item;
    }
}


