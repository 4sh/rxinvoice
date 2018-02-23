import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlobModel} from '../../../models/blob.model';
import { FileUploader} from 'ng2-file-upload';
import 'rxjs/add/observable/of';
import {SweetAlertService} from '../../services/sweetAlert.service';

@Component({
    selector: 'attachments-detail',
    templateUrl: './attachments-detail.component.html',
    styleUrls: ['./attachments-detail.component.scss']
})
export class AttachmentsDetailComponent implements OnInit {

    @Input() invoiceId: string;
    @Input() attachments: BlobModel[];
    @Input() editMode = false;
    @Output() attachmentsChange: EventEmitter<null> = new EventEmitter();
    @Output() deleteFile: EventEmitter<BlobModel[]> = new EventEmitter();
    url: string;

    public uploader: FileUploader;

    constructor(private alertService: SweetAlertService) {
    }

    ngOnInit() {
        if (!this.attachments) {
            this.attachments = [];
        }
        this.url = '/api/invoices/' + this.invoiceId + '/attachments';
        this.uploader = new FileUploader({ autoUpload: false, url: this.url});
    }

    filesChange() {
        this.uploadAttachments();
    }

    uploadAttachments() {
            this.uploader.uploadAll();
            this.uploader.onCompleteAll = ( ) => {
                this.attachmentsChange.emit();
            };
    }

    delete(fileToRemove) {
        this.alertService.confirm({title: 'alert.confirm.deletion'}).then(
            (accept) => {
                if (accept.value) {
                    this.attachments = this.attachments.filter(file => fileToRemove !== file);
                    this.deleteFile.emit(this.attachments);
                }

            }
        );
    }

}
