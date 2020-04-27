import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { PostsService } from 'src/app/shared/posts.service'
import { Post } from 'src/app/shared/interfaces'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = []
  postsSubscription: Subscription
  searchStr = ''

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsSubscription = this.postsService.getAll().subscribe((posts) => {
      this.posts = posts
    })
  }

  remove(id: string) {}

  ngOnDestroy() {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe()
    }
  }
}
