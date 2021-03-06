import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExitReqResultType, EnterReqResultType, ReserveResultType, AboutToExitResultType } from '../model/user-action';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {
  private dialogTitle: string = "";
  private dialogMessage: string = "";


  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    this.dialogTitle = this.createDialogTitle();
    this.dialogMessage = this.createDialogMessage();
  }

  createDialogTitle(): string {
    let title;


    if(this.data.errorMsg != null) {
      title = "ארעה שגיאה"
    }
    else{
      if (this.data.isSimulator) {
        if (this.data.actionType == 1) {
          title = "ברוכים הבאים"
        } else {
          title = "צאתכם לשלום";
        }
      } else {
        if (this.data.actionType == 1) {
          title = "שריון חניה";
        } else {
          title = "פינוי חניה";
        }
      }
    }

    return title;
  }

  createDialogMessage(): string {
    let message = "";

    if(this.data.errorMsg != null) {
      message = this.data.errorMsg;
    }
    else {
      if (this.data.isSimulator) 
      {
        if (this.data.funcType == "getOut") {
          if(this.data.response == ExitReqResultType.exitAllowed){
            message = `${ this.data.userName }, יצאת מ-${ this.data.parkingLotName }`;
          }
          else if (this.data.response == ExitReqResultType.NotInAnyParkingLot){ //ExitReqResultType.NotInAnyParkingLot
            message = `${ this.data.userName }, אינך חונה באף חניון`;
          }
          else {//ExitReqResultType.InAnotherParkingLot
            message = `${ this.data.userName }, אינך ב-${ this.data.parkingLotName }`;
          }
        } 
        else if (this.data.funcType == "getIn") {
          if(this.data.response == EnterReqResultType.enterAllowed){
            message = `${ this.data.userName }, נכנסת ל-${ this.data.parkingLotName }`;
          }
          else if(this.data.response == EnterReqResultType.NoFreePlaces){
            message = `${ this.data.userName }, מצטערים, אין חניה ב-${ this.data.parkingLotName }`;
          }
          else if(this.data.response == EnterReqResultType.AlreadyParkedHere){
            message = `${ this.data.userName }, מצטערים, את/ה כבר חונה ב-${ this.data.parkingLotName }`;
          }
          else if(this.data.response == EnterReqResultType.AlreadyParkedInOther){
            message = `${ this.data.userName }, מצטערים, את/ה כבר חונה בחניון אחר`;
          }
          else if(this.data.response == EnterReqResultType.ReservedPlaceInOther){
            message = `${ this.data.userName }, מצטערים, כבר שריינת חניה מול בחניון אחר`;
          }
          else{ //EnterReqResultType.shouldWait
            message = `${ this.data.userName }, החניה השמורה לך עדיין לא התפנתה ב-${ this.data.parkingLotName }`;
          }
        }
      } 
      else 
      {
        if (this.data.funcType == "reserveParking") 
        {
          if(this.data.response == ReserveResultType.Reserved){
            message = `החניה ב-${ this.data.parkingLotName } שוריינה בהצלחה ל-${ this.data.userName }.`;
          }
          else if(this.data.response == ReserveResultType.AlreadyReservedOther){
            message = `${ this.data.userName }, מצטערים, כבר שריינת חנייה`;
          }
        }
        else if(this.data.funcType == "exitFromParking"){
          if(this.data.response == AboutToExitResultType.Done){
            message = `${ this.data.userName }, תודה שעדכנת על כוונתך לפנות את החניה מ-${ this.data.parkingLotName }.`;;
          }
          else if(this.data.response == AboutToExitResultType.AlreadyAboutToExit){
            message = `${ this.data.userName }, תודה, אך כבר הודעת על פינוי חנייה`;
          }
        }
      }
    }

    return message;
  }

  onOKClick(): void {
    this.dialogRef.close();
  }
}
