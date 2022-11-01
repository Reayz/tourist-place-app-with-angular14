import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceType } from 'src/app/interface/place-type';
import { ApiHelperService } from 'src/app/service/api-helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  places: PlaceType[] = [];
  stillLoading: boolean = true;
  searchText = "";

  constructor(private service: ApiHelperService, private router: Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.service.getAllPlaces().subscribe((data: PlaceType[]) => {
      this.places = data;
      this.stillLoading = false;
    })
  }

  createNewPlace() {
    this.router.navigateByUrl('/details');
  }

  updatePlace(placeID: number) {
    this.router.navigateByUrl('/details/' + placeID);
  }

  deletePlace(placeID: number) {
    if (confirm("Are you sure to delete this record?")) {
      this.service.deletePlace(placeID).subscribe({
        next: (data: any) => {
          this.router.navigateByUrl('/dashboard');
        },
        error: () => console.log('console from subscribe: error'),
        complete: () => console.log('console from subscribe: complete!')
      })
    }
  }
}
