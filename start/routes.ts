/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.on("/").render("dashboard");
Route.get("/customers", "CustomersController.index");
Route.get("/customers/new", "CustomersController.create");
Route.post("/customers", "CustomersController.store");
Route.get("/customers/:id/edit", "CustomersController.edit");
Route.post("/customers/:id", "CustomersController.update");
Route.get("/customers/:id/delete", "CustomersController.delete");
Route.get("/companies", "CompaniesController.index");
Route.get("/companies/new", "CompaniesController.create");
Route.post("/companies", "CompaniesController.store");
Route.get("/login", "AuthController.show");
Route.post("/login", "AuthController.login");
Route.get("/logout", "AuthController.logout");
