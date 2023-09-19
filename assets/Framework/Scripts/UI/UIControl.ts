import { Button, Component, Node, Prefab, director, error, find, instantiate } from 'cc';

export class UIControl extends Component {
    public view:any={}
    onLoad() {
        this.traverseAllChildren(this.node,"")
    }
    
    start():void{

    }

    cleanUp():void{

    }

    private traverseAllChildren(node:Node,url:string):void
    {
        for(let i=0;i<node.children.length;i++)
        {
            let child=node.children[i]
            let name=child.name
            this.view[url+name]=child

            this.traverseAllChildren(child,url+name+"/")
        }
    }

    getChildByUrl(url:string):Node{
        return this.view[url] as Node
    }

    buttonAddClickEvent(url:string,func:Function,target:any):void{
        let node=this.getChildByUrl(url)
        if(!node){
            console.error("buttonAddClickEvent url=",url)
            return
        }

        let btn=node.getComponent(Button) as Button
        if(!btn){
            console.error("buttonAddClickEvent btn",url)
            return
        }
 
        node.on("click",func,target)
    }

    
}

