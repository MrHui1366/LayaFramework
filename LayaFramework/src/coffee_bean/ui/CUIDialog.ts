import CScene from "../scene/CScene";

/**
 * UI基类
 */
export class UIDialog extends Laya.Dialog {
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
    public static getUInst<T extends UIDialog>( this: { new(): T; } & typeof UIDialog ): T {
        return this._uinst;
    }
    /**
         * 获取UI实例
         */
    public static createUI<T extends UIDialog>( this: { new(): T; } & typeof UIDialog ): T {
        if ( this._uinst == null ) {  // 未被定义时
            this._uinst = new this();
            this._uinst.open(false);
        }

        return this._uinst;
    }
}
