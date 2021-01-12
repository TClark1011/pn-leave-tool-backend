import { object, ref, string } from "yup";
import { employeeNumberVal, passwordVal } from "../commonAuthFields";
import emailRegex from "../regex/emailRegex";

export default object({
	"employee_number": employeeNumberVal,
	"confirm_employee_number": employeeNumberVal
		.required("You must confirm your Employee Number")
		.test(
			"Employee Numbers match",
			"Employee Numbers do not match",
			function (value) {
				return value ? value === this.resolve(ref("employee_number")) : true;
			}
		),
	"password": passwordVal,
	"confirm_password": string()
		.required("You must confirm your password")
		.test("Passwords match", "Passwords do not match", function (value) {
			return value ? value === this.resolve(ref("password")) : true;
		}),
	"name": string().required("Please enter your name"),
	"depot": string().required("You must select your depot"),
	"email": string()
		.required("Please enter a valid email address")
		.matches(emailRegex, "email address is invalid"),
});
