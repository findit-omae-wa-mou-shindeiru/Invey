import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.DB_STRING;

export const client = new MongoClient(uri);
