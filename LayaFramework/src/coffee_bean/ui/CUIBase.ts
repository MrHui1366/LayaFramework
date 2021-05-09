import CScene from "../scene/CScene";

/**
 * UI基类
 */
export class UIBase extends Laya.View {
    /**
         * UI实例
         */
    private static _uinst;
    /**
         * UI实例
         * 未创建时为null
         * 一经创建便有值了
         * 除非destroy
         */
    public static UInst<T extends UIBase>( this: { new(): T; } & typeof UIBase ): T{
        return this._uinst;
    }
    /**
         * 获取UI实例
         */
    public static createUI<T extends UIBase>( this: { new(): T; } & typeof UIBase ): T {
        if ( this._uinst == null ) {  // 未被定义时
            this._uinst = new this();
            this._uinst.open(false);
            CScene.nowScene.uiRoot.addChild(this._uinst);
        }

        return this._uinst;
    }
}
