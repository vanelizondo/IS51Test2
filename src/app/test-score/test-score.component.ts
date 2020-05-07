import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';


export interface ITest {
  id: number;
  testName: string;
  pointsPossible: number;
  pointsReceived: number;
  percentage: number;
  grade: string;
}

@Component({
  selector: 'app-test-score',
  templateUrl: './test-score.component.html',
  styleUrls: ['./test-score.component.css']
})
export class TestScoreComponent implements OnInit {

  tests: Array<ITest> = [];
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    const tests = JSON.parse(localStorage.getItem('tests'));
    if (tests && tests.length > 0) {
      this.tests = tests;
    } else {
      this.tests = await this.loadTestsFromJson();
    }
  }
  async loadTestsFromJson() {
    const tests = await this.http.get('assets/tests.json').toPromise();
    return tests.json();
  }

  search() {
    const commaIndex = this.search.indexOf(', ');
    const firstName = this.search.slice(commaIndex, this.name.length);
    const lastName = this.search, 'commaIndex', commaIndex, 'firstName', firstName);
  }

  addTest() {
    const test: ITest = {
      id: null,
      testName: null,
      pointsPossible: null,
      pointsReceived: null,
      percentage: null,
      grade: null

    };
    this.tests.unshift(test);
    this.saveToLocalStorage();
  }

  deleteTest(index: number) {
    this.tests.splice(index, 1);
    this.saveToLocalStorage();
  }

  saveTest(index: number) {
    this.tests.unshift(test);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('tests', JSON.stringify(this.tests));
  }

  computeGrade() {
    const data = this.calculate();
    localStorage.setItem('calculatedData', JSON.stringify(data));
    this.router.navigate(['home']);
  }

  calculate() {
    let percentage = 0;
    for (let i = 0; i < this.tests.length; i++) {
      percentage += this.tests[i].percentage;
    }
    let pointsPossible = 0;
      for (let i = 0; i < this.tests.length; i++) {
        pointsPossible += this.tests[i].pointsPossible;
        }
        let finalGrade = 0;
        for (let i = 0; i < this.tests.length; i++) {
          finalGrade += this.tests[i].finalGrade;
        }

    }

  }




