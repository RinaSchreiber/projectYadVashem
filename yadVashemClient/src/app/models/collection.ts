import { imageDeatails } from "./imageDeatails";

export class Collection {
    constructor(public collectionSymbolization?: string, public title?: string, public itemId?: string,
        public images?: Array<imageDeatails>,
    ) { }
} 
