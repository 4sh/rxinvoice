import {Component, OnInit} from '@angular/core';
import {Invoice} from '../../domain/invoice/invoice';
import {DraftService} from '../../common/services/draft.service';

@Component({
    selector: 'drafts',
    templateUrl: './drafts.component.html',
    styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit {

    public drafts: Array<Invoice>;

    constructor(private draftService: DraftService) {
    }

    ngOnInit() {
      this.draftService.fetchDrafts().subscribe(value => this.drafts = value)
    }

}
