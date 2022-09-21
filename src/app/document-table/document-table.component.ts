import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DocumentTableDataSource } from './document-table-datasource';
import { Document } from '../core/models/document.model';
import { DocumentService } from '../core/services/document.service';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss']
})
export class DocumentTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Document>;
  dataSource: DocumentTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'subtitle', 'url', 'content'];
  private contentLengthLimit = 200;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.getAllDocuments().subscribe({
      next: data => {
        data.forEach(d => {
          let l = Math.min(d.content.length, this.contentLengthLimit);
          d.content = d.content.slice(0, l) + " ...";
        })
        this.dataSource = new DocumentTableDataSource();
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }
    })
  }

  ngAfterViewInit() { }

}
