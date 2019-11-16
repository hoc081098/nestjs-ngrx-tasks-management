import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/store.module';
import { CheckAuth } from './store/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngrx-tasks-management';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new CheckAuth());
  }
}
