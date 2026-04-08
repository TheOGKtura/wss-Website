
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
let paginationValue;
let currentRecordCount = paginationValue
let page = 0;
let pagesCount;
let lastKey;

let tbody = document.getElementById("records-tbody");
const pageElememt = document.getElementById("records-page-info");
const prevContainer = document.getElementById("records-prev-container");
const nextContainer = document.getElementById("records-next-container");
const recordsCount = document.getElementById("records-count");

// INITIALIZE
recordsCount.innerHTML = `${paginationValue}`;
pageElememt.innerHTML = `Page ${page + 1}`;
disablePreviousButton(true)
disableNextButton()

// DATABASE
const SelectAllDataRealtime = () => {
    const dbRef = ref(db, '/devices/wss/quotas');
    onValue(dbRef, (snapshot) => {
        quotaList = [];
        snapshot.forEach(quota => {
        quotaList.push(quota.val());
        lastKey = quota.key;
        if (lastKey > 20) {
            paginationValue = 20;
        } else{
            paginationValue = lastKey;
        }
        });
        AddAllQuotas();
    })
}

const SelectAllDataRealtimeRecords = () => {
    const dbRef = ref(db, '/devices/wss/records');
    onValue(dbRef, (snapshot) => {
        recordList = [];
        snapshot.forEach(record => {
        recordList.push(reocrd.val());
        lastKey = record.key;
        });
        AddAllQuotas();
    })
}

nextContainer.addEventListener('click', (event) => {
    if (page == pagesCount) {
        disableNextButton();
    } else if (page < pagesCount) { 
        disablePreviousButton(false);
        page++;
    }

    if ((currentRecordCount + paginationValue) >= lastKey) {
        currentRecordCount = lastKey;
    } else {
        currentRecordCount += paginationValue;
    }

    console.log(currentRecordCount)
    recordsCount.innerHTML = `${currentRecordCount}`;
    updatePageCount(page);
    
    SelectAllDataRealtime();
});

prevContainer.addEventListener('click', (event) => {   
    if (page == 1) {
        disablePreviousButton();
        page--;
    } else {
        page--;
    }

    if (currentRecordCount == lastKey) {
        currentRecordCount = lastKey - (currentRecordCount - (paginationValue * (page + 1)));
    } else {
        currentRecordCount -= paginationValue;
    }

    recordsCount.innerHTML = `${currentRecordCount}`;
    updatePageCount(page);
    SelectAllDataRealtime();
});

const AddSingleQuota = (product_name, quota, totalOps = 0, production_shift, production_line, time, status) => {
    let trow = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');
    let totalCount = document.getElementById('total-count');

    const dateObject = new Date(time * 1000);

    td1.innerHTML = product_name;
    td2.innerHTML = quota;
    td3.innerHTML = totalOps;
    td4.innerHTML = production_shift;
    td5.innerHTML = production_line;
    td6.innerHTML = `${dateObject.toLocaleDateString()}`;

    totalCount.innerHTML = lastKey;
    recordsCount.innerHTML = 1;

    if (status == 2) {
        td7.innerHTML = `<span class=\"badge status-ok\"> Completed </span>`
    } else if (status == 1) {
        td7.innerHTML = `<span class=\"badge status-bad\"> In Progress </span>`
    } else {
        td7.innerHTML = `<span class=\"badge status-bad\"> Incomplete </span>`
    }

    trow.append(td1,td2,td3,td4,td5,td6,td7);
    tbody.append(trow);
}

const AddAllQuotas = () => {
    tbody.innerHTML = "";
    result = [];
    quotaList.reverse();

    console.log(paginationValue);
    for (let i = 0; i < quotaList.length; i += paginationValue) {
        const chunk = quotaList.slice(i, i + paginationValue);
        result.push(chunk);
    }

    pagesCount = result.length;

    if  (currentRecordCount < lastKey) {
        disableNextButton(false);
    }
    else {
        disableNextButton();
    }

    for (let i = 0; i < result[page].length; i++) {
        let quota = result[page][i];
        AddSingleQuota(quota.product_name, quota.quota, quota.totalOps, quota.production_shift, quota.production_line, quota.time, quota.status);
    }

    /*quotaList.forEach(quota => {
        AddSingleRecord(quota.product_name, quota.standard, quota.reading, quota.production_shift, quota.production_line, quota.operator, quota.time, quota.accepted);
    })*/
    //console.log(result);
}

function disablePreviousButton(state = true) {
    if (state == true) {
        prevContainer.innerHTML = `<button id="records-prev" disabled>Previous</button>`
    } else {
        prevContainer.innerHTML = `<button id="records-prev">Previous</button>`
    }
}

function disableNextButton(state = true) {
    if (state == true) {
        nextContainer.innerHTML = `<button id="records-next" disabled>Next</button>`
    } else {
        nextContainer.innerHTML = `<button id="records-next">Next</button>`
    }
}

function updatePageCount(num) {
    pageElememt.innerHTML = `Page ${num+1}`;
}

window.addEventListener('load', SelectAllDataRealtime());