import UIBase from "../../../Framework/Scripts/UI/UIBase";
import UIWindow from "../../../Framework/Scripts/UI/UIWindow";
import * as fgui from "fairygui-cc";
import BagDemo from "./BagDemo";
import BasicDemo from "./BasicsDemo";
import ChatDemo from "./ChatDemo";
import CooldownDemo from "./CooldownDemo";
import GuideDemo from "./GuideDemo";
import HitTestDemo from "./HitTestDemo";
import JoystickDemo from "./JoystickDemo";
import ListEffectDemo from "./ListEffectDemo";
import LoopListDemo from "./LoopListDemo";
import ModalWaitingDemo from "./ModalWaitingDemo";
import PullToRefreshDemo from "./PullToRefreshDemo";
import ScrollPaneDemo from "./ScrollPaneDemo";
import TransitionDemo from "./TransitionDemo";
import TreeViewDemo from "./TreeViewDemo";
import VirtualListDemo from "./VirtualListDemo";
import { Component } from "cc";

export default class MainMenu extends UIBase {

    onLoad() {
        this.loadMainGUI("MainMenu","Main");
        this.guiMakeFullScreen();

        this.buttonAddClickEvent("n1",() => {
            this.startDemo(BasicDemo);
        },this);
        this.buttonAddClickEvent("n2",() => {
            this.startDemo(TransitionDemo);
        },this);
        this.buttonAddClickEvent("n4",() => {
            this.startDemo(VirtualListDemo);
        },this);
        this.buttonAddClickEvent("n5",() => {
            this.startDemo(LoopListDemo);
        },this);
        this.buttonAddClickEvent("n6",() => {
            this.startDemo(HitTestDemo);
        },this);
        this.buttonAddClickEvent("n7",() => {
            this.startDemo(PullToRefreshDemo);
        },this);
        this.buttonAddClickEvent("n8",() => {
            this.startDemo(ModalWaitingDemo);
        },this);
        this.buttonAddClickEvent("n9",() => {
            this.startDemo(JoystickDemo);
        },this);
        this.buttonAddClickEvent("n10",() => {
            this.startDemo(BagDemo);
        },this);
        this.buttonAddClickEvent("n11",() => {
            this.startDemo(ChatDemo);
        },this);
        this.buttonAddClickEvent("n12",() => {
            this.startDemo(ListEffectDemo);
        },this);
        this.buttonAddClickEvent("n13",() => {
            this.startDemo(ScrollPaneDemo);
        },this);
        this.buttonAddClickEvent("n14",() => {
            this.startDemo(TreeViewDemo);
        },this);
        this.buttonAddClickEvent("n15",() => {
            this.startDemo(GuideDemo);
        },this);
        this.buttonAddClickEvent("n16",() => {
            this.startDemo(CooldownDemo);
        },this);
    }

    startDemo(demoClass: typeof Component): void {
        let demo: Component = this.addComponent(demoClass)!;
        this.node.emit("start_demo", demo);
        this.destroy();
    }

}