import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent implements OnInit {

  notificationsForm: UntypedFormGroup;
  constructor(private _formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void
    {
        // Create the form
        this.notificationsForm = this._formBuilder.group({
            communication: [true],
            security     : [true],
            meetups      : [false],
            comments     : [false],
            mention      : [true],
            follow       : [true],
            inquiry      : [true]
        });
    }

}
