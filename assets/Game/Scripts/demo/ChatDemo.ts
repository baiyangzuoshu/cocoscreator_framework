import UIBase from "../../../Framework/Scripts/UI/UIBase";
import UIWindow from "../../../Framework/Scripts/UI/UIWindow";
import * as fgui from "fairygui-cc";
import EmojiParser from "./EmojiParser";

class Message {
    public sender: string | null = null;
    public senderIcon: string | null = null;
    public msg: string | null = null;
    public fromMe: boolean = false;
}


export default class ChatDemo extends UIBase {
    private _list: fgui.GList = null!;
    private _input: fgui.GTextInput = null!;
    private _emojiSelectUI: fgui.GComponent = null!;
    private _emojiParser: EmojiParser;
    private _messages: Array<Message>;

    constructor() {
        super();

        this._messages = new Array<Message>();
        this._emojiParser = new EmojiParser();
    }

    onLoad() {
        this.loadMainGUI("Chat","Main");
        this.guiMakeFullScreen();

        this._list = this.getGUIChild("list") as fgui.GList;
        this._list.setVirtual();
        this._list.itemProvider = this.getListItemResource.bind(this);
        this._list.itemRenderer = this.renderListItem.bind(this);

        this._input = this.getGUIChild("input1") as fgui.GTextInput;
        this._input.on(fgui.Event.Submit, this.onSubmit, this);

        this.buttonAddClickEvent("btnSend1",this.onClickSendBtn, this)
        this.buttonAddClickEvent("btnEmoji1",this.onClickEmojiBtn, this)

        this._emojiSelectUI = this.createGUIObject("EmojiSelectUI").asCom;
        this._emojiSelectUI.getChild("list").on(fgui.Event.CLICK_ITEM, this.onClickEmoji, this);
    }

    private addMsg(sender: string, senderIcon: string, msg: string, fromMe: boolean) {
        let isScrollBottom: boolean = this._list.scrollPane.isBottomMost;

        let newMessage = new Message();
        newMessage.sender = sender;
        newMessage.senderIcon = senderIcon;
        newMessage.msg = msg;
        newMessage.fromMe = fromMe;
        this._messages.push(newMessage);

        if (newMessage.fromMe) {
            if (this._messages.length == 1 || Math.random() < 0.5) {
                let replyMessage = new Message();
                replyMessage.sender = "FairyGUI";
                replyMessage.senderIcon = "r1";
                replyMessage.msg = "Today is a good day. [:gz]";
                replyMessage.fromMe = false;
                this._messages.push(replyMessage);
            }
        }

        if (this._messages.length > 100)
            this._messages.splice(0, this._messages.length - 100);

        this._list.numItems = this._messages.length;

        if (isScrollBottom)
            this._list.scrollPane.scrollBottom();
    }

    private getListItemResource(index: number): string {
        let msg = this._messages[index];
        if (msg.fromMe)
            return "ui://Chat/chatRight";
        else
            return "ui://Chat/chatLeft";
    }

    private renderListItem(index: number, item: fgui.GButton): void {
        let msg = this._messages[index];
        if (!msg.fromMe)
            item.getChild("name").text = msg.sender;
        let path=this.getGUIItemURL(msg.senderIcon!);
        console.log(msg.senderIcon!,path)
        item.icon = this.getGUIItemURL(msg.senderIcon!);
        item.getChild("msg").text = this._emojiParser.parse(msg.msg!);
    }

    private onClickSendBtn() {
        let msg = this._input.text;
        if (!msg)
            return;

        this.addMsg("Creator", "r0", msg, true);
        this._input.text = "";
    }

    private onClickEmojiBtn(evt: fgui.Event) {
        fgui.GRoot.inst.showPopup(this._emojiSelectUI, evt.initiator, false);
    }

    private onClickEmoji(item: fgui.GObject) {
        this._input.text += "[:" + item.text + "]";
    }

    private onSubmit() {
        this.onClickSendBtn();
    }
}
