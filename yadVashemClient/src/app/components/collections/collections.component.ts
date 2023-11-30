import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Collection } from '../../models/collection';
import { CollectionService } from '../../services/collection.service'
import { imageDeatails } from '../../models/imageDeatails';


@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent implements OnInit {

  collectionForm!: FormGroup;

  submitted = false;

  numberOfCollection?: string

  ifNUmberCorrect?:boolean

  constructor(
    private formBuilder: FormBuilder,

    public collectionServ: CollectionService
  ) { }

  ngOnInit() {
    this.collectionForm = this.formBuilder.group({

      collectionNumber: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.collectionForm.invalid) {
      return;
    }

    this.submitted = true; 

    this.collectionServ.getCollection(this.collectionNumberControl.value).subscribe(
      data => {
        this.collectionServ.newCollection = data
        this.ifNUmberCorrect = true
      },
      err => {
        console.log(err)
        this.collectionServ.newCollection.title = "מספר האוסף לא נמצא"
        this.ifNUmberCorrect = false
      }
    )
  }

  get collectionNumberControl() {
    return this.collectionForm.get('collectionNumber') as FormControl;
  }

  save() {
    this.collectionServ.newCollection.images = this.collectionServ.imagesArray;
    this.collectionServ.AddNewCollection(this.collectionServ.newCollection).subscribe(
      data => {
        this.collectionServ.newCollection = data;
        this.collectionServ.imagesArray = this.collectionServ.newCollection.images || [];
      },
      err => console.log(err)
    )
  }
}
