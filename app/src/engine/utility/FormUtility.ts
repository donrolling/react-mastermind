import _ from "lodash";

export class FormUtility {
    public static GetInputValue(formId: string, name: string, type: string): string {
        let form = document.getElementById(formId) as HTMLFormElement;
        if(!form){
            throw 'Form not found!';
        }
        // get list of radio buttons with specified name
        let elements = form.getElementsByName(name);
        if(!elements){
            throw 'Items not found!';
        }
        for(var i = 0;i < elements.length;i++){
            let item = <HTMLInputElement>elements[i];
            switch(type){
                case 'radio':
                    if(item.checked){
                        return item.value;
                    }
                default:
                    throw `Type not found: ${type}`;
            }
        }
        throw 'Value not found!';
    }
}