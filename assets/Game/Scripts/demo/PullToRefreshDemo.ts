import UIBase from "../../../Framework/Scripts/UI/UIBase";
import UIWindow from "../../../Framework/Scripts/UI/UIWindow";
import * as fgui from "fairygui-cc";
import ScrollPaneHeader from "./ScrollPaneHeader"

export default class PullToRefreshDemo extends UIBase {
    private _list1: fgui.GList = null!;
    private _list2: fgui.GList = null!;

    onLoad() {
        fgui.UIObjectFactory.setExtension("ui://PullToRefresh/Header", ScrollPaneHeader);
        this.loadMainGUI("PullToRefresh", "Main")
        this.guiMakeFullScreen()

        this._list1 = this.getGUIChild("list1") as fgui.GList;
        this._list1.itemRenderer = this.renderListItem1.bind(this);
        this._list1.setVirtual();
        this._list1.numItems = 1;
        this._list1.on(fgui.Event.PULL_DOWN_RELEASE, this.onPullDownToRefresh, this);

        this._list2 = this.getGUIChild("list2") as fgui.GList;
        this._list2.itemRenderer = this.renderListItem2.bind(this);
        this._list2.setVirtual();
        this._list2.numItems = 1;
        this._list2.on(fgui.Event.PULL_UP_RELEASE, this.onPullUpToRefresh, this);
    }

    private renderListItem1(index: number, item: fgui.GObject): void {
        item.text = "Item " + (this._list1.numItems - index - 1);
    }

    private renderListItem2(index: number, item: fgui.GObject): void {
        item.text = "Item " + index;
    }

    private onPullDownToRefresh(): void {
        let header: ScrollPaneHeader = <ScrollPaneHeader>(this._list1.scrollPane.header);
        if (header.readyToRefresh) {
            header.setRefreshStatus(2);
            this._list1.scrollPane.lockHeader(header.sourceHeight);

            //Simulate a async resquest
            this.scheduleOnce(this.simulateAsynWorkFinished, 2);
        }
    }

    private onPullUpToRefresh(): void {
        let footer: fgui.GComponent = this._list2.scrollPane.footer.asCom;

        footer.getController("c1").selectedIndex = 1;
        this._list2.scrollPane.lockFooter(footer.sourceHeight);

        //Simulate a async resquest
        this.scheduleOnce(this.simulateAsynWorkFinished2, 2);
    }

    private simulateAsynWorkFinished() {
        this._list1.numItems += 5;

        //Refresh completed
        let header: ScrollPaneHeader = <ScrollPaneHeader>(this._list1.scrollPane.header);
        header.setRefreshStatus(3);
        this._list1.scrollPane.lockHeader(35);

        this.scheduleOnce(this.simulateHintFinished, 2);
    }

    private simulateHintFinished() {
        let header: ScrollPaneHeader = <ScrollPaneHeader>(this._list1.scrollPane.header);
        header.setRefreshStatus(0);
        this._list1.scrollPane.lockHeader(0);
    }

    private simulateAsynWorkFinished2() {
        this._list2.numItems += 5;

        //Refresh completed
        let footer: fgui.GComponent = this._list2.scrollPane.footer.asCom;
        footer.getController("c1").selectedIndex = 0;
        this._list2.scrollPane.lockFooter(0);
    }
}

