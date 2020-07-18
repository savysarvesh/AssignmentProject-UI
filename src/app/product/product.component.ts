import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ProductReport } from '../productReport';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  filterForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
});
  get startDate() { return this.filterForm.get('startDate'); }
  get endDate() { return this.filterForm.get('endDate'); }
  ELEMENT_DATA:ProductReport[];
  pipe: DatePipe;
  dateRange: FormGroup;
  constructor(private service:ProductService) { 

  
  }
  displayedColumns: string[] = ['id', 'city', 'start_date', 'end_date', 'price','status', 'color'];
  dataSource = new MatTableDataSource<ProductReport>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit(): void {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllProducrReports();
   // this.dataSource.filterPredicate =
    //(data, filter: Date) => new Date(m.date) > startDate && new Date(m.date) < endDate;
  }

public getAllProducrReports(){
  let response=this.service.getTheProductList();
  response.subscribe(products=>this.dataSource.data=this.ELEMENT_DATA=products as ProductReport[])
}
 
getDateRange(value) {
  console.log(value);
  this.dataSource.data=this.ELEMENT_DATA;
  const fromDate = value.startDate;
  const toDate = value.endDate;
  if(fromDate!=null &&toDate!=null){
    this.dataSource.data = this.dataSource.data.filter(e=>new Date(e.start_date) > fromDate && new Date(e.end_date) < toDate );
 
  }else if(fromDate==null &&toDate!=null){
    this.dataSource.data = this.dataSource.data.filter(e=> new Date(e.end_date) < toDate );
  }else if(fromDate!=null &&toDate==null){
    this.dataSource.data = this.dataSource.data.filter(e=>new Date(e.start_date) > fromDate );
  }else{
    this.dataSource.data=this.ELEMENT_DATA;
  }
   console.log(fromDate, toDate);
}


applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
resetDateRange(value){
  value.startDate=null;
  value.endDate=null;
  this.dataSource.data=this.ELEMENT_DATA;
}
}
