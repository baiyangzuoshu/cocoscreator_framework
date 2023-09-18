import { Camera, Canvas, Component, Node, Prefab, director, error, find, instantiate } from 'cc';
import { EventManager } from '../Managers/EventManager';
export class UIComponent extends Component {
    private eventMap: any = {};  // {"eventName": [ {func: 回调的函数, caller: 函数里面的this}], "eventName": [], }

    public ViewNode(viewName): Node {
        var node = this.node.getChildByPath(viewName);
        return node;
    }

    public ViewComponent<T extends Component>(viewName: string, classConstructor): T {
        var node = this.node.getChildByPath(viewName);
        if(node === null) {
            return null;
        }

        var com = node.getComponent(classConstructor);
        return com as T;
    } 

    // 编写一些接口，方便我们对UI组件做监听;
    public AddButtonListener(viewName: string, caller: any, func: any) {
        var view_node = this.ViewNode(viewName);
        if (!view_node) {
            return;
        }

        view_node.on("click", func, caller);
    }
    //监听事件
    public AddEventListener(eventName: string, callback:Function, caller:any): void {
        if(!this.eventMap[eventName]) {
            this.eventMap[eventName] = []; // [函数1()， 函数2(), ....]
        }

        var listeners = this.eventMap[eventName];
        var listenNode = {
            func: callback,
            self: caller, 
        };

        listeners.push(listenNode);

        EventManager.Instance.AddEventListener(eventName, callback, caller);
    }
    //当该组件被销毁时调用
    protected onDestroy(): void
    {
        for(var eventName in this.eventMap) {
            var listeners: Array<any> = this.eventMap[eventName] as Array<any>;
            for(var i = 0; i < listeners.length; i ++) {
                EventManager.Instance.RemoveEventListener(eventName, listeners[i].func, listeners[i].self);
            }
        }
        this.eventMap = null;
        //console.log(this.node.name,"onDestroy");
    }
}

