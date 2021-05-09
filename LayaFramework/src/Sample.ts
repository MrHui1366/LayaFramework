import CRes, { ResInfo } from "./coffee_bean/core/CRes";
import { DT_Sample } from "./JSONClass/DT_Sample";
import CLOG from "./coffee_bean/utils/CLOG";
import SC_Main from "./scene/SC_Main";
import CTime from "./coffee_bean/utils/CTime";
import SC_Game from "./scene/SC_Game";
import { ui } from "./ui/layaMaxUI";
import CWaitingView from "./coffee_bean/ui/CWaitingView";
import CScene, { ESceneEnterFunc, ESceneExitFunc } from "./coffee_bean/scene/CScene";

export default class Sample {
    /**
     * 开始示例
     */
    public static start(): void {
        // this.sampleCRes();
        // this.sampleScene1();
        // this.sampleScene2();
        // this.sampleEffectAnimation();
        this.sampleUI();
    }
    /**
     * 资源示例
     */
    public static async sampleCRes(): Promise<void> {
        // 同步加载JSON 由于已经缓存过，因此返回其对象
        let data = CRes.loadJSON<DT_Sample>( "data/json/DT_Sample.json" );

        // 异步加载JSON，若没有缓存过，则会先加载数据并缓存，数据加载完毕再返回
        data = await CRes.loadJSONAsync<DT_Sample>( "data/json/DT_Sample.json" );

        // 立即加载，由于并未缓存过，因此返回null
        let img = CRes.loadImage( "img/btn_buy.png" );

        // 异步加载，若没有缓存，则会先加载数据，数据加载完毕再返回
        // 注意，加载散图时会自动将图集中所有散图一起加载
        img = await CRes.loadImageAsync( "img/btn_buy.png" );

        // 创建精灵的方式
        let sp = new Laya.Sprite();
        Laya.stage.addChild( sp );
        sp.pos( 100, 100 );
        sp.texture = img;

        // 传统Sprite创建方式，包含了自动缓存的过程
        let sp2 = Laya.Sprite.fromImage( "img/btn_close_off.png" );
        Laya.stage.addChild( sp2 );
        sp2.pos( 200, 100 );
    }

    /**
     * 本函数演示场景切换效果
     */
    public static async sampleScene1(): Promise<void> {

        // 创建主场景
        let main = SC_Main.createScene();
        // 创建测试UI 到主场景
        let UI = ui.TestVewUI.createUI();

        await CTime.waitTime( 3000 );

        // 创建游戏场景，关闭主场景
        let game = CScene.openScene( SC_Game );
        game.bgColor = "ff0000";

        // 创建弹出框
        let UI2 = ui.PopUpUI.createUI();
    }

    /**
     * 本函数演示场景动画切换效果
     */
    private static async sampleScene2(): Promise<void> {

        // 创建主场景
        let main = SC_Main.createScene();
        // 创建测试UI 到主场景
        let UI = ui.TestVewUI.createUI();

        await CTime.waitTime( 3000 );

        // 主场景切换到游戏场景
        let newScene: SC_Game = main.switchScene(
            SC_Game,       // 切换目标场景类
            ESceneEnterFunc.ENTER_FROM_LEFT | ESceneEnterFunc.ENTER_TO_BIG,  // 进入动画方式
            ESceneExitFunc.EXIT_TO_SMALL | ESceneExitFunc.FADE_OUT,          // 退出动画方式
            2000           // 动画时长
        );

        // 设置新场景的背景色
        newScene.bgColor = "#5500aa";

        // 这种方法与上面的效果一致
        // let newScene:SC_Game = CScene.switchScene(
        //     SC_Game,       // 切换目标场景类
        //     ESceneEnterFunc.ENTER_FROM_LEFT | ESceneEnterFunc.ENTER_TO_BIG,  // 进入动画方式
        //     ESceneExitFunc.EXIT_TO_SMALL | ESceneExitFunc.FADE_OUT,          // 退出动画方式
        //     2000           // 动画时长
        // );

        await CTime.waitTime( 3000 );

        // 创建弹出框到 SC_Game
        let UI2 = ui.PopUpUI.createUI();
    }

    /**
     * 动效示例
     */
    private static sampleEffectAnimation(): void {
        let main = SC_Main.createScene();

        let sp = Laya.Sprite.fromImage( "img/btn_help.png" );
        sp.pos( Laya.stage.width / 2, 400 );
        main.addChild( sp );

        sp.runEffectAnimation( ui.anim.EffectUI, false );
    }

    /**
     * UI示例
     */
    private static sampleUI(): void {

        // 创建主场景
        let main = SC_Main.createScene();
        // 创建测试UI 到主场景
        let UI = ui.TestVewUI.createUI();

        UI.OKButton.on( Laya.Event.CLICK, null, () => {
            console.log( "点了按钮" );
        } );
    }
}