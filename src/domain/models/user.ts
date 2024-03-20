export interface User {
    id: string;
    name: string;
    incantation: string;
    effect: string;
    canBeVerbal: boolean;
    type: string;
    light: string;
    creator?: string;
}