import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import Company from "App/Models/Company";
import {
  column,
  beforeSave,
  belongsTo,
  BelongsTo,
  BaseModel,
} from "@ioc:Adonis/Lucid/Orm";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column()
  public password: string;

  @column()
  public name: string;

  @column()
  public company_id: number;

  @belongsTo(() => Company)
  public user: BelongsTo<typeof Company>;

  @column()
  public rememberMeToken?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
