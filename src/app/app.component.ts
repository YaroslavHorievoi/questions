import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "./shared/services/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Question Ticket';

  constructor(
      private lsService: LocalStorageService,
  ) {
  }

  public ngOnInit(): void {
    this.lsService.setQuestionsKey();
  }
}
