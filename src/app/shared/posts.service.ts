import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Post, FirebaseCreateResponse } from './interfaces'
import { environment } from 'src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.firebaseDatabaseUrl}/posts.json`, post).pipe(
      map((response: FirebaseCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date),
        }
      })
    )
  }
}
