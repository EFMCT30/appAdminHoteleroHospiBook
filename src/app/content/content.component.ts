import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  isProfileRoute: boolean = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isProfileRoute = this.route.snapshot.routeConfig?.path === 'profile';
  }
}
