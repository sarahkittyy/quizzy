import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends mongoose.Document {
	username: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	hash(pass: string): string;
	setPassword(pass: string): void;
	taken(): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
}, { timestamps: true });

UserSchema.static('hash', function (pass: string): string {
	return bcrypt.hashSync(pass, 15);
});

UserSchema.method('taken', async function (): Promise<boolean> {
	let res = await this.model('User').findOne({username: this.username});
	return !!res;
});

UserSchema.method('setPassword', function(pass: string): void {
	this.password = UserSchema.statics.hash(pass);
});

const User = mongoose.model<IUser>('User', UserSchema);

export { UserSchema, IUser };
export default User;