export interface QuestionBase {
    id: string; 
    label: string; 
    type: 'text' | 'yesno' | 'yesnohospital' | 'multiselect' | 'sex' | 'relative'; 
}
export class TextQuestion implements QuestionBase {
    id: string;
    label: string;
    type: 'text' = 'text';

    constructor(label: string) {
        this.id = this.generateId();
        this.label = label;
    }

    private generateId(): string {
        return 'text-' + Math.random().toString(36).substr(2, 9);
    }
}

export class YesNoQuestion implements QuestionBase {
    id: string;
    label: string;
    type: 'yesno' = 'yesno';
    options: ['Yes', 'No'] = ['Yes', 'No'];

    constructor(label: string) {
        this.id = this.generateId();
        this.label = label;
    }

    private generateId(): string {
        return 'yesno-' + Math.random().toString(36).substr(2, 9);
    }
}

export class yesnohospitalQuestion implements QuestionBase {
    id: string;
    label: string;
    type: 'yesnohospital' = 'yesnohospital';
    options: ['Yes', 'No'] = ['Yes', 'No'];

    constructor(label: string) {
        this.id = this.generateId();
        this.label = label;
    }

    private generateId(): string {
        return 'yesnohospital-' + Math.random().toString(36).substr(2, 9);
    }
}

export class MultiSelectQuestion implements QuestionBase {
    id: string;
    label: string;
    type: 'multiselect' = 'multiselect';
    options: string[];
    multiple: boolean = true;
    selectedOptions: string[] = []; 

    constructor(label: string, options: string[], multiple: boolean = true,selectedOptions: string []) {
        this.id = this.generateId();
        this.label = label;
        this.options = options;
        this.multiple = multiple;
        this.selectedOptions = selectedOptions;
    }

    private generateId(): string {
        return 'multiselect-' + Math.random().toString(36).substr(2, 9);
    }
}

export class SexQuestion implements QuestionBase {
    id: string;
    label: string;
    type: 'sex' = 'sex';
    options: ['Férfi', 'Nő'] = ['Férfi', 'Nő'];

    constructor(label: string) {
        this.id = this.generateId();
        this.label = label;
    }

    private generateId(): string {
        return 'sex-' + Math.random().toString(36).substr(2, 9);
    }

}
export class RelativeQuestion implements QuestionBase {
    id: string;
    label: string;
    type: 'relative' = 'relative';
    options: ['Igen', 'Nem'] = ['Igen', 'Nem'];

    constructor(label: string) {
        this.id = this.generateId();
        this.label = label;
    }

    private generateId(): string {
        return 'relative-' + Math.random().toString(36).substr(2, 9);
    }
}


