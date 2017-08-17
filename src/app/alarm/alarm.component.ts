import { Component, OnInit, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';
import { AlarmModel } from './alarm.model';
import { ModalDirective, ComponentsHelper } from '../../../node_modules/ng2-bootstrap/ng2-bootstrap';
import { Observable } from 'rxjs/Rx';



@Component({
  selector: 'alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  title = 'Alarm';

  alarmModel: AlarmModel[] = [];
  alarmName: string;
  repeat: boolean = false;
  status: boolean = false;
  time: string;
  newTime: any;
  validCheck: boolean;
  alarmId:number;
  currentAlarm : AlarmModel;

  @ViewChild('informationModal') public informationModal: ModalDirective;
  @ViewChild('alarmModal') public alarmModal: ModalDirective;
  

  ngOnInit() {
    this.getAlarms();
    let timer = Observable.timer(1000, 1000);
    timer.subscribe(t => {
      this.checkTime(t);
    });
  }

  getAlarms() {
    var alarm = localStorage.getItem("alarm");
    if (!(alarm === 'undefined' || alarm.length == 0)) {
      this.alarmModel = JSON.parse(alarm);
      this.alarmModel.filter((eachAlarm : AlarmModel)=>{
        eachAlarm.displayTime = this.getDisplayTime(eachAlarm);
      })
    }
  }


  showAlarmDetails(selectedAlarm: AlarmModel, operation: string) {

    if(operation==='add'){
      this.alarmName = "";
      this.repeat = false;
      this.status = true;
      this.time = new Date().toString();
      this.alarmId=this.generateAlarmId()+1;
    }

    if (operation === 'edit') {
      this.alarmName = selectedAlarm.title;
      this.repeat = selectedAlarm.repeat;
      this.status = selectedAlarm.status;
      this.time = selectedAlarm.time;
      this.alarmId=selectedAlarm.id;
    }
    this.informationModal.show();

  }

  addAlarm() {

    var check: boolean = false;   

    if(this.time === undefined || this.time === null){
        return;
    }

    if(this.alarmName.trim().length<1){
      this.alarmName = this.generateAlarmName(this.time);
    }

     var obj: AlarmModel = { "title": this.alarmName, "repeat": this.repeat, "status": this.status, "time": this.time,"id":this.alarmId,"displayTime":"",tickStatus:false };
     obj.displayTime = this.getDisplayTime(obj);

    if (this.time != undefined) {
      this.alarmModel.filter((eachAlarm) => {
        if (eachAlarm.id == this.alarmId) {
          eachAlarm.status = this.status;
          eachAlarm.repeat = this.repeat;
          eachAlarm.time = this.time;
          eachAlarm.title=this.alarmName;
          eachAlarm.displayTime = this.getDisplayTime(eachAlarm);
          check = true;
        }
      })
      if (!check) {
        this.alarmModel.push(obj);
      }
      localStorage.setItem("alarm", JSON.stringify(this.alarmModel));
      this.informationModal.hide();
    }

  }

  checkTime(t: any) {

    if (this.alarmModel != undefined && this.alarmModel.length > 0) {

      var date = new Date();
      var currentTime = date.getHours() + "" + date.getMinutes()+ "" + date.getSeconds();
      this.alarmModel.filter((eachAlarm: AlarmModel) => {
        if (eachAlarm.status) {
          var alarmDate = new Date(eachAlarm.time);
          var alarmTime = alarmDate.getHours() + "" + alarmDate.getMinutes() + "0";          
          if (alarmTime == currentTime) {
            if(!eachAlarm.repeat){
              eachAlarm.status = false;
            }
            this.currentAlarm = eachAlarm;     
            this.alarmModal.show();
          } 
          localStorage.setItem("alarm",JSON.stringify(this.alarmModel));
        }
    })
  }
}

getDisplayTime(alarm : AlarmModel){
   var eachAlarmDate = new Date(alarm.time);
        var meridian = (eachAlarmDate.getHours()>=12) ? "PM" : "AM"; 
        var twelvehour = (eachAlarmDate.getHours()>12) ? eachAlarmDate.getHours()-12 : eachAlarmDate.getHours();
        var hour = (twelvehour.toString() == "0")? "12": twelvehour; 
        var hours = (hour.toString().length>1)?hour:"0"+hour;
        var minutes = (eachAlarmDate.getMinutes().toString().length>1)?eachAlarmDate.getMinutes():"0"+eachAlarmDate.getMinutes();
        return hours + " : " + minutes + " " + meridian;  

}

windowCloseFun(){
  this.informationModal.hide();
}

closeAlarm(){
  this.alarmModal.hide();
  
}

generateAlarmName(time : string){
  var date = new Date(time);
  if(date.getHours()<6){
    return 'Morning Alarm';
  } else if(date.getHours()<12){
    return 'Forenoon Alarm';
  } else if(date.getHours()<18){
    return 'Postnoon Alarm';
  } else {
    return 'Night Alarm';
  }
}

deleteAlarm(alarm : AlarmModel){
  var index = this.alarmModel.indexOf(alarm);
  this.alarmModel.splice(index,1);
  localStorage.setItem("alarm",JSON.stringify(this.alarmModel));
}

generateAlarmId(){
  return Math.max.apply(Math,this.alarmModel.map(function(o){return o.id;}))
}

}

