import { _decorator, color, Color, Component, Material, MeshRenderer, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Opacity3D')
export class Opacity3D extends Component {
    @property
    private alpha: number = 255; // 【0, 255】
    @property
    isSharedMode: boolean = false;

    private matInstance: Material = null!; // 3D物体的材质;
    private mainColor: Color = null;

    public get Alpha(): number {
        return this.alpha;
    }

    public set Alpha(alpha: number) {
        this.alpha = alpha;
        this.mainColor.a = this.alpha;
        this.matInstance.setProperty("mainColor", this.mainColor);
    }

    protected onLoad(): void {
        // 初始化材质对象
        var mr = this.node.getComponent(MeshRenderer);
        var mat = mr.sharedMaterial;
        // end

        this.matInstance = mat;
        if(this.isSharedMode === false) {
            this.matInstance = new Material();
            this.matInstance.copy(mat);
            mr.setMaterial(this.matInstance, 0);
        }

        // 初始化我们的mainColor;
        // 注意：这里有个坑, 如果你从来没有修改过这个mainColor,虽然有白色，但是获取不到的;
        this.mainColor = this.matInstance.getProperty("mainColor") as Color;
        // console.log(this.mainColor);
        if(this.mainColor === null) {
            // 注意：[0~1]， 【0， 255】
            this.mainColor = color(255, 255, 255, 255);
            
        }

        this.alpha = (this.alpha < 0) ? 0 : this.alpha;
        this.alpha = (this.alpha >= 255) ? 255 : this.alpha;

        this.mainColor.a = this.alpha;
        this.matInstance.setProperty("mainColor", this.mainColor);
    }
}


