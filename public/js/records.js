
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
    get,
    set,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js"

const db = getDatabase();

let recordList = [];
let sno = 1;
let tbody = document.getElementById("records-tbody")

const SelectAllDataOnce = () => {
    "use strict"
    const dbRef = ref(db);
    get(child(dbRef, '/devices/wss/records')).then((snapshot) => {
        recordList = [];
        snapshot.forEach(record => {
        recordList.push(record.val());
        });
        AddAllRecords();
    })
}

const SelectAllDataRealtime = () => {
    const dbRef = ref(db, '/devices/wss/records');
    onValue(dbRef, (snapshot) => {
        recordList = [];
        snapshot.forEach(record => {
        recordList.push(record.val());
        });
        AddAllRecords();
    })
}

const AddSingleRecord = (product_name, standard, reading, production_shift, production_line, operator, time, accepted) => {
let trow = document.createElement('tr');
let td1 = document.createElement('td');
let td2 = document.createElement('td');
let td3 = document.createElement('td');
let td4 = document.createElement('td');
let td5 = document.createElement('td');
let td6 = document.createElement('td');
let td7 = document.createElement('td');
let td8 = document.createElement('td');
let td9 = document.createElement('td');
let td10 = document.createElement('td');

const dateObject = new Date(time * 1000);
var difference = Math.abs(standard.toFixed(2) - reading.toFixed(2)).toFixed(2);

td1.innerHTML = sno++;
td2.innerHTML = product_name;
td3.innerHTML = standard.toFixed(2);
td4.innerHTML = reading.toFixed(2);
td5.innerHTML = `±${difference}`
td6.innerHTML = production_shift;
td7.innerHTML = production_line;
td8.innerHTML = operator;
td9.innerHTML = `${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()}`;

if (accepted == true) {
    td10.innerHTML = `<span class=\"badge status-ok\"> Accepted </span>`
} else {
    td10.innerHTML = `<span class=\"badge status-bad\"> Rejected </span>`
}

trow.append(td1,td2,td3,td4,td5,td6,td7,td8,td9,td10);
tbody.append(trow);
}

const AddAllRecords = () => {
    sno = 1;
    tbody.innerHTML = "";
    recordList.forEach(record => {
        AddSingleRecord(record.product_name, record.standard, record.reading, record.production_shift, record.production_line, record.operator, record.time, record.accepted);
    })
}

window.addEventListener('load', SelectAllDataRealtime);