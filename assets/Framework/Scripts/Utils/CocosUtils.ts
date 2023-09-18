import { profiler } from "cc";

export class CocosUtils {
    public static lerp (targetValue: number, curValue: number, ratio: number = 0.25) {
        let v = curValue;
        if (targetValue > curValue) {
            v = curValue + (targetValue - curValue) * ratio;
        } else if (targetValue < curValue) {
            v = curValue - (curValue - targetValue) * ratio;
        }
        
        return v;
    }
    
    public static clone (sObj: any) {
        if (sObj === null || typeof sObj !== "object") {
            return sObj;
        }

        var s = {};
        if (sObj.constructor === Array) {
            s = [];
        }

        for (var i in sObj) {
            if (sObj.hasOwnProperty(i)) {
                s[i] = this.clone(sObj[i]);
            }
        }

        return s;
    }

    public static ShowStatsInfo(): void {
        profiler.showStats();
    }

    public static HideStatsInfo(): void {
        profiler.hideStats();
        
    }
    
    public static clamp(value, min, max): any {
        if(value < min) {
            return min;
        }
        if(value > max) {
            return max;
        }

        return value;
    }
}


