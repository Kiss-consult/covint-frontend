export interface QuestionBase {
    id: string; 
    label: string; 
    type: 'text' | 'yesno' | 'dropdown'; 
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

export class DropdownQuestion implements QuestionBase {
    id: string;
    label: string;
    type: 'dropdown' = 'dropdown';
    options: string[];

    constructor(label: string, options: string[]) {
        this.id = this.generateId();
        this.label = label;
        this.options = options;
    }

    private generateId(): string {
        return 'dropdown-' + Math.random().toString(36).substr(2, 9);
    }
}
