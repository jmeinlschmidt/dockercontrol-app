import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Container } from './container.service';

import { environment } from '../../../environments/environment';


interface IMachineService {
    getMachines(): Observable<any>;
}

enum MachineType {
    Worker,
    Daemon
}

export interface Stats {
    cpuCurrent: number;
    ramCurrent: number;
    ramTotal: number;
    time: string;
}

interface Machine {
    hash: string;
    ip: string;
    type: MachineType;
    dockerControlPort: number;
    stats: Stats;
    containers: Container[];
}

@Injectable()
export class MachineService implements IMachineService {

    constructor(private _apiService: ApiService) { }

    public getMachines(): Observable<Machine[]> {
        return this._apiService.getAll<Machine[]>(environment.api.machine);
    }

    public getMachine(id: number): Observable<Machine> {
        return this._apiService.getSingle<Machine>(environment.api.machine, id);
    }
}
