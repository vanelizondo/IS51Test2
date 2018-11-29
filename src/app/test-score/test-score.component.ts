import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface ITest {
  id?: number;
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
  myName = '';
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.tests = await this.loadTests();
  }

  deleteTest(index: number) {
    this.tests.splice(index, 1);
    this.saveToLocalStorage();
  }
  async loadTests() {
    const testData = JSON.parse(localStorage.getItem('test-data'));
    if (testData && testData.length > 0) {
      this.tests = testData;
      return testData;
    } else {
      const data = await this.loadFromFile();
      this.tests = data;
      return data;
    }
  }

  async loadFromFile() {
    const x = await this.http.get('assets/tests.json').toPromise();
    return x.json();
  }

  saveItem() {
    this.saveToLocalStorage();
    this.toastService.showToast('success', 7000, 'Success: Items saved!');
  }
  saveToLocalStorage() {
    localStorage.setItem('test-data', JSON.stringify(this.tests));
  }

  addTest() {
    this.tests.unshift({
      id: null,
      testName: null,
      pointsPossible: null,
      pointsReceived: null,
      percentage: null,
      grade: null
    });
    this.saveToLocalStorage();
  }

  compute() {
    const pointsPossible = this.tests.reduce((prev, item) => prev += item.pointsPossible, 0);
    const pointsReceived = this.tests.reduce((prev, item) => prev += item.pointsReceived, 0);
    const percentage = (pointsReceived / pointsPossible).toFixed(2);
    const data = {
      pointsPossible,
      pointsReceived,
      percentage,
      name: this.setName(),
      grade: this.computeGrade(percentage)
    };

    if (this.myName === '') {
      this.toastService.showToast('warning', 7000, 'Name must not be null');
    } else if (this.myName.indexOf(', ') === -1) {
      this.toastService.showToast('warning', 7000, 'Name must contain a comma and a space');
    } else {
      localStorage.setItem('test-data', JSON.stringify(data));
      this.router.navigate(['home', data]);
    }

  }

  setName() {
    const commaIndex = this.myName.indexOf(', ');
    const firstName = this.myName.slice(commaIndex + 1, this.myName.length);
    const lastName = this.myName.slice(0, commaIndex);
    return firstName + ' ' + lastName;
  }

  computeGrade(score) {
    // let grade;
    // switch (true) {
    //   case score >= .90:
    //     grade = 'A';
    //     break;
    //   case score >= .80:
    //     grade = 'B';
    //     break;
    //   case score >= .70:
    //     grade = 'C';
    //     break;
    //   case score >= .60:
    //     grade = 'D';
    //     break;
    //   default:
    //     grade = 'F';
    //     break;
    // }
    // return grade;
    let grade = '';
    if (score >= .90) {
      grade = 'A';
    } else if (score >= .80) {
      grade = 'B';
    } else if (score >= .70) {
      grade = 'C';
    } else if (score >= .60) {
      grade = 'D';
    } else {
      grade = 'F';
    }
    return grade;
  }

}
