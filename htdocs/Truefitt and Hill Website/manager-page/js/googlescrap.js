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
      document.getElementById('create_button').style.visibility = 'hidden';
      document.getElementById('add2db').style.visibility = 'hidden';


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

      function showUserCreateBox() {
        Swal.fire({
          title: 'Create User',
          html:
            '<input id="name" class="swal2-input" placeholder="Name">' +
            '<input id="newdate" class="swal2-input" placeholder="Date (YYYY-MM-DD)">' +
            '<input id="stime" class="swal2-input" placeholder="Start Time (00:00)">' +
            '<input id="etime" class="swal2-input" placeholder="End Time (00:00)">' +
            '<input id="barber" class="swal2-input" placeholder="Barber">' +
            '<input id="style" class="swal2-input" placeholder="Style">' + 
            '<input id="product" class="swal2-input" placeholder="Products Bought">' +
            '<input id="newmembership" class="swal2-input" placeholder="Membership Type">',
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
            'Create',
          confirmButtonAriaLabel: 'Create',
          cancelButtonText:
            'Cancel',
          cancelButtonAriaLabel: 'Cancel',
          preConfirm: () => {
            userCreate();
          }
        })
      }

      function showUserEditBox(eventid) {
        var eventidactual = eventid.split(",")[0];
        Swal.fire({
          title: 'Edit User',
          html:
          '<input id="namee" class="swal2-input" placeholder="Name">' +
          '<input id="newdatee" class="swal2-input" placeholder="Date (YYYY-MM-DD)">' +
          '<input id="stimee" class="swal2-input" placeholder="Start Time (00:00)">' +
          '<input id="etimee" class="swal2-input" placeholder="End Time (00:00)">' +
          '<input id="barbere" class="swal2-input" placeholder="Barber">' +
          '<input id="stylee" class="swal2-input" placeholder="Style">' +
          '<input id="producte" class="swal2-input" placeholder="Products Bought">' +
          '<input id="newmembershipe" class="swal2-input" placeholder="Membership Type">',
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
            'Edit',
          confirmButtonAriaLabel: 'Edit',
          cancelButtonText:
            'Cancel',
          cancelButtonAriaLabel: 'Cancel',
          preConfirm: () => {
            userEdit(eventid);
            deleteEventforEdit(eventidactual);
          }
        })
      }

      function showUserQueryBox() {
        Swal.fire({
          title: 'Query',
          html:
          '<input id="nameq" class="swal2-input" placeholder="Name">' +
          '<input id="newdateq" class="swal2-input" placeholder="Date (YYYY-MM-DD)">' +
          '<input id="stimeq" class="swal2-input" placeholder="Start Time (00:00)">' +
          '<input id="etimeq" class="swal2-input" placeholder="End Time (00:00)">' +
          '<input id="barberq" class="swal2-input" placeholder="Barber">' +
          '<input id="styleq" class="swal2-input" placeholder="Style">' +
          '<input id="newmembershipq" class="swal2-input" placeholder="Membership Type">',
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
            'Query',
          confirmButtonAriaLabel: 'Query',
          cancelButtonText:
            'Cancel',
          cancelButtonAriaLabel: 'Cancel',
          preConfirm: () => {
            userQuery();
          }
        })
      }

      function userQuery() {
        var name = document.getElementById("nameq").value;
        var newdate = document.getElementById("newdateq").value;
        var stime = document.getElementById("stimeq").value;
        var etime = document.getElementById("etimeq").value;
        var barber = document.getElementById("barberq").value;
        var style = document.getElementById("styleq").value;
        var newmembership = document.getElementById("newmembershipq").value;
        if (name == "Name" || name == null || name == ""){
          name = "Boy";
        }
        eventstring = name + newdate + stime + etime + barber + style + newmembership;
        document.getElementById('query').innerHTML = eventstring;    
      }


      var resource;
      function userCreate() {
        var name = document.getElementById("name").value;
        var newdate = document.getElementById("newdate").value;
        var stime = document.getElementById("stime").value;
        var etime = document.getElementById("etime").value;
        var barber = document.getElementById("barber").value;
        var style = document.getElementById("style").value;
        var product = document.getElementById("product").value;
        var newmembership = document.getElementById("newmembership").value;

        resource = {
            'summary': name.toString(),
            'location': '',
            'description': barber.toString() + ", " + style.toString() + ", " + product.toString() + ", " + newmembership.toString(),
            'start': {
              'dateTime': newdate.toString() + "T" + stime.toString() + ":00+05:30",
              'timeZone': 'Asia/Kolkata'
            },
            'end': {
              'dateTime': newdate.toString() + "T" + etime.toString() + ":00+05:30",
              'timeZone': 'Asia/Kolkata'
            },
            'recurrence': [
            ],
            'attendees': [],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          };

        makeRequest();
        handleAuthClick();
      }

      function userEdit(eventid) {
        var name = document.getElementById("namee").value;
        var newdate = document.getElementById("newdatee").value;
        var stime = document.getElementById("stimee").value;
        var etime = document.getElementById("etimee").value;
        var barber = document.getElementById("barbere").value;
        var style = document.getElementById("stylee").value;
        var product = document.getElementById("producte").value;
        var newmembership = document.getElementById("newmembershipe").value;

        if (name == "Name" || name == null){
          name = eventid.split(",")[1];
        }
        if (newdate == "Date (YYYY-MM-DD)" || newdate == null){
          newdate = eventid.split(",")[2].slic(1,);
        }
        if (barber == "Barber" || barber == null){
          barber = eventid.split(",")[4].trim();
        }
        if (style == "Style" || style == null){
          style = eventid.split(",")[5].trim();
        }
        if (newmembership == "Membership Type" || newmembership == null){
          newmembership = eventid.split(",")[6].trim();
        }

        resource = {
            'summary': name.toString(),
            'location': '',
            'description': barber.toString() + ", " + style.toString() + ", " + product.toString() + ", " + newmembership.toString(),
            'start': {
              'dateTime': newdate.toString() + "T" + stime.toString() + ":00+05:30",
              'timeZone': 'Asia/Kolkata'
            },
            'end': {
              'dateTime': newdate.toString() + "T" + etime.toString() + ":00+05:30",
              'timeZone': 'Asia/Kolkata'
            },
            'recurrence': [
            ],
            'attendees': [],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          };

        makeRequest();
      }

      function makeRequest() {
        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': resource
        });
        request.execute(function(resource) {
          if(response.error || response == false){
            alert('Error!');
        }
          else{
            alert('Success!');               
        }
        });
      }

      function deleteEvent(eventid) {
        gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.delete({
            'calendarId': 'primary',
            'eventId': eventid.toString()
          });
        request.execute(function(response) {
            if(response.error || response == false){
                alert('Error');
            }
            else{
                alert('Success');
                handleAuthClick();               
            }
          });
        });
      }

      function deleteEventforEdit(eventid) {
        gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.delete({
            'calendarId': 'primary',
            'eventId': eventid.toString()
          });
        request.execute(function(response) {
            if(response.error || response == false){
                alert('Error');
            }
            else{
                alert('Success');
                handleAuthClick();               
            }
          });
        });
      }

      function deleteEventforMultiple(eventid) {
        gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.delete({
            'calendarId': 'primary',
            'eventId': eventid.toString()
          });
        request.execute(function(response) {
            if(response.error || response == false){
            }
            else{
                handleAuthClick();           
            }
          });
        });
      }

      function editEvent(eventid) {
        showUserEditBox(eventid);
      }

      var eventidsfordelete = [];
      function multipledelete() {
            eventidsfordelete = [];
            var checkboxes = document.getElementsByName('fordelete');
  
            for (var i = 0; i < checkboxes.length; i++){
                if (checkboxes[i].checked){
                  eventidsfordelete.push(checkboxes[i].value);
                }
            }
            if (eventidsfordelete.length == 0){
              alert("Error! None selected!");
            }
            else{
              for (var y = 0; y < eventidsfordelete.length; y++) {
                deleteEventforMultiple(eventidsfordelete[y]);
              }
              alert("Success! It will take a few minutes to process!");
            }    
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      // Table Loop
       var eventids = [];
       async function listUpcomingEvents() {

        var div = document.getElementById('google_table');
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
        let heading_9 = document.createElement('th');
        heading_9.innerHTML = "Action";
        let heading_10 = document.createElement('th');
        heading_10.innerHTML = "<button id = 'btn' type='button' class='btn btn-danger' onclick='multipledelete();'>Multiple Delete</button>";

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        row_1.appendChild(heading_5);
        row_1.appendChild(heading_6);
        row_1.appendChild(heading_7);
        row_1.appendChild(heading_8);
        row_1.appendChild(heading_9);
        row_1.appendChild(heading_10);
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
            'maxResults': 30,
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
          td8 = document.createElement('td');
          tr.appendChild(td8);
          td9 = document.createElement('td');
          tr.appendChild(td9);
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
          fullevent = eventids[count - 1] + ","+output.split(")")[i1]+","+dates[count - 1] + "," + startingtime[count - 1] + " To " + endingtime[count - 1] + ","+barber[count - 1] + ","+style[count - 1] + ","+membershiptype[count - 1];
          td8.innerHTML = "<button type='button' class='btn btn-outline-secondary' onclick='editEvent(\""+ currenteventid + "\");'>Edit</button><button type='button' class='btn btn-outline-danger' onclick='deleteEvent(\""+ currenteventid+ "\");'>Del</button>";
          td9.innerHTML = "<label for=\"" + count + "\"><input type=\"checkbox\" class = \"larger\" name=\"fordelete\" value=\"" + currenteventid + "\" id=\"" + count +"\"></label>";
          tbody.appendChild(tr);
          fulleventdetails.push(fullevent);
          i1 = i1+4;
        }
        document.getElementById('google_table').appendChild(table);
        document.getElementById('login-text').innerHTML = "<b>Appointments</b>";
        document.getElementById('login-text2').innerHTML = "Please finalize below to confirm any changes before continuing";
        document.getElementById('create_button').style.visibility = 'visible';
        document.getElementById('add2db').style.visibility = 'visible';

    }