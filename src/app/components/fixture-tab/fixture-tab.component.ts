import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fixture-tab',
  templateUrl: './fixture-tab.component.html',
  styleUrls: ['./fixture-tab.component.css']
})
export class FixtureTabComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('player') PLAYER: string;

  constructor() { }

  ngOnInit() {
  }

}
