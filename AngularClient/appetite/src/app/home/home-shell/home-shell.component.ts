import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-home-shell',
    templateUrl: './home-shell.component.html',
    styleUrls: ['./home-shell.component.scss']
})
export class HomeShellComponent {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private authService: AuthService
    ) { }

    logout() {
        this.authService.logout();
    }
}
