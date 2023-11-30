import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collection } from '../models/collection';
import { imageDeatails } from '../models/imageDeatails';


@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(public http: HttpClient) { }

  url: string = "https://localhost:7259/api/collection"

  arrayLength: number = 0

  imagesArray: imageDeatails[] = []

  newCollection: Collection = new Collection()
  
  correctNumOfCollection?:boolean

  addImage() {
    this.arrayLength++
    this.imagesArray.push({
      "imageNumber": this.arrayLength,
      "imagePath": `images/${this.newCollection.collectionSymbolization}/0000${this.arrayLength}`,
      "imageData": "",
      "imageBack": false
    })
  }

  deleteImage() {
    this.imagesArray = this.imagesArray.filter(img => img.imageNumber != this.arrayLength)
    this.arrayLength--
  }

  addBack(bool: boolean, index: number) {
    this.imagesArray = this.imagesArray.map(img => img.imageNumber == index ? { ...img, imageBack: bool } : img)
  }

  getCollection(id: string) {
    let collection = this.http.get(`${this.url}?id=${id}`)
    this.imagesArray =[]
    this.arrayLength = 0
    return collection;
  }

  AddNewCollection(c: Collection) {
    return this.http.post(this.url, c)
  }


}
