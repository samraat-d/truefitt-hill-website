/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '953504535160-7r3kjbbehvbq7bgovhds6rd8u9m9c583.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAq9ZXRA3xNJWnpL1gYrtPhQm1fURZ9Mj8';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false;
let gisInited = false;
let trialeventid = "cli6cp9kc4q64b9kclim4b9kclj62b9o6cq34b9o61hm4cj16gp38e9h70";
var currenteventid = "";

document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
gapi.load('client', intializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function intializeGapiClient() {
await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
});
gapiInited = true;
maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
});
gisInited = true;
maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
if (gapiInited && gisInited) {
    document.getElementById('authorize_button').style.visibility = 'visible';
}
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
    throw (resp);
    }
    document.getElementById('signout_button').style.visibility = 'visible';
    document.getElementById('authorize_button').innerText = 'Refresh';
    await listUpcomingEvents();
};

if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
} else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
}
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
    location.reload();
}

var fulleventdetails = []; var eventstring = "";

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
// Table Loop
var eventids = [];
async function listUpcomingEvents() {

var div = document.getElementById('google_table');
console.log("its working");
while(div.firstChild){
    div.removeChild(div.firstChild);
}
var table = document.createElement("table"), tr, td, row, cell;
table.className = "fl-table table-striped";
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');
fulleventdetails = []; eventids = []; currenteventid = "";

table.appendChild(thead);
table.appendChild(tbody);
let row_1 = document.createElement('tr');
let heading_1 = document.createElement('th');
heading_1.innerHTML = "Sr. No.";
let heading_2 = document.createElement('th');
heading_2.innerHTML = "Name";
let heading_3 = document.createElement('th');
heading_3.innerHTML = "Date";
let heading_4 = document.createElement('th');
heading_4.innerHTML = "Timing";
let heading_5 = document.createElement('th');
heading_5.innerHTML = "Barber";
let heading_6 = document.createElement('th');
heading_6.innerHTML = "Style";
let heading_7 = document.createElement('th');
heading_7.innerHTML = "Products Bought";
let heading_8 = document.createElement('th');
heading_8.innerHTML = "Membership";

row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
row_1.appendChild(heading_4);
row_1.appendChild(heading_5);
row_1.appendChild(heading_6);
row_1.appendChild(heading_7);
row_1.appendChild(heading_8);
thead.appendChild(row_1);
document.getElementById('google_table').appendChild(table);
var barber = []; var style = []; var dates = []; var startingtime = []; var endingtime = []; var membershiptype = []; var products = [];
let response;
try {
    const request = {
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 50,
    'orderBy': 'startTime',
    };
    response = await gapi.client.calendar.events.list(request);
} catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
}

const events = response.result.items;
if (!events || events.length == 0) {
    document.getElementById('content').innerText = 'No events found.';
    return;
}
// Flatten to string to display
const output = events.reduce(
    (str, event) => `${str} ${event.summary}) ${event.start.dateTime},${event.end.dateTime}) ${event.description})${event.id})\n`
    , '');
output.replace("undefined", " ");
for (x=2; x<output.split(")").length - 1; x=x+4){
    var desc = output.split(")")[x];
    var datestotal = output.split(")")[x-1];
    let dates2 = datestotal.split(",");
    dates.push(dates2[0].split("T")[0]); startingtime.push(dates2[0].split("T")[1].slice(0,5)); endingtime.push(dates2[1].split("T")[1].slice(0,5));
    let desc2 = desc.split(",");
    barber.push(desc2[0]); style.push(desc2[1]); products.push(desc2[2]); membershiptype.push(desc2[3]);
    eventids.push(output.split(")")[x+1].trim());
}
for (i=0; i<style.length; i++){
    if (style[i] == ""){
    style[i] = " ";
    }
}

var count = 0;
let i1 = 0;
for (row = 0; row < output.split("\n").length - 1; row++) {
    currenteventid = ""
    var fullevent = ""
    tr = document.createElement('tr');
    count = count + 1
    td = document.createElement('td');
    tr.appendChild(td);
    td.innerHTML = count
    td1 = document.createElement('td');
    tr.appendChild(td1);
    td2 = document.createElement('td');
    tr.appendChild(td2);
    td3 = document.createElement('td');
    tr.appendChild(td3);
    td4 = document.createElement('td');
    tr.appendChild(td4);
    td5 = document.createElement('td');
    tr.appendChild(td5);
    td6 = document.createElement('td');
    tr.appendChild(td6);
    td7 = document.createElement('td');
    tr.appendChild(td7);
    td1.innerHTML = output.split(")")[i1];
    td2.innerHTML = dates[count - 1];
    td3.innerHTML = startingtime[count - 1] + " To " + endingtime[count - 1];
    td4.innerHTML = barber[count - 1];
    td5.innerHTML = style[count - 1];
    td6.innerHTML = products[count - 1];
    if (td4.innerHTML == "undefined"){
    td4.innerHTML = " ";
    }
    currenteventid = eventids[count - 1];
    td7.innerHTML = membershiptype[count - 1];
    fullevent = output.split(")")[i1]+","+dates[count - 1] + "," + startingtime[count - 1] + " To " + endingtime[count - 1] + ","+barber[count - 1] + ","+style[count - 1];
    tbody.appendChild(tr);
    fulleventdetails.push(fullevent);
    i1 = i1+4;
}
localStorage.setItem("Events", JSON.stringify(fulleventdetails));
document.getElementById('google_table').appendChild(table);
document.getElementById('login-text').innerHTML = "<b>Appointments</b>";
document.getElementById('login-text2').innerHTML = " ";
}