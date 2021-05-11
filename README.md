#Enterprise Asseet management system

An asset inventory management system developed for Eimsky Business Solutions (Pvt) Ltd. . ‘Enterprise Asset Management system’ is a web-based application to manage the asset inventory which supports automating the allocation of requested assets for the client including tracking the asset. And this system manages a service schedule to the maintenance of assets by keeping an age analysis.


Features:-

-Shopping cart option
-Product reviews and ratings
-Top products retrievel via a caraousel
-Pagination in product display
-Product search feature
-User profile with orders
-Admin product management
-Admin user management
-Admin Order details page
-Update orders' status
-Checkout process (shipping, payment method, etc)
-PayPal / credit card integration
-Sample data seeding to database(products & users)
-Complaints and customer care
-Service schedule

User Manual:-

Create .env file-

PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = your password
PAYPAL_CLIENT_ID = your paypal client id

Install npm dependencies-

npm install
cd frontend
npm install

Run program-

Run frontend (:3000) & backend (:5000)
npm run dev

Run backend only
npm run server

