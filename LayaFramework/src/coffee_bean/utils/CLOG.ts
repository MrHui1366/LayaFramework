/**
 * CoffeeBean
 * LOG库封装
 * 
 * By Leo
 */
import CTime from './CTime';
import CTools from './CTools';

/**
 * 游戏名 
 */
const GAME_NAME: string = "travel";

export default class CLOG {

    /** 是否激活 */
    private static _enable: boolean = false;
    /** 激活log系统 */
    public static enable():void{this._enable = true;}
    /** 关闭log系统 */
    public static disable():void{this._enable = false;}
    
    /**
     * 得到输出字符串
     * 本函数在LOG前面增加了时间和LOG类型
     * @param args 参数数组
     * @param logType log类型 error 还是 warn 还是 info
     */
    private static getMsgStr( args: string[], logType: string ): string {
        let msg;
        switch ( args.length ) {
            case 0:
                return " ";
            case 1:
                msg = args[0];
                break;
            default:
                msg = CTools.formatString.apply( null, args );
                break;
        }

        return "[" + CTime.getNowTimeStr() + " |" + logType + "] " + msg;
    };

    /**
       * 输出一个 Info LOG
       * @param params 参数们，可以用来格式化字符串
       */
    public static I( ...params ): void {
        if(!this._enable) return;
        const outStr = this.getMsgStr( params, " INFO" );
        console.log( outStr );
    }

    /**
     * 输出一个 Error LOG
     * @param formatStr 格式串 必选参数  若只有一个参数则直接显示
     * @param params 参数们，可以用来格式化字符串
     */
    public static E( ...params ): void {
        if(!this._enable) return;
        const outStr = this.getMsgStr( params, "ERROR" );
        console.error( outStr );
    }

    /**
     * 输出一个 Error LOG
     * @param err 错误对象
     */
    public static EE( err: Error ): void {
        if(!this._enable) return;
        this.E( "----- " + err.name + "-----" );
        this.E( "message >> " + err.message );
        this.E( "stack   >> " + err.stack );
    }

    /**
     * 输出一个 Warning LOG
     * @param formatStr 格式串 必选参数  若只有一个参数则直接显示
     * @param params 参数们，可以用来格式化字符串
     */
    public static W( ...params ): void {
        if(!this._enable) return;
        const outStr = this.getMsgStr( params, " WARN" );
        console.warn( outStr );
    }

    /**
     * 条件为真时输出 Info
     * @param condition 条件 
     * @param params 参数们，可以用来格式化字符串
     */
    public static IF( condition: boolean, ...params ) {
        if(!this._enable) return;
        if ( !condition ) {
            return;
        }

        const outStr = this.getMsgStr( params, " INFO" );
        console.log( outStr );
    }

    /**
     * 条件为真时输出 Error
     * @param condition 条件 
     * @param params 参数们，可以用来格式化字符串
     */
    public static EF( condition: boolean, ...params ) {
        if(!this._enable) return;
        if ( !condition ) {
            return;
        }

        const outStr = this.getMsgStr( params, "ERROR" );
        console.error( outStr );
    }

    /**
     * 条件为真时输出 Warning
     * @param condition 条件 
     * @param params 参数们，可以用来格式化字符串
     */
    public static WF( condition: boolean, ...params ) {
        if(!this._enable) return;
        if ( !condition ) {
            return;
        }

        const outStr = this.getMsgStr( params, " WARN" );
        console.warn( outStr );
    }
}