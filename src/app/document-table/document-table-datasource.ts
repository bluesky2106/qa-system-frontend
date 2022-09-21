import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Document } from '../core/models/document.model';

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Document[] = [
  {id: 1, title: 'Hydrogen', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 2, title: 'Helium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 3, title: 'Lithium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 4, title: 'Beryllium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 5, title: 'Boron', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 6, title: 'Carbon', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 7, title: 'Nitrogen', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 8, title: 'Oxygen', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 9, title: 'Fluorine', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 10, title: 'Neon', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 11, title: 'Sodium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 12, title: 'Magnesium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 13, title: 'Aluminum', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 14, title: 'Silicon', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 15, title: 'Phosphorus', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 16, title: 'Sulfur', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 17, title: 'Chlorine', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 18, title: 'Argon', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 19, title: 'Potassium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 20, title: 'Calcium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 21, title: 'Calcium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 22, title: 'Calcium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 23, title: 'Calcium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 24, title: 'Calcium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 25, title: 'Calcium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 26, title: 'Calcium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 27, title: 'Calcium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 28, title: 'Calcium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
  {id: 29, title: 'Calcium', subtitle: 'subtitle', url: 'example.com', content: 'content'},
];

/**
 * Data source for the DocumentTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DocumentTableDataSource extends DataSource<Document> {
  data: Document[] = [];
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Document[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Document[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Document[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
