import { Component } from '@angular/core';
import { DataService } from '../api/data.service';
import { Fact } from '../model/fact';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  facts: Fact[] = [];
  public searchTerm = '';
  constructor(private data: DataService) {
    data.getFacts().subscribe(facts => {
      this.facts = facts.filter(
        f => f.Category === 'Dojenje i ishrana'
      );
    });
  }

  FilterItems(): Fact[] {
    return this.facts.filter(f => this.searchTerm === ''
      || f.Action.toLowerCase().trim().includes(
        this.searchTerm.toLowerCase().trim()));
  }

}
