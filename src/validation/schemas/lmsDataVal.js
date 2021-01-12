import { object, string, array } from "yup";

export default object({
	"file": array()
		.of(
			object({
				"Name": string().required("Invalid CSV file"),
			})
		)
		.required("Please upload a file"),
	"accessKey":
		process.env.ENVIRONMENT === "frontend"
			? string().required("Please enter an access key")
			: string(),
	"depot": string().required("Please select a depot"),
});
