import { Component, OnInit } from '@angular/core';
import { FarmService } from '../services/farm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Farm } from '../models/Farm';
import { OwnerService } from '../services/owner.service';
import { Owner } from '../models/Owner';

declare var window: any;

@Component({
  selector: 'app-farm-details',
  templateUrl: './farm-details.component.html',
  styleUrls: ['./farm-details.component.scss']
})
export class FarmDetailsComponent implements OnInit {

  farm: Farm = {
    id: 0,
    name: '',
    centroid: [],
    owner_id: 0,
    geometry: undefined,
    area: 0
  };

  owner: Owner = {
    id: 0,
    name: '',
    document: '',
    document_type: 'CPF'
  }

  farms: Farm[] = [];
  owners: Owner[] = [];

  nomeDono ='';
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private farmService: FarmService,
    private ownerService: OwnerService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.getById(id);
    });


  }

  getOwnerById(id: number){
    this.ownerService.read(id).subscribe((data) => {
      this.nomeDono = data.name;
    })
  }

  getById(id: number) {
    this.farmService.read(id)
      .subscribe((data) => { 
      this.farm = data;
      this.getOwnerById(data.owner_id);
      //console.log(this.nomeDono)
    },
    () => {
      this.router.navigate(["farm"])
    });
  }

  delete(id: number) {
    this.farmService.delete(id).subscribe({
      next: (data) => {
        this.farms = this.farms.filter(_ => _.id != id)
        this.router.navigate(["farm"])
        
      },
    });
  }

}
