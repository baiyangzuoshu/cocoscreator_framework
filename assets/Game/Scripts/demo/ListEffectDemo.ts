import UIBase from "../../../Framework/Scripts/UI/UIBase";
import UIWindow from "../../../Framework/Scripts/UI/UIWindow";
import * as fgui from "fairygui-cc";
import MailItem from "./MailItem"

export default class ListEffectDemo extends UIBase {
    private _list: fgui.GList = null!;

    onLoad() {
        this.loadMainGUI("ListEffect", "Main");
        this.setGUISize(fgui.GRoot.inst.width, fgui.GRoot.inst.height)
        
        fgui.UIObjectFactory.setExtension("ui://ListEffect/mailItem", MailItem);

        this._list = this.getGUIChild("mailList") as fgui.GList;
        for (var i: number = 0; i < 10; i++) {
            var item: MailItem = <MailItem>this._list.addItemFromPool();
            item.setFetched(i % 3 == 0);
            item.setRead(i % 2 == 0);
            item.setTime("5 Nov 2015 16:24:33");
            item.title = "Mail title here";
        }

        this._list.ensureBoundsCorrect();
        var delay: number = 0;
        for (var i: number = 0; i < 10; i++) {
            var item: MailItem = <MailItem>this._list.getChildAt(i);
            if (this._list.isChildInView(item)) {
                item.playEffect(delay);
                delay += 0.2;
            }
            else
                break;
        }
    }
}
