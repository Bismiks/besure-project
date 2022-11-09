export interface GenericFormField {
  name: string;
  type: string;
  placeholder: string;
  rows?: number;
  fieldType: 'input' | 'textarea' | 'list';
  listName?: string;
  label:string;
  classname:string;
  lg: boolean;
}

export function buildGenericFormField(data: Partial<GenericFormField> & { name: string }): GenericFormField {
  return {
    type: 'text',
    placeholder: '',
    fieldType: 'input',
    lg: true,
    classname:'',
    label:'',
    ...data,
  };
}
