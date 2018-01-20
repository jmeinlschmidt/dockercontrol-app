import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Stats } from './machine.service';

import { environment } from '../../../environments/environment';

interface IContainerService {
    createContainer(containerRequest: ContainerCreateRequest): Observable<Container>;
}

export interface ContainerCreateRequest {
    machine: string;
    type: string;
    ramLimit: string;
}

export interface ContainerKillRequest {
    hash: string;
}

export interface Container {
    hash: string;
    name: string;
    type: string;
    stats: Stats;
    ip: string;
    machine: string;
}

@Injectable()
export class ContainerService implements IContainerService {

    constructor(private _apiService: ApiService) { }

    public createContainer(containerCreateRequest: ContainerCreateRequest): Observable<Container> {
        return this._apiService.create<Container>(environment.api.machine, containerCreateRequest);
    }

    public killContainer(containerKillRequest: ContainerKillRequest): Observable<Container> {
        return this._apiService.delete<Container>(environment.api.machine, containerKillRequest.hash);
    }
}
