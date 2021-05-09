import CSceneBase from "../coffee_bean/scene/CSceneBase";
import CLOG from "../coffee_bean/utils/CLOG";


/**
 * 游戏场景
 */
export default class SC_Game extends CSceneBase {
    constructor () {
        super();
    }

    public onOpened( param: any ): void {
        super.onOpened( param );
        // this.activeUpdate();
    }

    public onClosed( type?: string ): void {
        super.onClosed( type );
        this.disableUpdate();
    }

    public update(): void {
        CLOG.I( "1111" );
    }

}
