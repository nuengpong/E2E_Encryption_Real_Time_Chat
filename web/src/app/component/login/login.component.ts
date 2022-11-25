import { Component, OnInit } from '@angular/core'; 
import { Router, RouterOutletContract } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 

	username!: string;
	password!: string;

	constructor(
		private router: Router,
		private authService: AuthService
	) { }

	ngOnInit(): void { 
            // here we can use socket events and logineners using socketService
	} 

	login(): void {
		console.log(this.username, this.password);
		this.authService.login(this.username, this.password).subscribe({
			next: (res: any) => {
				this.router.navigate(['/']);
			},
			error: (err: any) => {
				console.log('ERROR');
				console.log(err);
			}
		});
		
	}
}



