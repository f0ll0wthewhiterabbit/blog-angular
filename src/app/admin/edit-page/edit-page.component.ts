import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { switchMap } from 'rxjs/operators'
import { Subscription } from 'rxjs'

import { PostsService } from 'src/app/shared/posts.service'
import { Post } from 'src/app/shared/interfaces'

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup
  post: Post
  submitted = false
  updateSubscription: Subscription

  constructor(private route: ActivatedRoute, private postsService: PostsService) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params.id)
        })
      )
      .subscribe((post: Post) => {
        this.post = post
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        })
      })
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe()
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.updateSubscription = this.postsService
      .update({
        ...this.post,
        title: this.form.value.title,
        text: this.form.value.text,
      })
      .subscribe(() => {
        this.submitted = false
      })
  }
}
