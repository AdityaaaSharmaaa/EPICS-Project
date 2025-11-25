import Realm from "realm";

// 1. User Profile Schema
export class User extends Realm.Object<User> {
  _id!: Realm.BSON.ObjectId;
  mobile!: string;
  role!: string; // 'borrower', 'shopkeeper', 'mfi'
  ccsScore!: number;
  language!: string;

  static schema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      mobile: 'string',
      role: 'string',
      ccsScore: { type: 'int', default: 300 },
      language: { type: 'string', default: 'en' },
    },
  };
}

// 2. Transaction Schema (Udhaar/Jama)
export class Transaction extends Realm.Object<Transaction> {
  _id!: Realm.BSON.ObjectId;
  borrowerId!: string;
  shopkeeperId!: string;
  amount!: number;
  type!: string; // 'credit' (Gave) or 'debit' (Received)
  description?: string;
  date!: Date;
  isDisputed!: boolean;

  static schema = {
    name: 'Transaction',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      borrowerId: 'string',
      shopkeeperId: 'string',
      amount: 'double',
      type: 'string',
      description: 'string?',
      date: 'date',
      isDisputed: { type: 'bool', default: false },
    },
  };
}