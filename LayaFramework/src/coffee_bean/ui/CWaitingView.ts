
// 球半径
const BALL_RADIUS:number = 10;

// 运动半径
const MOVE_RAIDUS:number = 100;

/**
 * 等待 view
 */
export default class CWaitingView extends Laya.View 
{
    // UI实例
    private static inst:CWaitingView = null;

    /**
     * 获得UI实例
     */
    private static getInst():CWaitingView{
        if( CWaitingView.inst == null ){
            CWaitingView.inst = new CWaitingView();
            CWaitingView.inst.name = "Waiting";
        } 
        
        return CWaitingView.inst;
    }

    /**
     * 显示Waiting
     */
    public static show():void{
        CWaitingView.getInst().visible = true;
    }

    /**
     * 隐藏Waiting
     */
    public static hide():void{
        CWaitingView.getInst().visible = false;
    }

    /**
     * 构造函数
     */
    constructor()
    {
        super(); 
        Laya.stage.addChild(this);

        // 设置尺寸
        this.setFullSize(this);
        this.alpha = 0.5;
        this.mouseThrough = false;
        this.mouseEnabled = true;
        this.zOrder = 99999999;
        
        // 创建背景颜色层
        let box = new laya.ui.Box();
        box.bgColor = "#000000";
        this.setFullSize(box);
        this.addChild(box);

        // 小球容器
        let ballContain = new laya.ui.Box();
        ballContain.size(100,100);
        ballContain.pivotX = 0.5;       
        ballContain.pivotY = 0.5;
        ballContain.pos(Laya.stage.width/2,Laya.stage.height/2);
        Laya.TimeLine.to(ballContain,{rotation:360},1000).play(0,true);
        box.addChild(ballContain);

        // 创建小球，并运动
        for (let i = 0; i < 4; i++) {
            let ball = this.createBall("#FFFFFF");
            ball.pos(0, 0);
            ballContain.addChild(ball);
            switch(i){
                case 0:
                    Laya.TimeLine.to(ball,{x:0,y:MOVE_RAIDUS},1000).to(ball,{x:0,y:0},1000).play(0,true);
                    break;
                case 1:
                    Laya.TimeLine.to(ball,{x:0,y:-MOVE_RAIDUS},1000).to(ball,{x:0,y:0},1000).play(0,true);
                    break;
                case 2:
                    Laya.TimeLine.to(ball,{x:MOVE_RAIDUS,y:0},1000).to(ball,{x:0,y:0},1000).play(0,true);
                    break;
                case 3:
                    Laya.TimeLine.to(ball,{x:-MOVE_RAIDUS,y:0},1000).to(ball,{x:0,y:0},1000).play(0,true);
                    break;
            }
        }
    }


    /**
     * 创建小球
     */
    private createBall(color:string):Laya.Sprite{
        let sp = new Laya.Sprite();
        sp.graphics.drawCircle(0,0,BALL_RADIUS,color);
        sp.size(BALL_RADIUS*2,BALL_RADIUS*2);
        sp.pivotX = 0.5;
        sp.pivotY = 0.5;
        return sp;
    }

    /**
     * 设置一个UI目标尺寸为全屏
     * @param target 要设置全屏的目标
     */
    private setFullSize( target:Laya.UIComponent | Laya.View ):void{
        target.top = 0;
        target.bottom = 0;
        target.left = 0;
        target.right = 0;
        target.width = Laya.stage.width;
        target.height = Laya.stage.height;
        target.pivotX = 0;
        target.pivotY = 0;
        target.x = 0;
        target.y = 0;
    }

}

