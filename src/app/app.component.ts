import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tatvasoft';
  projectDetails: FormGroup;
  projectGalForm: FormGroup;
  projectDetailsFlag = false;
  projectGalFormFlag = false;
  projectCastForm: FormGroup;
  first = [];
  second = [];
  third = [];
  projectCastFlag = false;
  step = 1;
  projectImaGallery = [];
  gallfiles: any;
  projectData: any[];
  submitted: boolean = false;
  constructor(private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.createProjectDetailsForm();
    this.createProjectGalForm();
    this.createProjectCastForm();
  }
  createProjectDetailsForm() {
    this.projectDetails = this.fb.group({
      org: ['Org1', Validators.required],
      cat: ['Cat1', Validators.required],
      act: ['Act1', Validators.required],
      title: ['', Validators.required],
      maxage: ['', Validators.required],
      minage: ['', Validators.required],
    });
  }
  createProjectGalForm() {
    this.projectGalForm = this.fb.group({
      pname: ['Proj1', Validators.required],
      pimg: ['', Validators.required],
    });
  }
  createProjectCastForm() {
    this.projectCastForm = this.fb.group({
      pcname: ['', Validators.required],
      prows: this.fb.array([this.initDurationCast()]),
    });
    console.log(this.projectCastForm.controls.prows, 'this.projectCastForm')
  }
  initDurationCast() {
    return this.fb.group({
      pduration: ['', Validators.required],
      pcost: ['', Validators.required]
    });
  }
  get pDurationCost() {
    return this.projectCastForm.get('prows') as FormArray;
  }
  next() {
    if (this.step == 1) {
      this.projectDetailsFlag = true;
      if (this.projectDetails.invalid) {
        return
      }
      this.step++;
      console.log(this.projectDetails.getRawValue(),'dfsf')
      this.first = this.projectDetails.getRawValue();
    }
    if (this.step == 2) {
      this.projectGalFormFlag = true;
      if (this.projectGalForm.invalid) {
        return
      }
      this.step++;
      
      this.second = this.projectGalForm.getRawValue();
      
    }
    if (this.step == 3) {
      this.projectCastFlag = true;
      if (this.projectCastForm.invalid) {
        return
      }
      this.step++;
      this.third = this.projectCastForm.getRawValue();
    }
  }
  prev() {
    if (this.step > 1) {
      this.step--;
    }
  }
  getImage(event) {
    this.gallfiles = event.target['files'];
    Object.keys(this.gallfiles).forEach((element, index) => {
      this.projectImaGallery['url'] = '';
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[index]);
      reader.onload = (_event) => {
        this.projectImaGallery[element]['url'] = reader.result;
      }
      this.projectImaGallery.push(this.gallfiles[element]);
    });
  }
  removeImage(index) {
    this.projectImaGallery.splice(index);
    if (this.projectImaGallery.length == 0) {
      this.projectGalForm.patchValue({ 'pimg': '' })
    }
  }
  removeCostFields(i) {
    this.pDurationCost.removeAt(i);
  }
  addCostFields() {
    this.pDurationCost.push(this.initDurationCast());
  }
  submit() {
    if (this.projectCastForm.invalid) {
      return
    } 
   this.submitted = true; 
   this.third = this.projectCastForm.getRawValue();
  }
  back(){
    console.log('test');
    this.step = 1;
    this.submitted = false;
    this.projectCastForm.reset();
    this.projectDetails.reset();
    this.projectGalForm.reset();
  }
}
