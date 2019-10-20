import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject, merge, of } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter, switchMap, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'github-search';
  @ViewChild('movieSearch',null) movieSearch: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();


  searchTermModel: any;
  full_name:any=[];
  totalRepoCount:any;
  isClick:boolean=true;
  search: (text$: Observable<string>) => Observable<any>;

  constructor(
    private httpClient: HttpClient
  ) {
  }
  ngOnInit() {
    console.log("hi")
    // this.searchGetCall();
    // this.search = (text$: Observable<string>) =>
    // text$.pipe(
    //   debounceTime(200),
    //   map(term => term === '' ? []
    //     : this.full_name.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    // )
  }

  

  searchRepo(name:any) {
     this.httpClient.get('https://api.github.com/search/repositories?q='+name.searchText).subscribe(
      response => {
        this.totalRepoCount= response['total_count'];
        if(response['items'].length>0)
        {
      for(var i =0;i<response['items'].length;i++)
      {
        let singleJson = {
          name:response['items'][i].full_name,
          avatar:response['items'][i].owner.avatar_url,
          description:response['items'][i].description,
          html_url:response['items'][i].html_url,
          owner:response['items'][i].name,
          updated:response['items'][i].updated_at,
          starCount:response['items'][i].stargazers_count,
          starUrl:response['items'][i].stargazers_url,
        }
        this.isClick = false
        this.full_name.push(singleJson);
        
      }
    }
      console.log(this.full_name);
      }
    );
  }
}
