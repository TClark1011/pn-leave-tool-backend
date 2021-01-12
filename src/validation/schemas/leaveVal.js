import { startOfToday, addWeeks } from "date-fns";
import { object, date, ref } from "yup";
import { employeeNumberVal } from "../commonAuthFields";

export default object({
	"user": employeeNumberVal,
	"dates": object({
		"start": date().required().min(addWeeks(startOfToday(), 2)),
		"end": date()
			.required()
			.test(
				"ahead of start",
				"end date must be later than start date",
				function (value) {
					return new Date(value) > new Date(this.resolve(ref("start")));
				}
			),
	}),
});
