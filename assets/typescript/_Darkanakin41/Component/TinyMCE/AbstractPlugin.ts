export default abstract class AbstractPlugin{
    protected id:string = "TBD";
    protected text:string = "TBD";
    protected tooltip:string = "";
    protected icon:string = "";
    protected context?:string;
    protected editor?:any;

    protected constructor(id:string, text:string, tooltip:string = "", icon:string = ""){
        this.id = id;
        this.text = text;
        this.tooltip = tooltip;
        this.icon = icon
    }

    public addToEditor(editor:any){
        this.editor = editor;
        let settings = {
            text: this.text,
            tooltip : this.tooltip === "" ? undefined : this.tooltip,
            icon : this.icon === "" ? undefined : this.icon,
            context: this.context,
            onAction: () => {
                this.onAction();
            }
        };
        this.getEditor().ui.registry.addButton(this.id, settings);
        return this;
    }

    getEditor(){
        return this.editor;
    }

    abstract onAction():void;
}
