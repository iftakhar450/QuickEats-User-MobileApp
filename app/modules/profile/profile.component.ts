import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'profile',
    templateUrl: 'modules/profile/profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
    text: string = 'Profile Page';
}
