import CSceneBase from "./CSceneBase";
import CScene, { ESceneEnterFunc, ESceneExitFunc } from "./CScene";

/**
 * 动画可变属性
 */
interface AnimProp{
    x:number;
    y:number;
    scaleX:number;
    scaleY:number;
    alpha:number;
}

/**
 * 场景进入退出动画
 */
export default class CSceneAnim{
    /**
     * 
     * @param oldScene 旧场景
     * @param newScene 新场景
     * @param enterExitFunc 进入退出方法
     * @param time 动画时长
     */
    public static runAnim( oldScene:CSceneBase , newScene:CSceneBase , enterFunc:number, exitFunc:number ,time:number):void{
        this.runEnterAnimOnTarget(newScene,enterFunc,time);
        this.runExitAnimOnTarget(oldScene,exitFunc,time);
    }

    /**
     * 给目标播放进入动画
     * @param target 目标
     * @param AnimFunc 进入动画 
     */
    private static runEnterAnimOnTarget( target:CSceneBase, AnimFunc:number , time:number ){
        let prop:AnimProp = {
            x:Laya.stage.width/2,
            y:Laya.stage.height/2,
            scaleX:1,
            scaleY:1,
            alpha:1
        };

        if( (AnimFunc & ESceneEnterFunc.ENTER_FROM_UP) == ESceneEnterFunc.ENTER_FROM_UP){
            target.y -= Laya.stage.height;
        }
        
        if( (AnimFunc & ESceneEnterFunc.ENTER_FROM_DOWN) == ESceneEnterFunc.ENTER_FROM_DOWN){
            target.y += Laya.stage.height;
        }

        if( (AnimFunc & ESceneEnterFunc.ENTER_FROM_LEFT) == ESceneEnterFunc.ENTER_FROM_LEFT){
            target.x -= Laya.stage.width;
        }

        if( (AnimFunc & ESceneEnterFunc.ENTER_FROM_RIGHT) == ESceneEnterFunc.ENTER_FROM_RIGHT){
            target.x += Laya.stage.width;
        }

        if( (AnimFunc & ESceneEnterFunc.ENTER_TO_BIG) == ESceneEnterFunc.ENTER_TO_BIG){
            target.scaleX = 0;
            target.scaleY = 0;
        }

        if( (AnimFunc & ESceneEnterFunc.ENTER_TO_SMALL) == ESceneEnterFunc.ENTER_TO_SMALL){
            target.scaleX = 2;
            target.scaleY = 2;
        }

        if( (AnimFunc & ESceneEnterFunc.FADE_IN) == ESceneEnterFunc.FADE_IN){
            target.alpha = 0;
        }
        
        Laya.Tween.to(target,prop,time);
    }  

    /**
     * 给目标播放退出动画
     * @param target 目标
     * @param AnimFunc 进入动画 
     */
    private static runExitAnimOnTarget( target:CSceneBase, AnimFunc:number ,time:number){
        let prop:AnimProp = {
            x:target.x,
            y:target.y,
            scaleX:target.scaleX,
            scaleY:target.scaleY,
            alpha:target.alpha
        };

        if( (AnimFunc & ESceneExitFunc.EXIT_TO_DOWN) == ESceneExitFunc.EXIT_TO_DOWN){
            prop.y += Laya.stage.height;
        }

        if( (AnimFunc & ESceneExitFunc.EXIT_TO_UP) == ESceneExitFunc.EXIT_TO_UP){
            prop.y -= Laya.stage.height;
        }

        if( (AnimFunc & ESceneExitFunc.EXIT_TO_RIGHT) == ESceneExitFunc.EXIT_TO_RIGHT){
            prop.x += Laya.stage.width;
        }
       
        if( (AnimFunc & ESceneExitFunc.EXIT_TO_LEFT) == ESceneExitFunc.EXIT_TO_LEFT){
            prop.x -= Laya.stage.width;
        }

        if( (AnimFunc & ESceneExitFunc.EXIT_TO_BIG) == ESceneExitFunc.EXIT_TO_BIG){
            prop.scaleX = 2;
            prop.scaleY = 2;
        }

        if( (AnimFunc & ESceneExitFunc.EXIT_TO_SMALL) == ESceneExitFunc.EXIT_TO_SMALL){
            prop.scaleX = 0;
            prop.scaleY = 0;
        }

        if( (AnimFunc & ESceneExitFunc.FADE_OUT) == ESceneExitFunc.FADE_OUT){
            prop.alpha = 0;
        }

        let completeHandler = Laya.Handler.create(null,()=>{target.destroy();});
        Laya.Tween.to(target,prop,time,Laya.Ease.linearNone ,completeHandler);
    }  

}