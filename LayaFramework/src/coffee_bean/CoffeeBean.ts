import { loadExpands } from "./expand/CExpands";
import CLOG from "./utils/CLOG";
import { UIInit } from "../ui/layaMaxUI";

/**
 * 框架类
 * 游戏通过调用 CoffeeBean.init(); 来初始化框架
 */

export default class CoffeeBean {
    private static hasInit: boolean = false;

    /**
     * 框架初始化
     */
    public static init(): void {
        // 激活LOG系统
        CLOG.enable();

        // 激活控制台
        var vConsole = new VConsole();
        CLOG.I( 'vConsole inited!!!' );

        // 加载扩展代码
        loadExpands();
        CLOG.I( 'Load expand function implementation !!!' );

        // 载入UI类
        UIInit();
    }
}