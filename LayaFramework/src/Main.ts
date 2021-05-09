import GameConfig from "./GameConfig";
import CoffeeBean from "./coffee_bean/CoffeeBean";
import CRes, { ResInfo } from "./coffee_bean/core/CRes";
import CLOG from "./coffee_bean/utils/CLOG";
import Game from "./Game";
import CUI from "./coffee_bean/ui/CUI";

class Main {
	constructor () {
		//根据IDE设置初始化引擎		
		if ( window[ "Laya3D" ] ) {
			Laya3D.init( GameConfig.width, GameConfig.height );
		} else {
			Laya.init( GameConfig.width, GameConfig.height, Laya[ "WebGL" ] );
		}

		Laya[ "Physics" ] && Laya[ "Physics" ].enable();
		Laya[ "DebugPanel" ] && Laya[ "DebugPanel" ].enable();

		Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
		Laya.stage.screenMode = GameConfig.screenMode;

		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if ( GameConfig.debug || Laya.Utils.getQueryString( "debug" ) == "true" ) Laya.enableDebugPanel();
		if ( GameConfig.physicsDebug && Laya[ "PhysicsDebugDraw" ] ) Laya[ "PhysicsDebugDraw" ].enable();
		if ( GameConfig.stat ) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable( "version.json", Laya.Handler.create( this, this.onVersionLoaded ), Laya.ResourceVersion.FILENAME_VERSION );

	}

	/**
	 * 版本管理加载完毕
	 */
	private onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable( "fileconfig.json", Laya.Handler.create( this, this.onConfigLoaded ) );
	}

	/**
	 * 游戏配置加载完毕
	 */
	private onConfigLoaded(): void {
		// 初始化游戏框架
		CoffeeBean.init();

		// 预加载
		this.preload();
	}


	/**
	 * 开始预加载
	 * TODO
	 */
	private preload(): void {
		/*
			--------------- 添加UI缓存清单 ---------------
			不要改
			自动缓存所有UI用到的JSON布局文件
		*/
		let resAry = CUI.getPreloadList();

		/*
			自定义缓存清单
			TODO
		*/
		resAry.push( { url: "font/test.ttf", type: Laya.Loader.TTF } );
		resAry.push( { url: "data/hahaha.txt", type: Laya.Loader.TEXT } );
		resAry.push( { url: "data/xml/testxml.xml", type: Laya.Loader.XML } );
		resAry.push( { url: "sound/test.mp3", type: Laya.Loader.SOUND } );
		resAry.push( { url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS } );
		resAry.push( { url: "res/atlas/img.atlas", type: Laya.Loader.ATLAS } );

		resAry.push( { url: "prefab/TestPrefab.json", type: Laya.Loader.JSON } )
		CRes.preload( resAry, this.onPreloadComplete.bind( this ), this.onPreloading.bind( this ) );
	}

	/**
	 * 预加载中回调
	 * @param proc 预加载进度
	 */
	private onPreloading( proc: number ): void {
		CLOG.I( "preload loading:{0}", proc );
	}

	/**
	 * 预加载完成回调
	 */
	private onPreloadComplete(): void {
		CLOG.I( "preload loading complete" );
		// 开始游戏
		Game.start();
	}
}
//激活启动类
new Main();
