
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { todayQuotaCount } from "./dashboard-quota.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmhC2TTnWDCIVGiK1fd-2fhUmYd4pR_U0",
  authDomain: "wssthesis.firebaseapp.com",
  projectId: "wssthesis",
  storageBucket: "wssthesis.firebasestorage.app",
  messagingSenderId: "16731226665",
  appId: "1:16731226665:web:a90e3b699ac95333851238",
  databaseURL: "https://wssthesis-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);

import {
    getDatabase,
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js"

const db = getDatabase();

let sno, setTime;
let acceptedValue = 0;
let errorValue = 0;
let recordList = [];
let result = [];
let productRecordCount = 5;
let lastKey = 1;

console.log(todayQuotaCount);

const productStream = document.getElementById('dashboard-product-tbody');
const todayOps = document.getElementById('metric-today-operations');
const errorRatio = document.getElementById('metric-quality-rate');
const quotaCompletion = document.getElementById('metric-quota-completion');

const morningTime = new Date(Date.now());
const afternoonTime = new Date(Date.now());
const eveningTime = new Date(Date.now());

morningTime.setHours(7,0,0,0);
afternoonTime.setHours(12,0,0,0);
eveningTime.setHours(17,0,0,0);

if (Date.now() > morningTime && Date.now() < afternoonTime && Date.now() < eveningTime) {
    setTime = "morning";
} else if (Date.now() > morningTime && Date.now() > afternoonTime && Date.now() < eveningTime) {
    setTime = "evening";
} else {
    setTime = "evening";
}

const SelectAllDataRealtime = () => {
    const currentDate = new Date(Date.now());
    currentDate.setHours(0,0,0,0);
    
    const dbRef = ref(db, '/devices/wss/records');
    onValue(dbRef, (snapshot) => {
        recordList = [];
        //console.log("CURRENT TIME " + currentDate.getTime());
        snapshot.forEach(record => {
            //console.log(record.val().time * 1000);
        if ((record.val().time * 1000) > currentDate.getTime()) {
            recordList.push(record.val());
            lastKey = record.key;
        }
        });
        AddAllRecords();
    })
}

const AddSingleRecord = (product_name, standard, reading, production_line, time, accepted) => {
    let trow = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');

    const dateObject = new Date(time * 1000);
    
    var difference = Math.abs(standard.toFixed(2) - reading.toFixed(2)).toFixed(2);

    td1.innerHTML = product_name;
    td2.innerHTML = `${standard.toFixed(2)}g`;
    td3.innerHTML = `${reading.toFixed(2)}g`;
    td4.innerHTML = `±${difference}g`
    td5.innerHTML = production_line;
    td6.innerHTML = `${dateObject.toLocaleTimeString()}`;
    if (accepted == true) {
        td7.innerHTML = `<span class=\"badge status-ok\"> Accepted </span>`
        acceptedValue++;
    } else {
        td7.innerHTML = `<span class=\"badge status-bad\"> Rejected </span>`
        errorValue++;
    }

    errorRatio.innerHTML = `${((errorValue / sno) * 100).toFixed(2)}%`;
    quotaCompletion.innerHTML = `${acceptedValue}`;

    trow.append(td1,td2,td3,td4,td5,td6,td7);
    productStream.append(trow);
}

const AddAllRecords = () => {
    sno = 0;
    productStream.innerHTML = "";
    result = [];

    if (recordList.length > 0) {
        recordList.reverse();

        for (let i = 0; i < recordList.length; i += productRecordCount) {
            const chunk = recordList.slice(i, i + productRecordCount);
            result.push(chunk);
        }   

        for (let i = 0; i < productRecordCount; i++) {
            let record = result[0][i];
            sno++;
            todayOps.innerHTML = sno;
            AddSingleRecord(record.product_name, record.standard, record.reading, record.production_line, record.time, record.accepted);
            if (recordList.length < productRecordCount) {
                return
            }
        }
    } else {
        return
    }

    /*recordList.forEach(record => {
        AddSingleRecord(record.product_name, record.standard, record.reading, record.production_shift, record.production_line, record.operator, record.time, record.accepted);
    })*/
    //console.log(result);
}


window.addEventListener('load', SelectAllDataRealtime());