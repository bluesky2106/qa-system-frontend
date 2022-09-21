import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Answer } from '../core/models/answer.model';
import { QuestionTableDataSource } from './question-table-datasource';

@Component({
  selector: 'app-question-table',
  templateUrl: './question-table.component.html',
  styleUrls: ['./question-table.component.scss']
})
export class QuestionTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Answer>;
  @Input() data: Answer[];
  dataSource: QuestionTableDataSource;
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['rank', 'id', 'title', 'url', 'answer', 'score'];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.dataSource = new QuestionTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.data = this.data;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.cdr.detectChanges();
  }
}
