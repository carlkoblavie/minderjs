import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CustomersController {
  public index({ view }: HttpContextContract) {
    return view.render("customers/index");
  }

  public create({ view }: HttpContextContract) {
    return view.render("customers/new");
  }
}
