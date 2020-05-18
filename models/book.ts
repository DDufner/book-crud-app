import mongoose, { Schema } from 'mongoose';

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('books', BookSchema);

export class Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  updatedAt: Date;
}
