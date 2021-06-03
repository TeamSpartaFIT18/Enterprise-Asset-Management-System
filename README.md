# Enterprise Asset Management System

An asset inventory management system developed for Eimsky Business Solutions (Pvt) Ltd. ‘Enterprise Asset Management system’ is a web-based application to manage the asset inventory which supports automating the allocation of requested assets for the client including tracking the asset. And this system manages a service schedule to the maintenance of assets by keeping an age analysis.


## Screenshots

![home-page](https://user-images.githubusercontent.com/54570205/120716882-47231080-c4e4-11eb-86f3-8f2f022a0701.png)
![sign-in](https://user-images.githubusercontent.com/54570205/120716936-5c983a80-c4e4-11eb-9d42-7a5e9c588c7c.png)
![product-page](https://user-images.githubusercontent.com/54570205/120716968-6ae65680-c4e4-11eb-9eba-0afba815b506.png)
![search box](https://user-images.githubusercontent.com/54570205/120717069-99643180-c4e4-11eb-9cc0-60a959f9eb28.png)
![product-details-page](https://user-images.githubusercontent.com/54570205/120717040-8d786f80-c4e4-11eb-8835-374f5d01e332.png)
![cart-screen](https://user-images.githubusercontent.com/54570205/120717120-a84ae400-c4e4-11eb-9e9b-524299a0ec66.png)
![checkout-screen-1](https://user-images.githubusercontent.com/54570205/120717173-b6990000-c4e4-11eb-891f-b1a9772c3b9c.png)
![checkout-screen-2](https://user-images.githubusercontent.com/54570205/120717194-c284c200-c4e4-11eb-8da3-51238a7a0f05.png)
![checkout-screen-3](https://user-images.githubusercontent.com/54570205/120717214-cca6c080-c4e4-11eb-863d-f0aa0e28d3e5.png)
![order-summary-screen](https://user-images.githubusercontent.com/54570205/120717249-d92b1900-c4e4-11eb-971a-190d400a1d14.png)
![admin-dashboard](https://user-images.githubusercontent.com/54570205/120717276-e5af7180-c4e4-11eb-8f97-0a0713796e6f.png)
![employee-dashboard](https://user-images.githubusercontent.com/54570205/120717298-ef38d980-c4e4-11eb-97b2-3b6166ba9fde.png)
![client-dashboard](https://user-images.githubusercontent.com/54570205/120717321-f9f36e80-c4e4-11eb-8baf-e09445ec9810.png)
  
## Demo

https://eamsapp.herokuapp.com/
## Features

- Shopping Cart Option
- Product Reviews and Ratings
- Top Products Retrieval via a Carousel
- Pagination in Product display
- Product Search Feature
- User Profile with Orders
- Admin Product Management
- Admin User Management
- Admin Order Details page
- Update Orders' Status
- Checkout Process (Shipping, Payment method, etc.)
- PayPal Checkout Integration
- Sample data Seeding to database(products & users)
- Complaints Handle and Customer care
- Schedule the Serveice Visits
- Employee Profile Management
- Email Alert System

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/TeamSpartaFIT18/Enterprise-Asset-Management-System.git
```

Go to the project directory

```bash
  cd Enterprise-Asset-Management-System
```

Install dependencies

```bash
  npm install
  cd frontend
  npm install
```

Start the server

```bash
  npm run server
```

Start the server & react app

```bash
  npm run dev
```

  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CLIENT_URL` - Server that app needs to runs (like, localhost:5000)

`MONGO_URI` - MongoDB Connection String

`JWT_SECRET` - Secret key for JSON Web token

`PAYPAL_CLIENT_ID` - PayPal Client Id

`SG_KEY` - SendGrid Email Api key

## Tech Stack

**Client:** React, Redux

**Server:** Nodejs, Express

**Database:** MongoDB Atlas

  
## Authors

- [@PaisnduG](https://github.com/PaisnduG)
- [@thisalvindula](https://github.com/thisalvindula)
- [@GajithaKavinda96](https://github.com/GajithaKavinda96)
- [@sachini1997](https://github.com/sachini1997)

  
