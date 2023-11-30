import { Component, Input, OnInit } from '@angular/core';
import { Collection } from '../../models/collection';
import { CollectionService } from '../../services/collection.service';
import { imageDeatails } from '../../models/imageDeatails';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrl: './add-image.component.css'
})
export class AddImageComponent implements OnInit {

  constructor(
    public collectionServ: CollectionService
  ) { }

  ngOnInit() {
    this.isImageback.setValue(this.imageDeatails?.imageBack,{emitEvent:false})
    this.isImageback.valueChanges.subscribe(x=>this.collectionServ.addBack(x,this.imageDeatails?.imageNumber??0))
  }

  @Input() newCollection = new Collection()

  @Input() imageDeatails?: imageDeatails 

  @Input() saved?: boolean 

  isImageback:FormControl = new FormControl(this.imageDeatails?.imageBack)

}
