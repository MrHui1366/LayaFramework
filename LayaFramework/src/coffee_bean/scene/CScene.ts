import CLOG from "../utils/CLOG";
import Scene = Laya.Scene;
import CSceneBase from "./CSceneBase";
import CSceneAnim from "./CSceneAnim";

/**
 * 新场景进入方式
 */
export enum ESceneEnterFunc {
    /**
     * 从上方进入
     */
    ENTER_FROM_UP = 1,
    /**
     * 从下方进入
     */
    ENTER_FROM_DOWN = 2,
    /**
     * 从左方进入
     */
    ENTER_FROM_LEFT = 4,
    /**
     * 从右方进入
     */
    ENTER_FROM_RIGHT = 8,
    /**
     * 放大进入
     */
    ENTER_TO_BIG = 16,
    /**
     * 缩小进入
     */
    ENTER_TO_SMALL = 32,
    /**
     * 淡入
     */
    FADE_IN = 64
}

/**
 * 旧场景退出方式
 */
export enum ESceneExitFunc {
    /**
     * 退出到下方
     */
    EXIT_TO_DOWN = 1,
    /**
     * 退出到上方
     */
    EXIT_TO_UP = 2,
    /**
     * 退出到右边
     */
    EXIT_TO_RIGHT = 4,
    /**
     * 退出到左边
     */
    EXIT_TO_LEFT = 8,
    /**
     * 放大退出
     */
    EXIT_TO_BIG = 16,
    /**
     * 缩小退出
     */
    EXIT_TO_SMALL = 32,
    /**
     * 淡出
     */
    FADE_OUT = 64
}

/**
 * 场景节点信息
 */
export interface SceneRoot {
    /**
     * 场景对象
     */
    sceneRoot: CSceneBase;
    /**
     * UI根节点
     */
    uiRoot: Laya.Sprite;
}

/**
 * 场景管理器
 * 封装Laya的场景加载操作
 * 
 * 要点：
 *     同一时刻只会出现一个场景！！
 *     loadScene
 */
export default class CScene {
    /**
     * 当前激活场景
     */
    private static _nowScene: SceneRoot;

    /**
     * 当前激活场景
     */
    public static get nowScene(): SceneRoot {
        return this._nowScene;
    }

    /**
     * 记录新场景
     */
    public static recordNewScene( closeOther: boolean, newScene: SceneRoot ): void {
        // 防止重复设置
        if ( this._nowScene && this._nowScene.sceneRoot == newScene.sceneRoot ) {
            return;
        }

        // 设置新场景时，前一个场景必须销毁
        if ( closeOther && this._nowScene != null ) {
            this._nowScene.sceneRoot.destroy();
            this._nowScene = null;
        }

        this._nowScene = newScene;
    }

    /**
     * 打开一个场景
     * @param targetSceneClass 要打开的场景类
     * 
     * 示例
     *     let scene = CScene.openScene( SC_Main );
     */
    public static openScene<T extends CSceneBase>( targetSceneClass: { new(): T } & typeof CSceneBase ): T {
        return targetSceneClass.createScene();
    }

    /**
     * 切换场景
     * 支持动画
     * @param targetSceneClass 要切换的场景类
     * @param enterFunc 进入方式 支持多种方式混合 例如  ESceneEnterFunc.ENTER_FROM_LEFT | ESceneEnterFunc.ENTER_FROM_UP
     * @param exitFunc 退出方式 支持多种方式混合 例如  ESceneExitFunc.EXIT_TO_RIGHT | ESceneExitFunc.EXIT_TO_DOWN
     * @param time 动画时长
     */
    public static switchScene<T extends CSceneBase>( targetSceneClass: { new(): T } & typeof CSceneBase, enterFunc: number, exitFunc: number, time: number ): T {
        let nowScene = this._nowScene.sceneRoot;
        return nowScene.switchScene( targetSceneClass, enterFunc, exitFunc, time );
    }
}