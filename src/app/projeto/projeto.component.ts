import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-projeto',
	templateUrl: './projeto.component.html',
	styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit {
	projeto = {
		'todo': [],
		'doing': [],
		'done': []
	};
	public modalRef: BsModalRef;
	model: any = {
		title: '',
		description: '',
	};
	newColumn: '';
	newTask: any;
	key = '';

  	constructor(private modalService: BsModalService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		let id = this.route.snapshot.params.id;
		this.key = 'projectUser'+id;
		let projeto = localStorage.getItem(this.key);
		if(projeto !== null) {
			this.projeto = JSON.parse(projeto);
		}
	}

	addTask() {
		let task = {
			'title': this.model.title,
			'subtitle': this.model.description,
		};
		this.projeto[this.newColumn].push(task);
		this.modalRef.hide();
		this.model.title = '';
		this.model.description = '';
		this.saveStorage();
	}

	removeTask(task, column) {
		const index = this.projeto[column].indexOf(task);
        if (index > -1) {
            this.projeto[column].splice(index, 1);
        }
		this.saveStorage();
	}

	addTag(tag, type) {
		let newTag = {
			"tag": tag,
			"type": type
		};
		if(!this.newTask.tags) {
			this.newTask.tags = [];
			this.newTask.tags.push(newTag);
		} else {
			let control = 1;
			for (let index = 0; index < this.newTask.tags.length; index++) {
				const element = this.newTask.tags[index];
				if(element.tag === tag) {
					control = 0;
				}
			}
			if(control === 1) {
				this.newTask.tags.push(newTag);
			}
		}
		this.saveStorage();
	}

	removeTag(task, tag, column) {
		const indexTask = this.projeto[column].indexOf(task);
        if (indexTask > -1) {
			const indexTags = this.projeto[column][indexTask].tags.indexOf(tag);
			if (indexTags > -1) {
				this.projeto[column][indexTask].tags.splice(indexTags, 1);
			}
        }
		this.saveStorage();
	}

	public openModal(template, column, task = '') {
		this.newColumn = column;
		if(task !== '') {
			this.newTask = task;
		}
		this.modalRef = this.modalService.show(template);
	}

	drop(event: CdkDragDrop<string[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
		}
		this.saveStorage();
	}

	saveStorage() {
		localStorage.setItem(this.key, JSON.stringify(this.projeto));
	}

}
