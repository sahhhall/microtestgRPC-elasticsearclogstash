import mongoose, { Mongoose } from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModal extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//we access property safely
 export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // transformation is applied when the Mongoose document is serialized into a JSON object, 
    toJSON: {
      // like this we can modifey the return json
      transform(_, ret) {
        // console.log(...arguments);
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);


//middlware fn pre

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attr: UserAttrs) => {
  return new User(attr);
};
const User = mongoose.model<UserDoc, UserModal>("User", userSchema);

// //with help of this ts will get power hahaha
// // suppose we add something weong using new User there will a probe
// // so we use this
// and it have some improvemetn
// const buildUser = (attrs: UserAttrs)=> {
//     return new User(attrs)
// }

export { User };


