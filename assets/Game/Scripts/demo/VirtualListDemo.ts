import UIBase from "../../../Framework/Scripts/UI/UIBase";
import UIWindow from "../../../Framework/Scripts/UI/UIWindow";
import * as fgui from "fairygui-cc";
import MailItem from "./MailItem"

export default class VirtualListDemo extends UIBase {
    private _list: fgui.GList = null!;

    onLoad() {
        this.loadMainGUI("VirtualList", "Main");
        this.guiMakeFullScreen();

        fgui.UIObjectFactory.setExtension("ui://VirtualList/mailItem", MailItem);

        this.getGUIChild("n6").onClick(() => { this._list.addSelection(500, true); });
        this.getGUIChild("n7").onClick(() => { this._list.scrollPane.scrollTop(); });
        this.getGUIChild("n8").onClick(() => { this._list.scrollPane.scrollBottom(); });

        this._list = this.getGUIChild("mailList") as fgui.GList;
        this._list.setVirtual();

        this._list.itemRenderer = this.renderListItem.bind(this);
        this._list.numItems = 1000;
    }

    private renderListItem(index: number, item: MailItem): void {
        item.setFetched(index % 3 == 0);
        item.setRead(index % 2 == 0);
        item.setTime("5 Nov 2015 16:24:33");
        item.title = index + " Mail title here";
    }
}

