export interface IUser {
    name: string;
    mail: string;
    curp: string;
    password: string;
    rol: string;
}

interface IMetric {
    description: string;
    maxpoints: number;
}

export interface IEvent {
    name: string;
    maxrounds: number;
    round:number;
    state: string;
    metrics: IMetric[];
}

interface IGrade {
    id_metric:string;
    grade:number;
    id_judge:string;
}

export interface IGrades{
    id_group:string;
    round:number;
    id_event:string;
    grades:IGrade[];
}

export interface ITeams {
    name: string;
    memberID: string[];
    leaderID: string;
    round: number;
    grades: IGrades[]
}