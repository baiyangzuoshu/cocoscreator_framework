import { _decorator, Component, director, Node } from 'cc';
import { GameApp } from '../../Game/Scripts/GameApp';
import { SceneManager } from '../../Framework/Scripts/Managers/SceneManager';
import { ResManager } from '../../Framework/Scripts/Managers/ResManager';
import { Debug } from '../../Framework/Scripts/Managers/Debug';
import { EventManager } from '../../Framework/Scripts/Managers/EventManager';
import { TimerManager } from '../../Framework/Scripts/Managers/TimerManager';
import { SoundManager } from '../../Framework/Scripts/Managers/SoundManager';
import { ExcelManager } from '../../Framework/Scripts/Managers/ExcelManager';
import { PoolManager } from '../../Framework/Scripts/Managers/PoolManager';
import { WsNetMgr } from '../../Framework/Scripts/Managers/WsNetMgr';
import { UIManager } from '../../Framework/Scripts/Managers/UIManager';


const { ccclass, property } = _decorator;

@ccclass('Boot')
export class Boot extends Component {
    
    public static Instance: Boot = null!;

    @property
    public isDebug: boolean = false;

    @property
    public useWebSocket: boolean = false;

    protected onLoad(): void {
        if(Boot.Instance === null) {
            Boot.Instance = this;
        }
        else {
            this.destroy();
            return;
        }

        director.addPersistRootNode(this.node); // 不随场景切换而删除的节点
        this.StartUp();
    }

    private async StartUp() {
        await this.CheckHotUpdate();
        await this.InitFramework();
    }

    private CheckHotUpdate() {

    }

    
    private async InitFramework() {
        // 资源管理模块的初始化
        this.node.addComponent(ResManager).Init();
        // end

        // 自定义事件订阅与发布模块
        this.node.addComponent(EventManager).Init();
        // end
        
        
        // 初始化UI框架
        this.node.addComponent(UIManager).Init();
        // end
        
        // Timer模块的初始化
        this.node.addComponent(TimerManager).Init();
        //end

        // 初始化声音播放模块
        this.node.addComponent(SoundManager).Init("Musics", "Sounds");
        // end

        // 初始化我们的Excel表格模块
        this.node.addComponent(ExcelManager).Init();
        // end

        // 初始化节点池
        this.node.addComponent(PoolManager).Init();
        // end

        if(this.useWebSocket) {
            this.node.addComponent(WsNetMgr).Init();
        }
        // 场景管理模块
        this.node.addComponent(SceneManager).Init();
        // end

        // 初始化我们的日志管理模块
        if(this.isDebug) {
            await this.node.addComponent(Debug).Init();
        }
        // end
        
        
        // 进入游戏
        this.node.addComponent(GameApp).Init();
        GameApp.Instance.EnterGame();
        // end
    }
}


