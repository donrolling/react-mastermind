export class FormUtility {
    public static GetRadioVal(formId: string, name: string): string {
        let form = document.getElementById(formId) as HTMLFormElement;
        // get list of radio buttons with specified name
        let radios = form.elements[name];
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
        return '';
    }
}