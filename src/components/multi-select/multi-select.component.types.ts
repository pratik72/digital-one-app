export interface IMultiSelectProps {
    values: Array<IItemObject>;
    items: Array<IItemObject>;
    onChange: Function;
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
    dialogVisible: boolean;
    items: Array<IItemObject>;
    selectedItems: Array<IItemObject>;
}