/** 
 * CoffeeBean
 * HTTP库
 * 自动异步队列
 * 
 * By Leo
 */

import CLOG from "../utils/CLOG";
import CWaitingView from "../ui/CWaitingView";

/**
 * HTTP 任务
 */
export class CHTTPTask {
    /** Http 请求地址 */
    public url: string;
    /** 请求对象 */
    public data: string;
    /** 回调函数 参数1 是否成功  参数2 服务器返回 body */
    public caller: ( boolean, string ) => void;
    /** 是否显示waiting */
    public showWaiting: boolean;
}

/** CoffeeBean
   * HTTP请求库
   * 
   * By Leo
   */
export class CHTTP {
    /**
     * 任务队列
     */
    private static taskList: Array<CHTTPTask> = new Array<CHTTPTask>();

    /**
     * 是否正在运行
     */
    private static hasRun: boolean = false;

    /**
     * 发送请求
     * @param URL 请求地址
     * @param data 发送的数据对象
     * @param showWating 是否需要显示Waiting
     * @param handler 回调函数
     */
    public static Post( url: string, data: string, showWating: boolean = true, handler: ( boolean, object ) => void ): void {
        let task = new CHTTPTask();
        task.url = url;
        task.data = data;
        task.caller = handler;
        task.showWaiting = showWating

        // 添加到任务队列
        this.taskList.push( task );

        // 若处理器没有启动
        if ( !this.hasRun ) {
            // 启动他
            this.handleHTTP();
        }
    }

    /**
     * 处理HTTP请求
     */
    private static async handleHTTP() {
        while ( this.taskList.length > 0 ) {
            this.hasRun = true;

            // 执行任务队列
            let task = this.taskList.shift();
            let url = task.url;
            let data = task.data;
            let caller = task.caller;

            // 等待异步任务
            let result: [ boolean, string ] = await new Promise<[ boolean, string ]>( ( resolve, reject ) => {
                // 需要显示Loading则显示
                if ( task.showWaiting ) {
                    CWaitingView.show();
                }

                CLOG.I( "== HTTP REQUEST ==" );
                CLOG.I( "URL:" + url );
                CLOG.I( "data:" + data );

                let http_req = new XMLHttpRequest();
                http_req.onreadystatechange = () => {
                    if ( http_req.readyState == 4 ) {
                        CLOG.I( "== HTTP RESPONSE ==" );
                        CLOG.I( "state:" + http_req.statusText );
                        CLOG.I( "data:" + http_req.responseText );

                        // 需要显示Loading则隐藏
                        if ( task.showWaiting ) {
                            CWaitingView.hide();
                        }

                        if ( http_req.status == 200 ) {
                            resolve( [ true, http_req.responseText ] );
                        } else {
                            CLOG.E( "xmlhttprequest status:" + http_req.status );
                            // PopUpView.showUI("网络异常，请稍后重试","好的",null,(isOK)=>{
                            //     resolve( [ false, "" ] );
                            // });
                        }
                    }
                };
                http_req.open( "post", url, true );
                http_req.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded;charset=UTF-8" );
                http_req.send( data );
            } );

            // 异步执行结束，执行回调
            if ( caller != null ) {
                caller( result[ 0 ], JSON.parse( result[ 1 ] ) );
            }
        }

        this.hasRun = false;
    }
}