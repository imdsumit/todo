import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ItemService } from 'src/app/shared/item.service';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

    itemForm: FormGroup;
    id: number;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: ItemService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.itemForm = this.formBuilder.group({
            itemId: [this.id ?? 0],
            description: ['', Validators.required],
            isCompleted: [false]
        });

        if (!this.isAddMode) {
            this.userService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.itemForm.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.itemForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.itemForm.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createItem();
        } else {
            this.updateIem();
        }
    }

    private createItem() {
        this.userService.create(this.itemForm.value)
            .pipe(first())
            .subscribe(() => {
                this.router.navigate(['../../'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }

    private updateIem() {
        this.userService.update(this.id, this.itemForm.value)
            .pipe(first())
            .subscribe(() => {
                this.router.navigate(['../../'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }

}
