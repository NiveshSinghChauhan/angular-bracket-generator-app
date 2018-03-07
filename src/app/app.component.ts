import { Component, ViewChild, ElementRef, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as Duel from 'duel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inputPlayers = new FormGroup({
    p1: new FormControl(null, [Validators.required]),
    p2: new FormControl(null, [Validators.required])
  });

  PLAYER_LIST: any[] = [];

  temp_fixture: any[] = [];
  FIXTURE: any[] = [];
  singles: any[] = [];

  constructor(
    private renderer: Renderer2
  ) {}

  // method to add players to the bracket
  AddPlayer(players) {
    // calling bracket generator
    this.BracketGenrator(players)

  }


  // reseting the data for creating new bracket
  newTournment() {
    this.PLAYER_LIST = [];
    this.FIXTURE = [];
  }

  BracketGenrator(pg) {
    // add the players group taken from input form and pushes it in an array
    this.PLAYER_LIST.push([pg.p1, pg.p2]);

    // reseting the form after getting the data
    this.inputPlayers.reset();

    // reseting temperory fixture array every time new player added
    this.temp_fixture = [];

    //  method responsible for making brackets array
    this.nextRounds(this.PLAYER_LIST)


    // removing the odd bracket from the 1st round
    const tempList = [...this.PLAYER_LIST];
    if ((this.PLAYER_LIST.length % 2) == 1 && this.PLAYER_LIST.length !== 1) {
      tempList.pop();
    }

    // putting the gerated bracket to the fixture array the wil be rendered in view
    this.FIXTURE = [tempList, ...this.temp_fixture]
  }

  nextRounds(LIST: any[], r = 1) {

    // varibale for organizing the the players temperory
    let fixture = [];
    let round = [];


    // checking if the its the last fixture of the barcket
    // if it is the pushing winner in the array to finish it
    //  and return from this method
    if (LIST.length == 1) {
      round.push(['winner']);
      this.temp_fixture.push([...round]);
      return;
    }

    // looping over every player in the List and making macth bracket and round bracket
    LIST.forEach((players, index) => {

      // genaterating single player fixture bracket
      round.push(`rd ${r}, mh ${index + 1} winner`);

      // after every 2 single player fixture we push the round array to fixture array
      if (!((index + 1) % 2)) {
        fixture.push([...round]);
        round = [];
      }

      //  if we encounter odd group of player we put it in singles array which will to used to
      //  put the odd group in  the next round
      if ((LIST.length % 2) && (index + 1) == LIST.length) {
        this.singles.push(players);
      }
    });

    // checking if the singles array have a player group
    if (this.singles.length > 0) {
      // this single player group comes from previous round

      // after checking we add it to the fixture
      // and pop it form singles array
      fixture.push(this.singles.pop());
    }


    //  removing the odd group of players
    //  which is already moved to next round
    const temp_fixt = [...fixture];
    if (fixture.length % 2 ) {
      if ((fixture.length % 2) == 1 && fixture.length !== 1) {
        temp_fixt.pop();
      }
    }

    //  pushing the generated round to the temerory fixture
    this.temp_fixture.push([...temp_fixt]);

    //  calling itself with the round genrated
    //  it call itself unit the round hase only 1 match
    //  the it return if match is 1 see at start of this method
    this.nextRounds(fixture, (r + 1));
  }

}
