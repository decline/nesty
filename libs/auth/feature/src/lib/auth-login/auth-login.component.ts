import { AuthFacade, queryParamRedirectToAfterLogin } from '@angular-nest/auth/data-access';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'angular-nest-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginComponent implements OnInit {
  constructor(private authFacade: AuthFacade, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const queryParams = this.activatedRoute.snapshot.queryParamMap;
    this.authFacade.login('decline', 'test', queryParams.get(queryParamRedirectToAfterLogin));
  }
}
