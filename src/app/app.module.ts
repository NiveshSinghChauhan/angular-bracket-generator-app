import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FixtureTabComponent } from './components/fixture-tab/fixture-tab.component';
import { FixtureComponent } from './components/fixture/fixture.component';
import { PlayerListComponent } from './components/player-list/player-list.component';


@NgModule({
  declarations: [
    AppComponent,
    FixtureTabComponent,
    FixtureComponent,
    PlayerListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
