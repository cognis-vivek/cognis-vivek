import { Component, OnInit } from '@angular/core';
import { ChildData } from '../pojos/children_details';
import { DataExchangeService } from '../providers/data-exchange.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocalServicesService } from '../providers/local-services.service';
import { SchoolData } from '../pojos/school_details';
import { LoadingController } from '@ionic/angular';
import { ExamSchedule } from '../model/exam_schedule';

@Component({
  selector: 'app-examschedule',
  templateUrl: './examschedule.page.html',
  styleUrls: ['./examschedule.page.scss'],
})
export class ExamschedulePage implements OnInit {
  childDataArr: ChildData[] = [];
  localServicesService: LocalServicesService;
  error: any;
  data: any;
  examScheduleArr: ExamSchedule[] = [];
  childId: any;
  childName: any;
  schoolData: SchoolData;
  childData: ChildData;
  constructor(
    private router: Router,
    private http: HttpClient,
    public loadingControler: LoadingController,
    private dataExchangeService: DataExchangeService){
      this.data = '',
      this.error = '',
      this.localServicesService = new LocalServicesService(this.http);
      
    }

  ngOnInit() {

  }
  goBack() {
    history.back();
  }
  async ionViewWillEnter() {
     this.childData = this.dataExchangeService.getChildData();
     this.childName = this.childData.getStudentName();
     this.childId = this.childData.getStudentId();
     this.schoolData = this.dataExchangeService.getSchoolData();
     this.childDataArr = [];
     this.childDataArr = this.dataExchangeService.getChildArr();
     console.log('childInfo', this.childDataArr);
     const loading = await this.loadingControler.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
     this.localServicesService.getExamScheduleData(
      this.localServicesService.examSchedule,
      this.childId,
      this.schoolData.getSchoolId()
      ).subscribe((resData: Response) => {
       let parsed = JSON.parse(JSON.stringify(resData));
       this.data = JSON.stringify(resData);
       JSON.parse(this.data, async (key, value) => {
         if (typeof key === 'string'){
           if (key.toString() === 'examSchedule'){
             this.dataExchangeService.examScheduleArr = [];
             // tslint:disable-next-line: prefer-for-of
             for (let i = 0; i < parsed.examSchedule.length; i++){
                   this.dataExchangeService.storeExamScheduleData(new ExamSchedule(
                     parsed.examSchedule[i].examDate,
                     parsed.examSchedule[i].subjectId,
                     parsed.examSchedule[i].subjectName,
                     parsed.examSchedule[i].startTime,
                     parsed.examSchedule[i].endTime
                   ));
             }
             this.examScheduleArr = [];
             this.examScheduleArr = this.dataExchangeService.getExamScheduleData();
             console.log('data', this.examScheduleArr);
             await loading.onDidDismiss();
           }
         }
       });
      },
      async err => {
        await loading.onDidDismiss();
        // tslint:disable-next-line: no-unused-expression
        this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      }
      );
    console.log('Error', this.error);
  }

  // Selecting child from drop down
  async selectChild(event){
    for (let i = 0; i < this.childDataArr.length; i++) {
      if (event.target.value === this.childDataArr[i].getStudentName()){
        this.childId = this.childDataArr[i].getStudentId();
        // this.localServicesService.getExamScheduleData(
        //   this.localServicesService.examSchedule,
        //   this.childId,
        //   this.schoolData.getSchoolId()
        //   ).subscribe((resData: Response) => {
        //    let parsed = JSON.parse(JSON.stringify(resData));
        //    this.data = JSON.stringify(resData);
        //    JSON.parse(this.data, (key, value) => {
        //      if (typeof key === 'string'){
        //        if (key.toString() === 'examSchedule'){
        //          this.dataExchangeService.examScheduleArr = [];
        //          // tslint:disable-next-line: prefer-for-of
        //          for (let i = 0; i < parsed.examSchedule.length; i++){
        //                this.dataExchangeService.storeExamScheduleData(new ExamSchedule(
        //                  parsed.examSchedule[i].examDate,
        //                  parsed.examSchedule[i].subjectId,
        //                  parsed.examSchedule[i].subjectName,
        //                  parsed.examSchedule[i].startTime,
        //                  parsed.examSchedule[i].endTime
        //                ));
        //          }
        //          this.examScheduleArr = [];
        //          this.examScheduleArr = this.dataExchangeService.getExamScheduleData();
        //          console.log('data', this.examScheduleArr);
        //        }
        //      }
        //    });
        //   },
        //   err => {
        //     // tslint:disable-next-line: no-unused-expression
        //     this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
        //   }
        //   );
        // console.log('Error', this.error);
      }
    }
  }
  examSchedule(){

  }

  // tslint:disable-next-line: member-ordering
  Exam = "Half yearly examination Sep, 2020";

}
