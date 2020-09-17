import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Company from "App/Models/Company";

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public first_name: string;

  @column()
  public last_name: string;

  @column()
  public email: string;

  @column()
  public phone_number: string;

  @column()
  public gender: string;

  @column()
  public location: string;

  @column()
  public meta: string;

  @column()
  public company_id: number;

  @belongsTo(() => Company)
  public user: BelongsTo<typeof Company>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
