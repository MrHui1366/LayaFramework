/**
 * 扩展实现
 * 在libs/expands.d.ts 中注册方法
 * 在这里实现方法
 */

import { UIBase } from "../ui/CUIBase";
import { UIDialog } from "../ui/CUIDialog";
import CLOG from "../utils/CLOG";
import CMD5 from "../utils/CMD5";

/**
 * 加载扩展方法
 * 通过export 和空方法调用
 * 来让编译器把本文件编译进代码
 */
export function loadExpands() {
    // 注册扩展类
    // UI基类
    Laya.ClassUtils.regClass( "UIBase", UIBase );
    // UI弹出框基类
    Laya.ClassUtils.regClass( "UIDialog", UIDialog );
}

/**
 * 扩展cc.Node类
 * 新增 getChildByRelativePath 方法
 * 可通过相对路径来获得相对于本节点的子节点
 * @param relative_path 相对路径
 */
laya.display.Node.prototype.getChildByRelativePath = function ( this: laya.display.Node, relative_path: string ): laya.display.Node {
    let childnames = relative_path.split( "/" );
    let child = this;
    let index = 0;
    while ( index < childnames.length ) {
        child = child.getChildByName( childnames[ index++ ] );
    }
    if ( child == null ) {
        console.log( "[WARNING]: the node " + relative_path + " can not find in under node " + this.name );
    }
    return child;
};

/**
 * 精灵运行一个动效模板
 * PS：
 *     1.精灵必须已经被加载到舞台了
 *     2.非循环特效才有结束回调，循环特效没有办法设置结束回调
 *     3.循环特效需要手动停止,通过调用循环特效.stopPlaying() 来停止特效播放
 * @param effClass 继承自EffectAnimation的动效类
 * @param isLoop 是否循环
 * @param comleteCallback 结束回调
 */
laya.display.Sprite.prototype.runEffectAnimation = function <T extends laya.display.EffectAnimation>( this: laya.display.Sprite,
    effClass: { new(): T & laya.display.EffectAnimation },
    isLoop: boolean,
    completeCallback?: () => void
): T {
    // 创建动效                                                                                                        
    let effect = new effClass() as T;
    effect.target = this;

    /**
     * 临时创建节点装载对象
     */
    let sp = new laya.display.Sprite();
    sp.pos( this.x, this.y );
    sp.zOrder = this.zOrder;
    this.parent.addChild( sp );

    this.pos( 0, 0 );
    sp.addChild( this );

    effect.play( 0, isLoop );
    if ( !isLoop ) {
        effect.on( Laya.Event.COMPLETE, null, () => {
            // 结束时还原容器节点位置
            effect.stopPlaying();
            if ( completeCallback ) completeCallback();
        } );
    }

    return effect;
};

/**
 * 在不改变锚点的情况下
 * 设置全屏
 */
laya.display.Sprite.prototype.setFullScreen = function ( this: laya.display.Sprite ): void {
    this.width === 0 && ( this.width = Laya.stage.width );
    this.height === 0 && ( this.height = Laya.stage.height );
    let ax = this.pivotX / this.width;
    let ay = this.pivotY / this.height;
    this.width = Laya.stage.width;
    this.height = Laya.stage.height;
    this.pos( this.width * ax, this.height * ay );
}

/**
 * 停止播放
 * 此操作会将动效对象还原到原始父节点下
 */
laya.display.EffectAnimation.prototype.stopPlaying = function ( this: laya.display.EffectAnimation ): void {
    let target = this.target;
    let targetContain = target.parent;
    targetContain.parent.addChild( target );
    target.pos( targetContain.x, targetContain.y );

    targetContain.destroy();
}

/**
 * 同时设置组件锚点
 */
laya.ui.UIComponent.prototype.anchor = function ( this: laya.ui.UIComponent, x: number, y: number ): laya.ui.UIComponent {
    this.anchorX = x;
    this.anchorY = y;
    return this;
}

/**
 * 字符串的Md5方法
 * let a = "12345";
 * a.MD5();
 * 
 * "45adf".MD5();
 */
String.prototype.MD5 = function (): string {
    return CMD5.hashStr( this ) as string;
}
