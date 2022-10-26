import { Component, OnInit } from '@angular/core';
import { DrawAddon } from '@common/draw';
import GeoJSON from 'ol/format/GeoJSON';
import { MapService } from '../map.service';
import { BasemapComponent } from '../basemap/basemap.component';
import { GeoJsonFeatureAddon } from '@common/feature';
import { pointClickStyle, GeoJsonFeature } from '@common/geolib'
import { FarmService } from '../services/farm.service';
import { Farm } from '../models/Farm';


@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit {

  farm = {} as Farm;
  farms: Farm[] = [];
  

  private _map!: BasemapComponent
  private _geometries: GeoJsonFeature[] = []

  constructor(private _mapService: MapService, private farmService: FarmService) { }

  ngOnInit() {
    this._map = this._mapService.map
    
   this.getFarms();
    
    
  }

  getFarms() {
    this.farmService.list().subscribe((farms: Farm[]) => {
      this.farms = farms;
    });
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
  }


  ngOnDestroy() {
    this._map.removeByPrefix('geometry')
  }
}