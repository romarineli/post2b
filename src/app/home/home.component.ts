import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public modalRef: BsModalRef;
	model: any = {
		title: '',
		description: '',
	};
	projetos = [];

	constructor(private modalService: BsModalService) {}

	ngOnInit(): void {
		let projetos = localStorage.getItem('projectsUser');
		if(projetos !== null) {
			this.projetos = JSON.parse(projetos);
		}
	}

	addProject() {
		let project = {
			'title': this.model.title,
			'description': this.model.description,
		};
		this.projetos.push(project);
		this.modalRef.hide();
		this.model.title = '';
		this.model.description = '';
		this.saveStorage();
	}

	removeProject(project) {
		const index = this.projetos.indexOf(project);
        if (index > -1) {
            this.projetos.splice(index, 1);
        }
		this.saveStorage();
		this.removeTasks(index);
	}

	public openModal(template) {
		this.modalRef = this.modalService.show(template);
	}

	saveStorage() {
		localStorage.setItem('projectsUser', JSON.stringify(this.projetos));
	}

	removeTasks(index) {
		localStorage.removeItem('projectUser'+index);
	}

}
