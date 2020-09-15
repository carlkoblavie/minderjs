import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Company from "App/Models/Company";

export default class CompanySeeder extends BaseSeeder {
  public async run() {
    await Company.createMany([
      {
        name: "TenTen Pharmacy",
        location: "Community 25 Tema",
      },
      {
        name: "Adore Kids",
        location: "Community 25 Tema",
      },
    ]);
  }
}
