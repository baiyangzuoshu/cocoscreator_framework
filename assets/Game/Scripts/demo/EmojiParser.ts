import UIBase from "../../../Framework/Scripts/UI/UIBase";
import UIWindow from "../../../Framework/Scripts/UI/UIWindow";
import * as fgui from "fairygui-cc";

export default class EmojiParser extends fgui.UBBParser {
    private static TAGS: Array<string> = ["88", "am", "bs", "bz", "ch", "cool", "dhq", "dn", "fd", "gz", "han", "hx", "hxiao", "hxiu"];

    public constructor() {
        super();

        EmojiParser.TAGS.forEach(element => {
            this._handlers[":" + element] = this.onTag_Emoji;
        });
    }

    private onTag_Emoji(tagName: string, end: boolean, attr: string): string {
        return "<img src='" + fgui.UIPackage.getItemURL("Chat", tagName.substring(1).toLowerCase()) + "'/>";
    }
}