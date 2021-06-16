import {Component, Input, OnInit} from '@angular/core';
import {Company} from "../../../../../../domain/company/company";

@Component({
  selector: 'a-company-legal-info',
  templateUrl: './a-company-legal-info.component.html',
  styleUrls: ['./a-company-legal-info.component.scss']
})
export class ACompanyLegalInfoComponent implements OnInit {

  @Input() company: Company;

  constructor() { }

  ngOnInit(): void {
  }

  public isSirenDisabled(): boolean {
    return !!this.company._id && !!this.company.siren;
  }

}
