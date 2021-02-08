export interface IMultiSelectProps {
    values?: Array<IItemObject>;
    value?: IItemObject;
    items: Array<IItemObject>;
    onChange: Function;
    multiple?: boolean;
    name?: string;
    label?: string;
    disabled?: boolean;
}

export interface IItemObject {
    value: string;
    label: string;
    id: string;
    disabled?: boolean;
    selected?: boolean;
}

export interface IMultiSelectStates {
    values: Array<IItemObject>;
    value: IItemObject;
    dialogVisible: boolean;
    items: Array<IItemObject>;
    selectedItems: Array<IItemObject>;
    disabled: boolean;
}