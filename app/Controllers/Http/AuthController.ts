import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AuthController {
  public show({ view }) {
    return view.render("auth/login");
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout();
    return response.redirect("/login");
  }

  public async login({
    request,
    response,
    session,
    auth,
  }: HttpContextContract) {
    const { email, password } = request.all();

    try {
      await auth.attempt(email, password);
      return response.redirect("/");
    } catch (error) {
      session.flash(
        "notification",
        "Couldn't log you in. Please check your details and try again."
      );
      return response.redirect("back");
    }
  }
}
