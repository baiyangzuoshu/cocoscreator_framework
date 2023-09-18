import { _decorator, Component, director, Node } from 'cc';
import { ResManager } from './ResManager';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends Component {
    public static Instance: SceneManager = null;

    protected onLoad(): void {
        if(SceneManager.Instance !== null) {
            this.destroy();
            return;
        }

        SceneManager.Instance = this;
    }

    public Init(): void {

    }
    
    public EnterScene(sceneName: string): void {
        director.loadScene(sceneName);
    }

    public async IE_RunScene(sceneName: string, scenesBundleName: string = "Scenes") {
        var sceneData = await ResManager.Instance.IE_GetScene(scenesBundleName, sceneName) as any;
        director.runSceneImmediate(sceneData);
    }
}


