import { object } from "yup";
import { employeeNumberVal, passwordVal } from "../commonAuthFields";

export default object({
	"employee_number": employeeNumberVal,
	"password": passwordVal,
});
