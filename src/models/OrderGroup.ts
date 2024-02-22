import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { IOrderGroup } from "../interfaces/OrderGroup";

interface OrderGroupModel extends Model<IOrderGroup>, IOrderGroup {}

export const OrderGroup = sequelize.define<OrderGroupModel>("order_group", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
