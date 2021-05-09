/**
 * CoffeeBean
 * 时间模块
 * 包括常见的各种对时间的操作
 * 
 * By Leo
 */
import CMath from "./CMath";

export default class CTime {
    /**
     * 根据格式得到当前时间字符串
     * @param formatstr 格式串  "y+"//年份  "M+"//月份  "d+"//日  "h+"//小时  "m+"//分  "s+"//秒  "q+"//季度  "S" //毫秒
     */
    public static getNowTimeStr( formatstr: string = "yyyy/MM/dd hh:mm:ss.S" ): string {
        return CTime.formatTime( new Date(), formatstr );
    }

    /**
     * 格式化时间
     * @param time 时间Date
     * @param formatstr 格式串   "y+"//年份  "M+"//月份  "d+"//日  "h+"//小时  "m+"//分  "s+"//秒  "q+"//季度  "S" //毫秒
     */
    private static formatTime( time: Date, formatstr: string = "yyyy/MM/dd hh:mm:ss.S" ): string {
        var o = {
            "M+": time.getMonth() + 1,                                       //月份
            "d+": time.getDate(),                                            //日
            "h+": time.getHours(),                                           //小时
            "m+": time.getMinutes(),                                         //分
            "s+": time.getSeconds(),                                         //秒
            "q+": Math.floor( ( time.getMonth() + 3 ) / 3 ),                     //季度
            "S": CMath.fixedNumber( time.getMilliseconds(), 3, "0" ),         //毫秒 前面补0  3个
        };
        if ( /(y+)/.test( formatstr ) ) {
            formatstr = formatstr.replace( RegExp.$1, ( time.getFullYear() + "" ).substr( 4 - RegExp.$1.length ) );
        }
        for ( var k in o ) {
            if ( new RegExp( "(" + k + ")" ).test( formatstr ) ) {
                formatstr = formatstr.replace( RegExp.$1, ( RegExp.$1.length == 1 ) ? ( o[ k ] ) : ( ( "00" + o[ k ] ).substr( ( "" + o[ k ] ).length ) ) );
            }
        }
        return formatstr;
    }

    /**
     * 异步等待
     * await CTime.waitTime(1000);  //等待1秒
     * @param millsec 等待的毫秒数
     */
    public static waitTime( millsec: number ): Promise<void> {
        return new Promise<void>( ( resolve, reject ) => {
            setTimeout( () => resolve(), millsec );
        } );
    }

    /**
     * 得到当前时间戳
     * @param millSec 是否返回毫秒
     */
    public static getNowTimeStamp( millSec:boolean = true ): number {
        let stamp = ( new Date() ).getTime();
        return millSec ? stamp : Math.floor(stamp/1000);
    }
}

