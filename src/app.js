import { LightningElement, track, api } from 'lwc';

export default class App extends LightningElement {
    @api recordId;
    @api displayMode;
    @api sourceObject;
    @track memberList;
    @track headerRec;
    @track agencyList;
    @track valDateString;
    @track error;
    @track isLargeDisplay = true;
    @track divClass = "slds-m-left_x-large slds-m-right_x-large slds-p-top_large slds-p-bottom_large";
//    @track divClass = "slds-m-left_small slds-m-right_small slds-p-top_small slds-p-bottom_small";
//            <div if:true={isLargeDisplay} class="slds-m-left_x-large slds-m-right_x-large slds-p-top_large slds-p-bottom_large">

connectedCallback(){
    this.isLargeDisplay = false;
    this.divClass = "slds-m-left_small slds-m-right_small slds-p-top_small slds-p-bottom_small";

    let headerRecord = {}; //JSON.parse(data);
//    let effDate = new Date(headerRecord.effDate);
    let today = new Date();
    headerRecord.oppName = 'Some Opp';
    headerRecord.state = 'KY';
    headerRecord.effDateString = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    headerRecord.valDateString = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    headerRecord.title = 'Validation Results:  ' + headerRecord.oppName + ' for: ' + headerRecord.state;

    headerRecord.statusIcon = 'standard:task2';
    headerRecord.statusText = 'Valid';
    headerRecord.statusClass = 'slds-text-color_success';
    this.headerRec = headerRecord;

//    let memList = {SAN : "13", complianceStatus : "AGENT IS NOT Compliant", email : "cjha@humana.com", error : "", memberName : "Chandan Jha", productLine : 1, productLineDesc : "Medical", role : "Territory Member", validationDate: "2020-05-26T00:00:00.000Z", validationStatus : "Red"};
//    let memList = [];
    let agentList = []; //agency list


var member = {
    init: function (SAN, complianceStatus,email,error,memberName,productLine,productLineDesc,role,validationDate,validationStatus) {
        this.SAN = SAN;
        this.complianceStatus = complianceStatus;
        this.email = email;
        this.error = error;
        this.memberName = memberName;
        this.productLine = productLine;
        this.productLineDesc = productLineDesc;
        this.role = role;
        this.validationDate = validationDate;
        this.validationStatus = validationStatus;
    },
};

var member1 = Object.create(member);
member1.init("13","AGENT IS NOT Compliant","cjha@humana.com","","Chandan Jha",1,"Medical","Territory Member","2020-05-26T00:00:00.000Z","Red");
var member2 = Object.create(member);
member2.init("14","AGENT IS NOT Compliant","cjha@humana.com","","David Baker",1,"Medical","Territory Member","2020-05-26T00:00:00.000Z","Green");
var member3 = Object.create(member);
member3.init("15","AGENT IS NOT Compliant","cjha@humana.com","","Chandan Jha",2,"Dental","Territory Member","2020-05-26T00:00:00.000Z","Green");

var memList = [];
memList.push(member1);
memList.push(member2);
memList.push(member3);

console.log('memList=' + memList);

this.setColors(memList); //set the color attributes for the status field
memList = this.addProductBreaks(memList); //add page break property for both arrays

    this.memberList = memList;
}

    addProductBreaks(memList) {
        let currProduct = 0;
        for (let i = 0; i < memList.length; i++) { //add breaks for product changes
            if (currProduct !== memList[i].productLine && currProduct !== 0) {
                memList[i].newProduct = true;
            }
            currProduct = memList[i].productLine; //only switch product lines if
        }
        return memList;
    }
    setColors(memList) {
        for (let i = 0; i < memList.length; i++) {
            switch (memList[i].validationStatus) {
                case 'Red':
                    memList[i].icon = 'standard:first_non_empty';
                    memList[i].status = 'No';
                    memList[i].class = 'slds-text-color_error';
                    break;
                case 'Yellow':
                    memList[i].icon = 'standard:question_feed';
                    memList[i].status = 'Yes';
                    memList[i].style = 'color:#9B870d;';
                    break;
                case 'Green':
                    memList[i].icon = 'standard:task2';
                    memList[i].status = 'Yes';
                    memList[i].class = 'slds-text-color_success';
                    break;
                case 'Orange':
                    memList[i].icon = 'standard:campaign';
                    memList[i].status = 'Yes - 26 Day Rule';
                    memList[i].style = 'color:#F49756;';
                        break;
                default:
                    break;
            }
        }
    }
}
