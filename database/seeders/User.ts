import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: "Carl Koblavie",
        company_id: 1,
        email: "cskoblavie@gmail.com",
        password: "password32",
      },
      {
        name: "Carl Qubit",
        company_id: 2,
        email: "carl@qubit.com",
        password: "password32",
      },
    ]);
  }
}
