export interface IMultiSelectProps {
    values?: Array<IItemObject>;
    value?: IItemObject;
    items?: Array<IItemObject>;
    apiData?: CallableFunction;
    onChange: Function;
    multiple?: boolean;
    name?: string;
    label?: string;
    disabled?: boolean;
    isDefaultData?: boolean;
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
    searchText: string;
}