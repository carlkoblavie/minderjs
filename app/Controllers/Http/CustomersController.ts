import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Customer from "App/Models/Customer";

export default class CustomersController {
  public async index({ view, auth }: HttpContextContract) {
    const customers = await Customer.query().where(
      "company_id",
      auth.user.company_id
    );
    return view.render("customers/index", { customers });
  }

  public async edit({ view, params }: HttpContextContract) {
    const customer = await Customer.findOrFail(params.id);
    return view.render("customers/update", { customer });
  }

  public async update({
    request,
    response,
    session,
    params,
  }: HttpContextContract) {
    const validationSchema = schema.create({
      first_name: schema.string({ trim: true }),
      last_name: schema.string({ trim: true }),
      gender: schema.string(),
      company_id: schema.number(),
      location: schema.string.optional({}),
      meta: schema.string.optional(),
      email: schema.string.optional({}, [
        rules.unique({
          table: "customers",
          column: "email",
          whereNot: { id: params.id },
        }),
        rules.email(),
      ]),
      phone_number: schema.string({ trim: true }, [
        rules.regex(/^0(23|24|54|55|59|37|57|26|56|28|20|50)[0-9]{7}$/),
        rules.unique({
          table: "customers",
          column: "phone_number",
          whereNot: { id: params.id },
        }),
      ]),
    });

    const validated = await request.validate({
      schema: validationSchema,
      messages: {
        "first_name.required": "Please provide customer's first name",
        "last_name.required": "Please provide customer's last name",
        "phone_number.required": "Please provide customer's phone number",
        "phone_number.regex": "Please provide a valid phone number",
        "phone_number.unique": "Phone number alreadey exists",
        "gender.required": "Please select customer's gender",
        email: "Please provide a valid email address",
        "email.unique": "email address already exists",
      },
    });

    try {
      const customer = await Customer.find(params.id);
      if (customer) {
        customer.first_name = validated.first_name;
        customer.last_name = validated.last_name;
        customer.phone_number = validated.phone_number;
        customer.gender = validated.gender;
        customer.email = validated.email;
        customer.meta = validated.meta;

        await customer.save();
        session.flash("success", "Customer updated successfully");
        response.redirect("back");
      }
    } catch (error) {}
  }

  public create({ view }: HttpContextContract) {
    return view.render("customers/new");
  }

  public async delete({ response, session, params }) {
    const customer = await Customer.findOrFail(params.id);
    if (customer) {
      await customer.delete();
      session.flash("success", "Customer deleted");
      response.redirect("back");
    }
  }

  public async store({ request, response, session }: HttpContextContract) {
    const validationSchema = schema.create({
      first_name: schema.string({ trim: true }),
      last_name: schema.string({ trim: true }),
      gender: schema.string(),
      company_id: schema.number(),
      location: schema.string.optional({}),
      email: schema.string.optional({}, [
        rules.unique({ table: "customers", column: "email" }),
        rules.email(),
      ]),
      phone_number: schema.string({ trim: true }, [
        rules.regex(/^0(23|24|54|55|59|37|57|26|56|28|20|50)[0-9]{7}$/),
        rules.unique({ table: "customers", column: "phone_number" }),
      ]),
    });

    const validated = await request.validate({
      schema: validationSchema,
      messages: {
        "first_name.required": "Please provide customer's first name",
        "last_name.required": "Please provide customer's last name",
        "phone_number.required": "Please provide customer's phone number",
        "phone_number.regex": "Please provide a valid phone number",
        "phone_number.unique": "Phone number alreadey exists",
        "gender.required": "Please select customer's gender",
        email: "Please provide a valid email address",
        "email.unique": "email address already exists",
      },
    });
    try {
      const { location, company_id, meta } = request.all();
      await Customer.create({
        first_name: validated.first_name,
        last_name: validated.last_name,
        phone_number: validated.phone_number,
        location: location,
        email: validated.email,
        gender: validated.gender,
        company_id: company_id,
        meta: meta,
      });
      session.flash("success", "Customer created successfully");
      response.redirect("back");
    } catch (error) {}
  }
}
