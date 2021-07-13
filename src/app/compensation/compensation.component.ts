import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { CompensationService } from '../shared/compensation.service';
import { Compensation } from '../shared/compensation.model';
import { BoundTextAst } from '@angular/compiler';

declare var M: any;

@Component({
  selector: 'app-compensation',
  templateUrl: './compensation.component.html',
  styleUrls: ['./compensation.component.css'],
  providers: [CompensationService]
})
export class CompensationComponent implements OnInit {

  constructor(public compensationService: CompensationService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshCompensationList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.compensationService.selectedCompensation = {
      _id: "",
      role: "",
      ctc: 0,
      basic: 0,
      hra: 0,
      lta: 0,
      bonus: 0,
      ctcm: 0,
      basicm: 0,
      hram: 0,
      ltam: 0,
      bonusm: 0
      
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.compensationService.postCompensation(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshCompensationList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.compensationService.putCompensation(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshCompensationList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshCompensationList() {
    this.compensationService.getCompensationList().subscribe((res) => {
      this.compensationService.compensations = res as Compensation[];
    });
  }

  onEdit(comp: Compensation) {
    this.compensationService.selectedCompensation = comp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.compensationService.deleteCompensation(_id).subscribe((res) => {
        this.refreshCompensationList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
