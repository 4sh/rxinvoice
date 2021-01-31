import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Blob} from '../../../../domain/blob';
import {FileUploader} from 'ng2-file-upload';
import {SweetAlertService} from '../../../shared/services/sweetAlert.service';
import {Invoice} from '../../../../domain/invoice/invoice';
import * as _ from 'lodash';

@Component({
    selector: 'attachments-detail',
    templateUrl: './attachments-detail.component.html',
    styleUrls: ['./attachments-detail.component.scss']
})
export class AttachmentsDetailComponent {

    public dropdownBlock: boolean;
    public url: string;
    public hasBaseDropZoneOver: boolean;
    public _invoice: Invoice;
    public attachmentsToRemove: string[] = [];

    @ViewChild('inputFile')
    public inputFile: ElementRef;

    @Input()
    public get invoice(): Invoice {
        return this._invoice;
    };
    public set invoice(invoice: Invoice) {
        this._invoice = invoice;
        this.attachments = invoice.attachments ? _.cloneDeep(invoice.attachments) : [];
    }
    @Input()
    public attachments: Blob[];
    @Input()
    public editMode: boolean;
    @Input()
    public uploader: FileUploader;
    @Output()
    public deleteFiles: EventEmitter<string[]> = new EventEmitter();

    constructor(private alertService: SweetAlertService) {
    }

    public clickDropEvent(): void {
        this.dropdownBlock = !this.dropdownBlock;
    }

    public filesChange(): void {
        this.uploader.queue.map((fileItem) => {
            this.attachments.push({
                _id: '',
                comments: '',
                fileName: fileItem._file.name,
                mimeType: fileItem._file.type,
                number: fileItem._file.lastModified,
                sizeInBytes: fileItem._file.size
            });
        });
    }

    public delete(fileToRemove): void {
        const blob = this.attachments.filter((blob) => blob.fileName === fileToRemove.fileName)[0];
        this.attachments.splice(this.attachments.indexOf(blob), 1);
        if (fileToRemove._id) {
            this.attachmentsToRemove.push(fileToRemove._id);
            this.deleteFiles.emit(this.attachmentsToRemove);
        }
    }

    public fileOverBase(e: boolean): void {
        this.hasBaseDropZoneOver = e;
    }

    public openFileBrowser() {
        this.inputFile.nativeElement.click();
    }
}
