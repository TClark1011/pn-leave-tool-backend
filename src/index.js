import "core-js/stable";
import "regenerator-runtime/runtime";

import app from "./app";

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
