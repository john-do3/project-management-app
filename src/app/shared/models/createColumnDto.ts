export interface IColumn {
    boardId: string;
    columnId: string;
}

export interface CreateColumnDto{
    title: string;
    order: number;
}
