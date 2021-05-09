/******************************************
 * excel:Sample.xlsx 
 * table:Sheet1 
 ******************************************/


 /**
  * 数据表:Sheet1 模板类
  */
export class DT_Sample{
    /**
     * 编号
     */
    public id:number;

    /**
     * 名称
     */
    public name:string;

    /**
     * 显示类型
     */
    public test_bool:boolean;

    /**
     * 类型
     */
    public f_type:number;

    /**
     * 子类型
     */
    public f_type1:Array<number>;

    /**
     * 最大数量
     */
    public max_num:Array<string>;

    /**
     * 需要职业
     */
    public need_job:Array<boolean>;

    /**
     * 需要性别
     */
    public need_sex:Array<Array<number>>;

    /**
     * 道具等级
     */
    public item_level:Array<Array<string>>;

    /**
     * 需要等级
     */
    public need_level:Array<Array<number>>;

    /**
     * 需求武器熟练等级
     */
    public need_weaponlv:Array<Array<boolean>>;

}
