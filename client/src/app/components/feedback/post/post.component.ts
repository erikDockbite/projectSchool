import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import  * as moment  from "moment";
import * as io from "socket.io-client";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  socket: any;
  posts = [];

  constructor(private postService: PostService) {
    this.socket = io('http://localhost:3000')
  }

  ngOnInit() {
    this.AllPosts();

    this.socket.on('refreshPage', (data) => {
      this.AllPosts();
    })
    
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
