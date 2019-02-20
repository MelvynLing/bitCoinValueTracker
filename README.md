# Bitcoin Tracker App 

## Check out the live app: https://gentle-spire-69297.herokuapp.com

[]

**Created by:**
* Melvyn Ling *(Front-end design and logic, API calls, profitability logic)* 
* Carter Lawson *(back-end logic, database, routing)*
* Rajvinder Sandhu *(Front-logic, API calls)*
* Nitin Mascreen *(Front-end logic, form validation)*
------

### Objective:

The intent of this app is to allow the user to see past bitcoin performance data, as well as let the user know if they would have possibily made a profit if they invested in bitcoin within a given peroid of time.

### Overview:

The node application makes use of MySQL to store use inquiries in a database which is then retrievable regardless of where the user is seeing the page from. It uses handlebars to render the page as well. The routing is handled with express npm package, as well as the body-parser npm package. 

#### Tech & Languages Used: 
* MySQL
* Sequelize
* Handlebars
* ESLint
* Express
* DotEnv
* Body-Parser
* Materialize
* Javascript
* HTML
* CSS
* AOS
* node.js

### Instructions:

[]

* On load, the user is presented with a blank page as above. Here, you can see a form. with this form you can enter an amout you would like to inquire about, as well as a bitcoin investment entry date and a bitcoin investment exit date. Once this is complete, the user can hit submit.

[]

* if the user's inquire is a profitable one they are presented with this image. 

[]

* if the user's inquire is an unprofitable one, they are presented with this image. 

[]

* regardless if the user's inuqire is profitable or not, it is stored in the chart below which stores all users past inquires. 




