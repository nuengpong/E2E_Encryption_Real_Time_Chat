import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, startWith, Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { DocumentService } from '../../services/document.service';

import { Document } from '../../models/document.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  documents!: Observable<string[]>;
  currentDoc!: string;
  document!: Document;
  private _fileSub!: Subscription;
  private _docSub!: Subscription;

  constructor(
    private documentService: DocumentService,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.documents = this.documentService.documents;
    this._fileSub = this.documentService.currentDocument.subscribe(doc => this.currentDoc = doc.id);

    this._docSub = this.documentService.currentDocument.pipe(
      startWith({ id: '', doc: 'Select an existing document or create a new one to get started' })
    ).subscribe(document => {
      this.document = document
      console.log('test');
    });
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  loadDoc(id: string) {
    console.log(id);
    this.documentService.getDocument(id);
  }

  newDoc() {
    this.documentService.newDocument();
  }

  editDoc() {
    this.documentService.editDocument(this.document);
  }
}