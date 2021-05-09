import Sample from "./Sample";

/**
 * 游戏类
 */
export default class Game{
    /**
     * 开始游戏
     */
    public static start():void{
        Sample.start();
    }

    /**
     * 点了退出按钮
     */
    public static onClickQuit():void{
        // 退出游戏
        alert("确定退出游戏吗？");
    }
}