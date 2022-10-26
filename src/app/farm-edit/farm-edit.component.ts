import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Farm } from '../models/Farm';
import { Owner } from '../models/Owner';
import { FarmService } from '../services/farm.service';
import { OwnerService } from '../services/owner.service';

@Component({
  selector: 'app-farm-edit',
  templateUrl: './farm-edit.component.html',
  styleUrls: ['./farm-edit.component.scss']
})
export class FarmEditComponent implements OnInit {


  farmForm: Farm = {
    id: 0,
    name: '',
    centroid: [],
    owner_id: 0,
    geometry: undefined,
    creation_date: new Date(),
    area: 0
  };

  owner = {} as Owner;
  owners: Owner[] = [];

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private farmService:FarmService,
    private ownerService:OwnerService,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.getById(id);
    });
    this.getOwners();

  }

  getOwners() {
    this.ownerService.list().subscribe((owners: Owner[]) => {
      this.owners = owners;
    });
  }
  

  getById(id: number) {
    this.farmService.read(id)
      .subscribe((data) => { 
      this.farmForm = data;
      
    },
    () => {
      this.router.navigate(["farm"])
    });
  }

  update() {
    this.farmService.update(this.farmForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/details/"+data.id]);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

}
