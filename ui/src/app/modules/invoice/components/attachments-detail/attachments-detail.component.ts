import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Blob} from '../../../../domain/blob';
import {FileUploader} from 'ng2-file-upload';
import {SweetAlertService} from '../../../shared/services/sweetAlert.service';
import {Invoice} from '../../../../domain/invoice/invoice';
import {installTempPackage} from '@angular/cli/tasks/install-package';

@Component({
    selector: 'attachments-detail',
    templateUrl: './attachments-detail.component.html',
    styleUrls: ['./attachments-detail.component.scss']
})
export class AttachmentsDetailComponent implements OnInit {

    public dropdownBlock: boolean;
    public url: string;
    public uploader: FileUploader;
    public hasBaseDropZoneOver: boolean;

    @ViewChild('inputFile')
    public inputFile: ElementRef;

    @Input()
    public invoice: Invoice;
    @Input()
    public attachments: Blob[];
    @Input()
    public editMode: boolean;
    @Output()
    public attachmentsChange: EventEmitter<void> = new EventEmitter();
    @Output()
    public deleteFile: EventEmitter<string> = new EventEmitter();

    constructor(private alertService: SweetAlertService) {
    }

    ngOnInit() {
        if (!this.attachments) {
            this.attachments = [];
        }
        this.url = '/api/invoices/' + this.invoice._id + '/attachments';
        this.uploader = new FileUploader({autoUpload: false, url: this.url})
        this.uploader.response.subscribe( () => this.attachmentsChange.next());
    }

    public clickDropEvent(): void {
        this.dropdownBlock = !this.dropdownBlock;
    }

    public filesChange(): void {
        this.uploadAttachments();
    }

    uploadAttachments() {
        this.uploader.uploadAll();
    }

    public delete(fileToRemove): void {
        this.alertService
            .confirm({title: 'alert.confirm.deletion'})
            .then((accept) => {
                if (accept.value) {
                    this.deleteFile.emit(fileToRemove._id);
                }
            });
    }

    public fileOverBase(e: boolean): void {
        this.hasBaseDropZoneOver = e;
    }

    public openFileBrowser() {
        this.inputFile.nativeElement.click();
    }
}
