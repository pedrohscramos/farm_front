import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DrawAddon } from '@common/draw';
import GeoJSON from 'ol/format/GeoJSON';
import { MapService } from '../map.service';
import { BasemapComponent } from '../basemap/basemap.component';
import { GeoJsonFeatureAddon } from '@common/feature';
import { pointClickStyle, GeoJsonFeature } from '@common/geolib'
import { Farm } from '../models/Farm';
import { Owner } from '../models/Owner';
import { FarmService } from '../services/farm.service';
import { OwnerService } from '../services/owner.service';


@Component({
  selector: 'app-farm-create',
  templateUrl: './farm-create.component.html',
  styleUrls: ['./farm-create.component.scss']
})
export class FarmCreateComponent implements OnInit {

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

  private _map!: BasemapComponent
  private _geometries: GeoJsonFeature[] = []

  constructor(private _mapService: MapService, private farmservice:FarmService, private ownerService:OwnerService, private router:Router) { }

  ngOnInit(): void {
    this._map = this._mapService.map
    this.getOwners();
  }

  getOwners() {
    this.ownerService.list().subscribe((owners: Owner[]) => {
      this.owners = owners;
    });
  }


  create(){
    this.farmservice.create(this.farmForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["farm"])
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  draw(type: 'Circle') {
    if(!this._map) return
    this._map.includeAddon(new DrawAddon({
      identifier: 'geometry_map',
      drawType: type,
      callback: geometry => {
          const geo = new GeoJSON().writeGeometryObject(geometry) as any
          this.handleNewGeometry(geo)
        }
      }))
  }

  geometrySeed: number = 1
  handleNewGeometry(geometry: any) {
    const identifier = this.geometrySeed++
    this._map.includeAddon(
      new GeoJsonFeatureAddon({
        identifier: `geometry::${identifier}`,
        feature: geometry,
        styleFunction: () => {
          return pointClickStyle({
            hover: false,
            strokeColor: '#1962D1',
          })
        },
      })
    )
    this._map.fitToAddons(this._map.listByPrefix('geometry'))
    console.log('New geometry', geometry)
    this._geometries.push(geometry)
      this.farmForm.geometry = geometry
   console.log(Object.keys(geometry));
    
  }
  

  ngOnDestroy() {
    this._map.removeByPrefix('geometry')
  }

}
