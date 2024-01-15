
# Truefitt&Hill Website

This is a complete website which has two different access levels, one for manager and other for employees. It has a multitude of features related to the management of daily appointments, customized preferances and employee allocation.



## About

Manager and employees login by entering their respective username and password. This is verified by comparing it to database values. The program appropriately allows the manager to access admin functionalities. If the username or password is incorrect, appropriate error messages are displayed. 

Employees view the calendar once they log in using the account details provided by the manager. Employees use the contact page if they have any problems. The form has in built validation. 

Manager creates new accounts and terminates accounts when required. These are stored in a database used for login verification. 

Manager logs in to access the calendar. This account provides the scope to modify appointments. This acts as a secondary verification which protects the data. 

The program allows the manager to manipulate database records. The form for creating and editing appointments have validation for data, time, required fields, and etc. 

The website displays segregated information for all members into their respective memberships. This is achieved through SQL queries and retrieved by XAMPP servers. 

The query page allows the manager to search for specific appointments. The preferred attributes are calculated through SQL, and they are displayed for each customer. 

Solution will contain record of the current day’s appointments which can be accessed by manager and barber/therapist.

Employees and manager download respective tables in a csv file for further usage/storage used for future reference.

## Features

- Handling API requests and response
- Creating a calendar to display events on respective days
- Use of Oauth 2.0 Client and Google API
- Use of URL encoding and JSON objects
- Displaying JSON result in table format
- Creating a dynamic edit and delete button, along with a multiple delete option
- Querying functions 
- Use of MySQL to calculate recurrence and preference
- Account creation and login page authentication
- Different levels of access for manager and employee
- Intuitive user experience

## Run Locally

Clone the project

```bash
  git clone https://github.com/samraat-d/truefitt-hill-website
```

Copy contents of the htdocs folder to local htdocs (present in the app files of XAMPP)

Copy contents of google-files folder to a new folder on desktop named truefitt-and-hill-main

Change localhost and root password for all php files to access your local MySQL database

Install dependencies and start MySQL and APACHE servers

```bash
  Install XAMPP server
```

Locate the project folder google-files

```bash
  cd truefitt-and-hill-main
```

Start the python server

```bash
  python -m http.server 8000
```


Locally run the website by entering the following url into any web browser:
```bash
http://localhost/Truefitt%20and%20Hill%20Website/login-page/login.php
```

To get started, the default login details for the manager is:

```bash
Email: truefitt@mail.com
Password: Hill123
```

## FAQ

#### Can you change manager mail and password?

Yes, by changing the code in the following file: [Login_page.js](https://github.com/samraat-d/truefitt-hill-website/blob/main/htdocs/Truefitt%20and%20Hill%20Website/login-page/js/main.js)

#### Error 404: Localhost not found

If you get this error, it means the database is not connected to the server. Try checking the password for all the php files and the root access of the mysql server on XAMPP.


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Tech Stack

**Client:** SCSS, Bootstrap, FontAwesome, HTML5/CSS3/JS

**Server:** PHP, MySQL, XAMPP


## Documentation

[Documentation](https://github.com/samraat-d/truefitt-hill-website)

