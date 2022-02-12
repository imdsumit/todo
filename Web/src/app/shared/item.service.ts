import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { HttpClient } from "@angular/common/http";
import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/items`;
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Item[]>(baseUrl);
}

getById(id: number) {
    return this.http.get<Item>(`${baseUrl}/${id}`);
}

create(item: Item) {
    return this.http.post(baseUrl, item);
}

update(id: number, item: Item) {
    return this.http.put(`${baseUrl}/${id}`, item);
}

delete(id: number) {
    return this.http.delete(`${baseUrl}/${id}`);
}

}
