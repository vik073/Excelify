import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsComponent implements OnInit {

  accountForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void
    {
        // Create the form
        this.accountForm = this.formBuilder.group({
            name    : ['Brian Hughes'],
            username: ['brianh'],
            title   : ['Senior Frontend Developer'],
            company : ['YXZ Software'],
            about   : ['Hey! This is Brian; husband, father and gamer. I\'m mostly passionate about bleeding edge tech and chocolate! 🍫'],
            email   : ['hughes.brian@mail.com', Validators.email],
            phone   : ['121-490-33-12'],
            country : ['usa'],
            language: ['english']
        });
    }

}
