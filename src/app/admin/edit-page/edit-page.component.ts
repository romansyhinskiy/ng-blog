///<reference path="../../../../node_modules/@angular/core/core.d.ts"/>
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit, OnDestroy {

    form: FormGroup;
    post: Post;
    submitted= false;

    uSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private postService: PostsService
    ) {
    }

    ngOnInit() {
        this.route.params.pipe(
            switchMap((params: Params) => {
                return this.postService.getById(params['id'])
            })
        ).subscribe((post: Post) => {
            this.post = post;
            this.form = new FormGroup({
                title: new FormControl(post.title, Validators.required),
                content: new FormControl(post.content, Validators.required)
            })
        })
    }
    ngOnDestroy(){
        if(this.uSub){
            this.uSub.unsubscribe()
        }
    }
    submit(){
        if (this.form.invalid){
            return
        }
        this.submitted = true;
        this.uSub = this.postService.update({
            ...this.post,
            title: this.form.value.title,
            content: this.form.value.content
        }).subscribe(()=>{
            this.submitted = false;
        })
    }
}

