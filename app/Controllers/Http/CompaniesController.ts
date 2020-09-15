import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CompaniesController {
  public index({ view }: HttpContextContract) {
    return view.render("companies/index");
  }

  public create({ view }: HttpContextContract) {
    return view.render("companies/new");
  }
}
