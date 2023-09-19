import { Component, Node, TextAsset, find } from 'cc';
import { SceneManager } from '../../Framework/Scripts/Managers/SceneManager';
import { ResManager } from '../../Framework/Scripts/Managers/ResManager';
import { Debug } from '../../Framework/Scripts/Managers/Debug';
import { EventManager } from '../../Framework/Scripts/Managers/EventManager';
import { TimerManager } from '../../Framework/Scripts/Managers/TimerManager';
import { HttpUtils } from '../../Framework/Scripts/Utils/HttpUtils';
import { SoundManager } from '../../Framework/Scripts/Managers/SoundManager';
import { ExcelManager } from '../../Framework/Scripts/Managers/ExcelManager';
import { PoolManager } from '../../Framework/Scripts/Managers/PoolManager';
import { WsNetMgr } from '../../Framework/Scripts/Managers/WsNetMgr';

import { PushDownGoods } from "pb";
import { ProtoBufUtils } from './Utils/ProtobufUtils';
import { UIManager } from '../../Framework/Scripts/Managers/UIManager';


export class GameApp extends Component {
    public static Instance: GameApp = null;

    protected onLoad(): void {
        if(GameApp.Instance !== null) {
            this.destroy();
            return;
        }

        GameApp.Instance = this;
    }

    public Init(): void {

    }

    public demo(){
        SceneManager.Instance.IE_RunScene("demo");
    }

    public async EnterGame() {
        console.log("EnterGame #######");
        // 由其它开发者来接管整个游戏项目的代码编写;
        // SceneManager.Instance.EnterScene("main"); // 如果你把场景当作是ab包的，那么加载不到;
        SceneManager.Instance.IE_RunScene("main");
        // UIManager的测试
        UIManager.Instance.IE_ShowUIView("UIGame");
        TimerManager.Instance.ScheduleOnce(()=>{
            UIManager.Instance.DestroyUIView("UIGame");
        }, this, 5);
        // end

        /*
        // 测试加载全部的ab包资源
        await ResManager.Instance.IE_LoadBundleAndAllAssets("Datas", TextAsset);
        var textData: TextAsset = await ResManager.Instance.IE_GetAsset("Datas", "fruit", TextAsset) as any;
        console.log(textData.text);
        // 写一些框架的测试代码，方便代码使用常用的一些模块
        // end
        */

        /*
        // 测试debug窗口
        Debug.Log("helloword", "1");
        Debug.Log("helloword 2");
        Debug.Log("helloword 3");
        // end
        */

        /*
        // 测试事件订阅与发布
        EventManager.Instance.AddEventListener("GotHead", this.OnGotHead, this);
        EventManager.Instance.AddEventListener("GotHead", this.OnGotHead2, this);

        EventManager.Instance.Emit("GotHead", "123456");

        this.scheduleOnce(()=>{
            EventManager.Instance.RemoveEventListener("GotHead", this.OnGotHead, this);
            EventManager.Instance.Emit("GotHead", "789JQK");
        }, 5)
        // end
        */
        /*
        TimerManager.Instance.ScheduleOnce(this.OnTimerOnce, this, 1);
        
        var timerId: number = TimerManager.Instance.ScheduleWithParam(this.OnTimerRepeat, this, "hello", -1, 1.0, 5);

        TimerManager.Instance.ScheduleOnceWithParam(this.OnRemoveTimer, this, timerId, 10);
        */

        /*
        // http网络模块处理
        console.log("http begin");
        HttpUtils.Get("https://www.baidu.com/", null, (err, data)=>{
            console.log("http end");

            if(err) {
                console.log(err);
            }
            else {
                console.log(data);
            }
        })
        */

        // 声音管理模块的测试
        /*
        SoundManager.Instance.PlayMusic("background");
        TimerManager.Instance.ScheduleOnce(()=>{
            SoundManager.Instance.SetMusicMute(true);
        }, this, 5);
        // end
        */
        
        /*
        // 测试表格
        var textAsset = await ResManager.Instance.IE_GetAsset("Datas", "fruit", TextAsset);
        ExcelManager.Instance.AddTable("fruit", (textAsset as TextAsset).text);
        console.log(ExcelManager.Instance.GetTableArr("fruit"));
        var item = ExcelManager.Instance.QueryOne("fruit", "ID", 1003);
        console.log(item);
        // end
        */

        /*
        // 测试节点池
        await PoolManager.Instance.AddNodePool("Charactors", "Player", 10);
        var player: Node = await PoolManager.Instance.GetNodeInPool("Charactors", "Player") as Node;
        player.setParent(find("PlayrRoot"));

        TimerManager.Instance.ScheduleOnce(()=>{
            PoolManager.Instance.PutNodeInPool("Charactors", "Player", player);
        }, this, 10);

        TimerManager.Instance.ScheduleOnce(async ()=>{
            player = await PoolManager.Instance.GetNodeInPool("Charactors", "Player") as Node;
            player.setParent(find("PlayrRoot"))
            PoolManager.Instance.DebugNodePoolInfo("Charactors", "Player");
        }, this, 15)
        // end
        */
        /*
        EventManager.Instance.AddEventListener(WsNetMgr.WSConnectingEvent, ()=>{
            console.log("Conecting!!!");
        }, this);

        EventManager.Instance.AddEventListener(WsNetMgr.WSConnectedEvent, ()=>{
            console.log("WSConnectedEvent!!!");
        }, this);

        // 测试websocket
        WsNetMgr.Instance.ConnectToServer();
        */
        
        // end

        /*
        // protobuf测试
        var obj: PushDownGoods = PushDownGoods.create(); 
        obj.goodsId = 10001;
        obj.goodsNum = 20002;
        obj.type = 2000;

        var objectBytes = PushDownGoods.encode(obj).finish();
        console.log(objectBytes);
        var newObj: PushDownGoods = PushDownGoods.decode(objectBytes);
        console.log(newObj);
        // end
        */
        /*
        // Protobuf封装的测试
        ProtoBufUtils.InitPbToNameMap();
        objectBytes = ProtoBufUtils.PbEncode(obj);
        console.log(objectBytes);

        newObj = (ProtoBufUtils.PbDecode<PushDownGoods>("PushDownGoods", objectBytes));
        console.log(newObj);

        newObj = (ProtoBufUtils.PbDecodeWithType(PushDownGoods, objectBytes));
        console.log(newObj);
        // end
        */

        
        // end
    }
    
    private OnRemoveTimer(udata: any): void {
        var tiemrId: number = udata;
        TimerManager.Instance.UnSchedule(tiemrId);
        console.log("OnRemoveTimer", tiemrId);
    }

    private OnTimerOnce(udata: any): void {
        console.log("OnTimerRepeat", udata);
    }

    private OnTimerRepeat(udata: any): void {
        console.log("OnTimerRepeat", udata);
    }

    private OnGotHead(uname: string, udata: any): void {
        console.log("OnGotHead 1", uname, udata, this);
    }

    private OnGotHead2(uname: string, udata: any): void {
        console.log("OnGotHead 2", uname, udata, this);
    }
}


