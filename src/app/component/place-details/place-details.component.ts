import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiHelperService } from 'src/app/service/api-helper.service';
import { PlaceType } from 'src/app/interface/place-type';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})

export class PlaceDetailsComponent implements OnInit {

  currentPlace: PlaceType = {
    placeID: 0,
    name: '',
    address: '',
    rating: 1,
    type: '',
    picture: ''
  };

  newPlaceForm = new FormGroup({
    placeID: new FormControl(this.currentPlace.placeID),
    name: new FormControl(this.currentPlace.name, [Validators.required]),
    address: new FormControl(this.currentPlace.address, [Validators.required]),
    rating: new FormControl(this.currentPlace.rating, [Validators.required, Validators.max(5), Validators.min(1)]),
    type: new FormControl(this.currentPlace.type, [Validators.required]),
    picture: new FormControl(this.currentPlace.picture, [Validators.required]),
  })

  constructor(private service: ApiHelperService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let temp = this.activeRoute.snapshot.paramMap.get('id');
    if (temp) {
      let isNum = /^\d+$/.test(temp!);
      let placeID = parseInt(temp!);
      if (!isNum || placeID == 0) {
        this.router.navigateByUrl('/no-page-found');
      }
      else if (placeID > 0) {
        this.service.getPlaceDetails(placeID).subscribe((data: PlaceType) => {
          this.currentPlace = data;
          this.initForm();
        })
      }
    }
  }

  private initForm() {
    this.newPlaceForm.setValue({
      placeID: this.currentPlace.placeID,
      name: this.currentPlace.name,
      address: this.currentPlace.address,
      rating: this.currentPlace.rating,
      type: this.currentPlace.type,
      picture: this.currentPlace.picture,
    })
  }

  get field() {
    return this.newPlaceForm.controls;
  }

  toBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  };

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.toBase64(event.target.files[0]).then((data: any) => {
        this.newPlaceForm.patchValue({
          picture: data as string
        });
      });
    }
  }

  AddNewPlace() {
    var data = this.newPlaceForm.value;

    let place: PlaceType = {
      placeID: data.placeID as number,
      name: data.name as string,
      address: data.address as string,
      rating: data.rating as number,
      type: data.type as string,
      picture: data.picture as string
    }

    let currentPlaceID = this.activeRoute.snapshot.paramMap.get('id');

    if (!place.placeID && !currentPlaceID) {
      place.placeID = 0;
    }
    else if (!place.placeID && currentPlaceID) {
      place.placeID = parseInt(currentPlaceID);
    }

    if (place.placeID === 0) {
      this.service.addNewPlace(place).subscribe((data: PlaceType) => {
        if (data.placeID > 0) {
          this.router.navigateByUrl('/dashboard');
        }
      })
    }
    else {
      this.service.updatePlace(place.placeID, place).subscribe((data: any) => {
        this.router.navigateByUrl('/dashboard');
      })
    }
  }

}
