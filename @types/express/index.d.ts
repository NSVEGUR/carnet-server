import { StudentModel } from "../src/model/student.model";

declare global {
	namespace Express {
		interface Request {
			currentStudent: typeof StudentModel
		}
	}
}