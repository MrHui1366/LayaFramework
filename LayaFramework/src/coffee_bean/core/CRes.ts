import CLOG from "../utils/CLOG";

/** 资源加载接口 */
export interface ResInfo {
    /** 地址 */
    url: string;
    /** 类型 */
    type: string;
}

/** 
 * 资源管理类
 */
export default class CRes {
    /**
     * 预加载资源
     */
    public static preload( resArray: Array<ResInfo>, completeCallback: () => void, progress: ( number ) => void ) {
        let completeHandler: Laya.Handler = null;
        let progressHandler: Laya.Handler = null;
        if ( completeCallback ) completeHandler = Laya.Handler.create( null, completeCallback );
        if ( progress ) progressHandler = Laya.Handler.create( null, progress, null, false );
        Laya.loader.load( resArray, completeHandler, progressHandler );
        Laya.loader.on( Laya.Event.ERROR, this, ( url: string ) => { CLOG.E( "preload error {0}", url ); } );
    }

    /**
     * 读取并返回 JSON 对象
     * 若该对象没有缓存
     * 则自动缓存他
     * 并返回
     */
    public static async loadJSONAsync<T>( url: string ): Promise<T> {
        let obj = Laya.loader.getRes( url );
        if ( !obj ) {
            obj = await this.loadResAsync( url, Laya.Loader.JSON );
        }
        return obj as T;
    }

    /**
     * 读取并返回 贴图 对象
     * 若该对象没有缓存
     * 则自动缓存他
     * 并返回
     */
    public static async loadImageAsync( url: string ): Promise<Laya.Texture> {
        let obj = Laya.loader.getRes( url );
        if ( !obj ) {
            obj = await this.loadResAsync( url, Laya.Loader.IMAGE );
        }
        return obj as Laya.Texture;
    }

    /**
     * 读取并返回 文本 对象
     * 若该对象没有缓存
     * 则自动缓存他
     * 并返回
     */
    public static async loadTextAsync( url: string ): Promise<string> {
        let obj = Laya.loader.getRes( url );
        if ( !obj ) {
            obj = await this.loadResAsync( url, Laya.Loader.TEXT );
        }
        return obj as string;
    }

    /**
     * 读取并返回 声音 对象
     * 若该对象没有缓存
     * 则自动缓存他
     * 并返回
     */
    public static async loadSoundAsync( url: string ): Promise<Laya.Sound> {
        let obj = Laya.loader.getRes( url );
        if ( !obj ) {
            obj = await this.loadResAsync( url, Laya.Loader.SOUND );
        }
        return obj as Laya.Sound;
    }

    /**
    * 读取并返回 JSON 对象
    * 若该对象没有缓存
    * 则返回 null
    */
    public static loadJSON<T>( url: string ): T {
        let obj = Laya.loader.getRes( url );
        if ( obj ) {
            return obj as T;
        } else {
            return null;
        }
    }

    /**
     * 读取并返回 贴图 对象
     * 若该对象没有缓存
     * 则返回 null
     */
    public static loadImage( url: string ): Laya.Texture {
        let obj = Laya.loader.getRes( url );
        if ( obj ) {
            return obj as Laya.Texture;
        } else {
            return null;
        }
    }

    /**
     * 读取并返回 文本 对象
     * 若该对象没有缓存
     * 则返回 null
     */
    public static async loadText( url: string ): Promise<string> {
        let obj = Laya.loader.getRes( url );
        if ( obj ) {
            return obj as string;
        } else {
            return null;
        }
    }

    /**
     * 读取并返回 声音 对象
     * 若该对象没有缓存
     * 则返回 null
     */
    public static loadSound( url: string ): Laya.Sound {
        let obj = Laya.loader.getRes( url );
        if ( obj ) {
            return obj as Laya.Sound;
        } else {
            return null;
        }
    }

    /**
     * 异步加载（缓存）资源
     */
    public static async loadResAsync( resURL: string, resType: string ): Promise<any> {
        let func = ( resolve, reject ) => {
            Laya.loader.load( resURL, Laya.Handler.create( this, () => {
                let obj = Laya.loader.getRes( resURL );
                resolve( obj );
            } )
            );
            Laya.loader.on( Laya.Event.ERROR, this, ( errURL: string ) => { reject( errURL ); } );
        }

        return new Promise<any>( func );
    }
}
