import {Component, OnInit} from '@angular/core';
import {HomeService} from "./home.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user;
  enableEditing = false;

  constructor(public homeService: HomeService) {
  }

  ngOnInit() {
    this.homeService.getDetails().subscribe(
      (response) => {
        console.log(response.json());
        if (response.json().success) {
          this.user = response.json().data;
        }
      }
    );
  }

  enableEditingForm() {
    this.enableEditing = true;
  }

  onUpdate(form: NgForm) {
    const name = form.value.name;
    const phone = form.value.phone;
    console.log(form);
    this.homeService.updateValues(name, phone).subscribe(
      (response) => {
        console.log(response.json());
        if (response.json().success) {

          this.user = response.json().data;
          this.enableEditing = false;
        } else {
          //error handling
        }
      }
    );
  }
}
