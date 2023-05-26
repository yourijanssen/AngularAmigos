import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getSDG, getSubject } from 'src/app/models/testObject';
import { UploadService } from 'src/app/services/upload.service';
import { classType } from '../../alert/alert.component';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
    SDGs: getSDG[] = [];
    Subjects: getSubject[] = [];

    public ngOnInit(): void {
        this.useSubjectService();
        this.useSDGService();
    }

    private async useSDGService(): Promise<void> {
        this.SDGs = await this.uploadService.getSDGs();
        console.log(this.SDGs);
    }

    private async useSubjectService(): Promise<void> {
        this.Subjects = await this.uploadService.getSubjects();
        console.log(this.Subjects);
    }

    public cssClass: classType = classType.error;
    public errorMessage = '';
    public submitted = false;

    constructor(private fb: FormBuilder, private uploadService: UploadService, private router: Router) {}

    uploadForm = this.fb.group({
        contentTitle: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
        contentText: ['', [Validators.required, Validators.maxLength(1000), Validators.minLength(5)]],
        contentMedia: ['', [Validators.required]],
        dropdownSDG: ['', [Validators.required]],
        dropdownSubject: ['', [Validators.required]],
    });

    uploadContent() {
        if (this.uploadForm.valid) {
            this.cssClass = classType.success;
            this.errorMessage = 'Successfully uploaded!';
            this.submitted = true;

            this.uploadService.postUploadData(this.uploadForm).subscribe({
                next: (data) => console.log(data),
                error: (error) => console.error(error),
                complete: () => console.log('Completed'),
            });
            setTimeout(() => {
                this.router.navigate(['/home']);
            }, 1500);
        }
    }

    get contentTitle() {
        return this.uploadForm.get('contentTitle');
    }

    get contentText() {
        return this.uploadForm.get('contentText');
    }

    get contentMedia() {
        return this.uploadForm.get('contentMedia');
    }

    get dropdownSDG() {
        return this.uploadForm.get('dropdownSDG');
    }

    get dropdownSubject() {
        return this.uploadForm.get('dropdownSubject');
    }
}
