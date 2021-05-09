/**
 * CoffeeBean
 * 工具模块
 * 包括工具函数
 * 
 * By Leo
 */

import CLOG from "./CLOG";
export default class CTools {
    /**
     * 显示对象的所有组成
     * @param 对象
     */
    public static displayObject( obj: object,prefixCount:number = 0 ): void {
        let prefix = " ".repeat(prefixCount);
        for ( let key in obj ) {
            if( obj[key] instanceof Object ){
                this.displayObject( obj[key] ,prefixCount+4);
            }
            console.log( prefix + "object key:" + key + "   value:" + obj[ key ] );
        }
    }


    /**
     * 拷贝源对象身上的 键值 到目标对象身上
     * 简单说
     *     交集拷贝
     * 
     * 示例
     * 源对象   A { k1=10,k2=20,k3=30 };
     * 目标对象 B { k2=50,k3=90,k4=130};
     * 执行后   B { k2=20,k3=30,k4=130};
     * @param sourceObj 源对象
     * @param targetObj 目标对象
     */
    public static copyObject( sourceObj: object, targetObj: object ): void {
        for ( let key in sourceObj ) {
            if ( targetObj[ key ] != undefined ) {
                targetObj[ key ] = sourceObj[ key ];
            }
        }
    }

    /**
     * UTF-8数组转字符串
     * @param array utf8数组
     */
    public static Utf8ArrayToStr( array: Array<number> ): string {
        var out, i, len, c;
        var char2, char3, char4;

        out = "";
        len = array.length;
        i = 0;
        while ( i < len ) {
            c = array[ i++ ];
            var pre = ( c >> 3 );
            if ( pre >= 0 && pre <= 15 ) {// 0xxxxxxx
                out += String.fromCharCode( c );
            } else if ( pre >= 24 && pre <= 27 ) {// 110x xxxx   10xx xxxx
                char2 = array[ i++ ];
                out += String.fromCharCode( ( ( c & 0x1F ) << 6 ) | ( char2 & 0x3F ) );
            } else if ( pre >= 28 && pre <= 29 ) {// 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[ i++ ];
                char3 = array[ i++ ];
                out += String.fromCharCode( ( ( c & 0x0F ) << 12 ) |
                    ( ( char2 & 0x3F ) << 6 ) |
                    ( ( char3 & 0x3F ) << 0 ) );
            } else if ( pre == 30 ) {//1111 0xxx  10xx xxxx  10xx xxxx 10xx xxxx
                char2 = array[ i++ ];
                char3 = array[ i++ ];
                char4 = array[ i++ ];
                out += String.fromCharCode(
                    ( ( c & 0x07 ) << 15 ) |
                    ( ( char2 & 0x3F ) << 12 ) |
                    ( ( char3 & 0x3F ) << 6 ) |
                    ( ( char4 & 0x3F ) << 0 ) );
            }
        }

        return out;
    }

    /*** 十六进制字符串转十进制数字 ***/
    public static hexStrtoDecNumber( hexstring: string ): number {
        let num = 0;
        for ( let i = 0; i < hexstring.length; i++ ) {
            const element = hexstring.charAt( i );
            num <<= 4;

            switch ( element ) {
                case 'A':
                case 'a':
                    num += 10;
                    break;
                case 'b':
                case 'B':
                    num += 11;
                    break;
                case 'c':
                case 'C':
                    num += 12;
                    break;
                case 'd':
                case 'D':
                    num += 13;
                    break;
                case 'e':
                case 'E':
                    num += 14;
                    break;
                case 'f':
                case 'F':
                    num += 15;
                    break;
                default:
                    num += parseInt( element );
                    break;
            }
        }

        return num;
    }

    /** 
     * 将一个字符串省略一定长度，以特定字符替代 
     * 如 
     *     CTools.omitStr('asdgadsgdf',3)  =>  'asd...';
     *     CTools.omitStr('asdgadsgdf',4 ,'*')  =>  'asdg***';
     *     CTools.omitStr('asdgadsgdf',5 ,'$' ,2)  =>  'asdga$$';
     * 
     * @param targetStr 目标字符串
     * @param omitStart 保留长度
     * @param replacestr 替换字符
     * @param replacelen 替换长度
     */
    public static omitStr( targetStr: string, omitStart: number, replacestr: string = '.', replacelen = 3 ): string {
        if ( targetStr.length <= omitStart ) {
            return targetStr;
        }
        let tail = replacestr.repeat( replacelen );
        return targetStr.substr( 0, omitStart ) + tail;
    }

    /**
     * 函数:格式化字符串
     * 参数：str:字符串模板； data:数据
     * 调用方式:formatString("api/values/{id}/{name}",{id:101,name:"test"});
     *         formatString("api/values/{0}/{1}",101,"test");
     */
    public static formatString(str:string, ...data):string {
        if (!str || data == undefined) {
            return str;
        }
        
        if(str.indexOf("{0}")== -1){
            for (const item of data) {
                for (let key in item) {
                    if (item.hasOwnProperty(key)) {
                        str = str.replace(new RegExp("\{" + key + "\}", "g"), item[key]);
                    }
                }
            }
        } else {
            let args = arguments,
                reg = new RegExp("\{([0-" + (args.length - 1) + "])\}", "g");
            return str.replace(reg, function(match, index) {
                return args[index - (-1)];
            });
        }
        return str;
    }
}