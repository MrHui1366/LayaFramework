import CLOG from "../utils/CLOG";
import CScene, { SceneRoot } from "./CScene";
import CSceneAnim from "./CSceneAnim";


/**
 * 场景基类
 * 所有场景均继承自本类
 */
export default class CSceneBase extends Laya.Scene {

    /**
     * 场景实例引用
     */
    private static _sinst;

    /**
     * 背景色
     */
    private _bgColor: string = "#000000";
    /**
     * 背景色
     */
    public get bgColor(): string {
        return this._bgColor;
    }
    /**
         * 背景色
         */
    public set bgColor( value: string ) {
        this._bgColor = value;
        let bg: Laya.Box = this.getChildByName( "bgColor" ) as Laya.Box;
        if ( !bg ) {
            bg = this.addBGBox();
        }

        bg.bgColor = value;
    }
    /**
     * 获得场景实例
     */
    public static getInstance<T extends CSceneBase>( this: { new(): T; } & typeof CSceneBase ): T {
        return this._sinst as T;
    }

    /**
     * 创建场景
     */
    private static create<T extends CSceneBase>( this: { new(): T; } & typeof CSceneBase ): T {
        let scene = new this();
        scene.name = this.name;
        scene.pivot( Laya.stage.width / 2, Laya.stage.height / 2 );
        scene.size( Laya.stage.width, Laya.stage.height );
        scene.pos( Laya.stage.width / 2, Laya.stage.height / 2 );
        return scene;
    }

    /**
     * 创建场景并打开
     *  打开一个新场景，会导致前一个场景被销毁
     */
    public static createScene<T extends CSceneBase>( this: { new(): T; } & typeof CSceneBase ): T {
        if ( this._sinst == null ) {
            this._sinst = this.create();
            let uiNode = this._sinst.createUIRoot();
            this._sinst.open( false );
            CScene.recordNewScene( true, { uiRoot: uiNode, sceneRoot: this._sinst } );
        }

        return this._sinst;
    }

    /**
     * 添加背景色盒子
     */
    private addBGBox(): Laya.Box {
        let box = new Laya.Box();
        box.setFullScreen();
        box.name = "bgColor";
        box.zOrder = -1;
        this.addChild( box );
        return box;
    }

    /**
     * 创建当前场景 UI 根节点
     */
    private createUIRoot(): Laya.Sprite {
        let UINode = new Laya.Sprite();
        UINode.name = "UIRoot";
        UINode.pivot( 0, 0 );
        UINode.size( Laya.stage.width, Laya.stage.height );
        UINode.zOrder = 99999999;
        this.addChild( UINode );

        return UINode;
    }

    /**
     * 切换场景
     * 支持动画
     * @param targetSceneClass 要切换的场景类
     * @param enterFunc 进入方式 支持多种方式混合 例如  ESceneEnterFunc.ENTER_FROM_LEFT | ESceneEnterFunc.ENTER_FROM_UP
     * @param exitFunc 退出方式 支持多种方式混合 例如  ESceneExitFunc.EXIT_TO_RIGHT | ESceneExitFunc.EXIT_TO_DOWN
     * @param time 动画时长
     */
    public switchScene<T extends CSceneBase>( targetSceneClass: { new(): T } & typeof CSceneBase, enterFunc: number, exitFunc: number, time: number ): T {
        let newScene = targetSceneClass.create();
        let uiNode = newScene.createUIRoot();
        CScene.recordNewScene( false, { uiRoot: uiNode, sceneRoot: newScene } );
        newScene.open( false );

        CSceneAnim.runAnim( this, <CSceneBase> newScene, enterFunc, exitFunc, time );
        return newScene;
    }

    /**
     * 激活每帧更新
     */
    public activeUpdate(): void {
        this.timer.frameLoop( 1, this, this.update );
    }

    /**
     * 禁用每帧更新
     */
    public disableUpdate(): void {
        this.timer.clear( this, this.update );
    }

    /**
     * 打开场景后
     */
    public onOpened( param: any ): void {
        super.onOpened( param );
        CLOG.I( "## Scene ## {0} open", this.name );
    }

    /**
     * 关闭场景后
     */
    public onClosed( type?: string ): void {
        super.onClosed( type );
        CLOG.I( "## Scene ## {0} will close", this.name );
    }

    /**
     * 每帧执行
     */
    public update(): void {
        CLOG.E( "请在子类中实现具体逻辑" );
    }
}