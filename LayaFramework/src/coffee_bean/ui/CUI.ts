import CRes, { ResInfo } from "../core/CRes";
/**
 * UI框架
 * 负责UI的缓存
 */
export default class CUI{
    /**
     * 用于缓存的UI清单
     */
    private static uilist:Array<string> = new Array<string>();

    /**
     * 添加一个用于缓存的UI到列表
     * @param url 要缓存的UI
     */
    public static addUIPreloader( url:string ):void{
        if(CUI.uilist.indexOf(url) == -1){
            CUI.uilist.push(url);
        }
    }

    /**
     * 得到要加载的UI清单
     */
    public static getPreloadList():Array<ResInfo>{
        let resAry = new Array<ResInfo>();
        for (let i = 0; i < CUI.uilist.length; i++) {
            resAry.push({ url: CUI.uilist[i], type: Laya.Loader.JSON });    
        }
        return resAry;
    }
}