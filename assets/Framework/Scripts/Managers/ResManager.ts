import { _decorator, Asset, AssetManager, assetManager, AudioClip, Component, Node, SceneAsset, TextAsset } from 'cc';

export class ResManager extends Component {
    public static Instance: ResManager = null!;

    protected onLoad(): void {
        if(ResManager.Instance !== null) {
            this.destroy();
            return;
        }

        ResManager.Instance = this;
    }

    private async IE_LoadBundle(bundleName: string) {
        return new Promise((resolve, reject)=>{
            assetManager.loadBundle(bundleName, (err, bundleData)=>{
                if(err) {
                    console.log(err);
                    reject(null);
                    return;
                }
                else {
                    resolve(bundleData);
                    return;
                }
            })
        });
    }

    public async Init() {
        // 测试代码
        /*assetManager.loadBundle("Scenes", (err, bundle: AssetManager.Bundle)=>{
            if(err) {
                console.log(err);
                return;
            }

            console.log(bundle);
            var infos = bundle.getDirWithPath("", SceneAsset);
        });*/

        // var bundle = await this.IE_LoadBundle("Sounds"); 
        // console.log(bundle);

        // var textData: TextAsset = await this.IE_GetAsset("Datas", "fragment", TextAsset) as any; 
        // console.log(textData.text);
    }

    private async IE_LoadAllAssetsInBundle(bundle: AssetManager.Bundle, assetType) {
        return new Promise((resolve, reject)=>{
            bundle.loadDir("", assetType as any, (err, infos)=>{
                if(err) {
                    reject(err);
                    return;
                }
                else {
                    resolve(infos);
                }
            });
        });
    }

    private async IE_LoadAssetInBundle(bundle: AssetManager.Bundle, assetName: string, assetType) {
        return new Promise((resolve, reject)=>{
            bundle.load(assetName, assetType, (err, assetData)=>{
                if(err) {
                    reject(err);
                    return;
                }
                else {
                    resolve(assetData);
                }
            });
        });
    }

    private async IE_LoadSceneInBundle(bundle: AssetManager.Bundle, sceneName: string) {
        return new Promise((resolve, reject)=>{
            bundle.loadScene(sceneName, (err, sceneData)=>{
                if(err) {
                    reject(err);
                    return;
                }
                else {
                    resolve(sceneData);
                    return;
                }
            });
        });
    }

    public async IE_LoadBundleAndAllAssets(bundleName: string, assetType) {
        var bundle: AssetManager.Bundle = await this.IE_LoadBundle(bundleName) as AssetManager.Bundle; 
        if(bundle === null) {
            return null;
        }

        await this.IE_LoadAllAssetsInBundle(bundle, assetType);
    }

    public async IE_GetScene(bundleName: string, scenePath: string) {
        var bundle: AssetManager.Bundle = assetManager.getBundle(bundleName);
        
        if(bundle === null) {
            bundle = await this.IE_LoadBundle(bundleName) as any;
            if(bundle === null) {
                // console.log("bundle load err: " + bundleName);
                return;
            }
        }
        
        var sceneData = await this.IE_LoadSceneInBundle(bundle, scenePath) as any;
        return sceneData;
    }

    public TryGetAsset(bundleName: string, assetPath: string) {
        var bundle: AssetManager.Bundle = assetManager.getBundle(bundleName);
        if(bundle === null) {
            return null;
        }

        var assetData = bundle.get(assetPath);
        /*if(!assetData) {
            console.log("null ", assetPath);
        }*/
        return assetData;
    }

    public async IE_GetAsset(bundleName: string, assetPath: string, assetType) {
        var bundle: AssetManager.Bundle = assetManager.getBundle(bundleName);
        if(bundle === null) {
            bundle = await this.IE_LoadBundle(bundleName) as any;
            if(bundle === null) {
                // console.log("bundle load err: " + bundleName);
                return;
            }
        }

        var assetData = bundle.get(assetPath);
        if(assetData) {
            return assetData; // 修改了没有返回资源的bug
        }

        assetData = await this.IE_LoadAssetInBundle(bundle, assetPath, assetType) as any;
        return assetData;
    }

    public ReleaseAsset(assetData: Asset): void {
        assetManager.releaseAsset(assetData);
    }

    public ReleaseAllAssetInBundle(bundleName): void {
        var bundle: AssetManager.Bundle = assetManager.getBundle("bundleName");
        if(bundle === null) {
            return;
        }

        bundle.releaseAll();

        assetManager.removeBundle(bundle);
    }
}


