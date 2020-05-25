import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../shared/interfaces';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  pSub: Subscription;
  searchStr = '';

  constructor(private PostsService: PostsService) { }

  ngOnInit() {
    this.PostsService.getAll().subscribe(posts =>{
      this.posts = posts
    })
  }
  remove(id: string){
    this.PostsService.remove(id).subscribe(()=>{
      this.posts = this.posts.filter(post => post.id !== id)
    })
  }
  ngOnDestroy(){
    if (this.pSub){
      this.pSub.unsubscribe()
    }
  }

}
