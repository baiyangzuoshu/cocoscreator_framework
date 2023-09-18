import { Component, Node } from 'cc';
import { Debug } from './Debug';
import { EventManager } from './EventManager';


enum State {
    Invalid = -1, // 开始没有发起连接的时候
    Disconnected = 0, // 断开连接
    Connecting = 1, // 正在连接
    Connected = 2, // 已经连接;
};

export class WsNetMgr extends Component {
    public static Instance: WsNetMgr = null!;
    public static WSDisconnectEvent: string = "WSDisconnect";
    public static WSConnectingEvent: string = "WSConnecting";
    public static WSConnectedEvent: string = "WSConnected";
    public static WSRecvDataEvent: string = "WSRecvDataEvent";

    private state: State = State.Invalid;
    private url: string = "ws://127.0.0.1:6081/ws"; // 服务器的连接地址
    private socket: WebSocket = null;

    protected onLoad(): void {
        if(WsNetMgr.Instance !== null) {
            this.destroy();
            return;
        }

        WsNetMgr.Instance = this;
    }

    public Init(): void {
        this.state = State.Invalid;
        this.socket = null;
    }

    public SendData(cmdBuf: any): void { // 注意，最好转成arrayBuffer
        if(this.state === State.Connected) {
            this.socket.send(cmdBuf);
        }
    }

    public ConnectToServer(url: string = null): void {
        if(this.state !== State.Disconnected && this.state !== State.Invalid) {
            return;
        }

        if(url) {
            this.url = url;
        }
        
        this.state = State.Connecting; // 正在连接
        EventManager.Instance.Emit(WsNetMgr.WSConnectingEvent, this.url);

        // console.log(this.url);
        this.socket =  new WebSocket(this.url);
        this.socket.binaryType = "arraybuffer"; // blob, 二进制; 

        this.socket.onopen = this.OnWebSocketOpened.bind(this);
        this.socket.onmessage = this.OnRecvDataCmd.bind(this);
        this.socket.onclose = this.OnWebSokcetClosed.bind(this);
        this.socket.onerror = this.OnWebSocketError.bind(this);
    }

    private CloseSocket(): void {
        if (this.state === State.Connected) {
            if (this.socket !== null) {
                this.socket.close();
                this.socket = null;
            }

            EventManager.Instance.Emit(WsNetMgr.WSDisconnectEvent, this.url);
        }
        
        this.state = State.Disconnected;

    }

    private OnWebSocketError(): void {
        this.CloseSocket();
    }

    private OnWebSocketOpened(): void {
        this.state = State.Connected; // 连接成功
        Debug.Log("OnConnected Success !!!");
        EventManager.Instance.Emit(WsNetMgr.WSConnectedEvent, this.url);
    }

    private OnWebSokcetClosed(): void {
        this.CloseSocket();
    }

    private OnRecvDataCmd(event: any): void {
        var cmdBody = event.data;
        // Debug.Log(cmdBody);
        EventManager.Instance.Emit(WsNetMgr.WSRecvDataEvent, cmdBody);
    }

    protected update(dt: number): void {
        if(this.state === State.Invalid) {
            return;
        }

        if(this.state === State.Disconnected) {
            this.ConnectToServer();
        }
    }
}


