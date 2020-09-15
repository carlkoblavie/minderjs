import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

import Company from "App/Models/Company";

export default class CompaniesController {
  public async index({ view }: HttpContextContract) {
    const companies = await Company.all();
    return view.render("companies/index", { companies });
  }

  public create({ view }: HttpContextContract) {
    return view.render("companies/new");
  }

  public async store({ request, response, session }: HttpContextContract) {
    const validationSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.unique({ table: "companies", column: "name" }),
      ]),
      location: schema.string({ trim: true }),
    });

    const validated = await request.validate({
      schema: validationSchema,
      messages: {
        "name.required": "Please provide company name",
        "name.unique": "company name already exists",
        "location.required": "Please provide location",
      },
    });
    try {
      await Company.create({
        name: validated.name,
        location: validated.location,
      });
      session.flash("success", "Company created successfully");
      response.redirect("back");
    } catch (error) {}
  }
}
