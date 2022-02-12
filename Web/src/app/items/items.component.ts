import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Item } from '../shared/item.model';
import { ItemService } from '../shared/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[];

    constructor(private itemService: ItemService) {}

    ngOnInit() {
        this.itemService.getAll()
            .pipe(first())
            .subscribe(items => this.items = items);
    }

    deleteItem(id: number) {
        const item = this.items.find(x => x.itemId === id);
        if (!item) return;
        this.itemService.delete(id)
            .pipe(first())
            .subscribe(() => this.items = this.items.filter(x => x.itemId !== id));
    }

    markComplete(id: number) {
      let item = this.items.find(x => x.itemId === id);
      item.isCompleted = true;
      if (!item) return;
      this.itemService.update(id, item)
          .pipe(first())
          .subscribe(() => this.items.map(x => { if(x.itemId === id){
            x.isCompleted = true;
          }}));
  }
}
