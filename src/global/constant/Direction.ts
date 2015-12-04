/**
 * Created by Gordon on 22/12/14.
 */
class Direction
{
    static LEFT:number = Enum.start();
    static RIGHT:number = Enum.next();
    static TOP:number = Enum.next();
    static BOTTOM:number = Enum.next();
    static CENTER:number = Enum.next();
    static TIP_TEXT:number = Enum.next();
    /**当使用 NONE 方式弹窗，要调用UIMgr.getInstance().addPanelClose();添加关闭面板事件 */
    static NONE:number = Enum.next();
}
