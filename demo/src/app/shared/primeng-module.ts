import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import {ListboxModule} from 'primeng/listbox';
@NgModule({
  declarations: [],
  imports: [
    TableModule,
    CardModule,
    ListboxModule
  ],
  providers: [],
  exports: [ CardModule, ListboxModule ]
})
export class PrimeModule { }
