
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";

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
    child,
    onValue,
    get
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js"

const db = getDatabase();

let quotaList = [];
let result = [];
let paginationValue, lastKey, setTime;
let currentRecordCount = paginationValue
let page = 0;
let todayQuotaCount = 0;

let tbody = document.getElementById("dashboard-quota-tbody");
const todayQuota = document.getElementById('metric-today-quota');
const currentShift = document.getElementById('metric-current-shift');

const morningTime = new Date(Date.now());
const afternoonTime = new Date(Date.now());
const eveningTime = new Date(Date.now());

morningTime.setHours(7,0,0,0);
afternoonTime.setHours(12,0,0,0);
eveningTime.setHours(17,0,0,0);

if (Date.now() > morningTime && Date.now() < afternoonTime && Date.now() < eveningTime) {
    currentShift.innerHTML = "Morning"
    setTime = "morning";
} else if (Date.now() > morningTime && Date.now() > afternoonTime && Date.now() < eveningTime) {
    currentShift.innerHTML = "Afternoon"
    setTime = "afternoon";
} else {
    currentShift.innerHTML = "Evening"
    setTime = "evening";
}

// DATABASE
const SelectAllDataRealtime = () => {
    const currentDate = new Date(Date.now());
    currentDate.setHours(0,0,0,0);

    const dbRef = ref(db, '/devices/wss/quotas');
    onValue(dbRef, (snapshot) => {
        quotaList = [];
        snapshot.forEach(quota => {
        if ((quota.val().time * 1000) > currentDate.getTime()) {
            quotaList.push(quota.val());
            lastKey = quota.key;
            if (lastKey > 5) {
                paginationValue = 5;
            } else{
                paginationValue = lastKey;
            }
        }
        });
        AddAllQuotas();
    })
}

const AddSingleQuota = (product_name, quota, totalOps = 0, production_shift, production_line, time, status) => {
    let trow = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');

    const dateObject = new Date(time * 1000);

    td1.innerHTML = product_name;
    td2.innerHTML = quota;
    td3.innerHTML = totalOps;
    td4.innerHTML = production_shift;
    td5.innerHTML = production_line;
    td6.innerHTML = `${dateObject.toLocaleDateString()}`;

    if (totalOps >= quota) {
        td7.innerHTML = `<span class=\"badge status-ok\"> Completed </span>`
    } else if (totalOps > 0 && totalOps < quota) {
        td7.innerHTML = `<span class=\"badge status-bad\"> In Progress </span>`
    } else {
        td7.innerHTML = `<span class=\"badge status-bad\"> Incomplete </span>`
    }

    trow.append(td1,td2,td3,td4,td5,td6,td7);
    tbody.append(trow);
}

export const AddAllQuotas = () => {
    tbody.innerHTML = "";
    result = [];
    quotaList.reverse();

    // console.log(paginationValue);
    for (let i = 0; i < quotaList.length; i += paginationValue) {
        const chunk = quotaList.slice(i, i + paginationValue);
        result.push(chunk);
    }

    for (let i = 0; i < result[page].length; i++) {
        let quota = result[page][i];
        if (quota.production_shift == setTime) {
            todayQuotaCount += quota.quota;
            todayQuota.innerHTML = todayQuotaCount;
            AddSingleQuota(quota.product_name, quota.quota, quota.totalOps, quota.production_shift, quota.production_line, quota.time);
        }
    }

    /*quotaList.forEach(quota => {
        AddSingleRecord(quota.product_name, quota.standard, quota.reading, quota.production_shift, quota.production_line, quota.operator, quota.time, quota.accepted);
    })*/
    //console.log(result);
}

export {
    todayQuotaCount
}
window.addEventListener('load', SelectAllDataRealtime());