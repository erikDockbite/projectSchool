import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import  * as moment  from "moment";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.AllPosts();
    
  }

  AllPosts() {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data.posts;
    })
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

}
