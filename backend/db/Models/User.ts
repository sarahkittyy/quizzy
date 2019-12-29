import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends mongoose.Document {
	username: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	setPassword(pass: string): void;
	taken(): Promise<boolean>;
}

interface IUserStatic extends mongoose.Model<IUser> {
	hash(pass: string): string;
	validate(user: string, pass: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
}, { timestamps: true });

UserSchema.static('hash', function (pass: string): string {
	return bcrypt.hashSync(pass, 15);
});

UserSchema.static('validate', async function (user: string, pass: string): Promise<boolean> {
	let userModel = await this.model('User').findOne({username: user}, 'password');
	return await bcrypt.compare(pass, userModel.password);
});

UserSchema.method('taken', async function (): Promise<boolean> {
	let res = await this.model('User').exists({username: this.username});
	return res;
});

UserSchema.method('setPassword', function(pass: string): void {
	this.password = UserSchema.statics.hash(pass);
});

const User = mongoose.model<IUser, IUserStatic>('User', UserSchema);

export { UserSchema, IUser };
export default User;