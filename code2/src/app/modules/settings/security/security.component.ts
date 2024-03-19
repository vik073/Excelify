import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityComponent implements OnInit {

  securityForm: UntypedFormGroup;

  constructor(private _formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void
    {
        // Create the form
        this.securityForm = this._formBuilder.group({
            currentPassword  : [''],
            newPassword      : [''],
            twoStep          : [true],
            askPasswordChange: [false]
        });
    }

}
