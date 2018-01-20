import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { MachineService } from './shared/services/machine.service';
import { ContainerCreateRequest, ContainerKillRequest, ContainerService } from './shared/services/container.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  private createContainerForm: FormGroup;
  private killContainerForm: FormGroup;

  constructor(private _machineService: MachineService, private _containerService: ContainerService) { }

  public ngOnInit() {
    this._setFormGroups();
    this._setMachinesInterval();
  }

  private _createContainer(containerCreateRequest: ContainerCreateRequest, isValid: boolean) {
    if (isValid) {
      this._containerService.createContainer(containerCreateRequest).subscribe();
    }
  }

  private _killContainer(containerKillRequest: ContainerKillRequest, isValid: boolean) {
    if (isValid) {
      console.log('sending');
      this._containerService.killContainer(containerKillRequest).subscribe();
    }
  }

  private _setMachinesInterval() {
    const interval = Observable.interval(500).subscribe(
      () => this._machinesCheck()
    );
  }

  private _machinesCheck() {
    this._machineService.getMachines().subscribe();
  }

  private _setFormGroups() {
    this.createContainerForm = new FormGroup({
      machine: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      ramLimit: new FormControl(null, [Validators.required, Validators.pattern(/^[\d]+$/)]),
    });

    this.killContainerForm = new FormGroup({
      hash: new FormControl(null, [Validators.required, Validators.pattern(/^#[\d\w]+/)])
    });
  }
}
