import "core-js/stable";
import "regenerator-runtime/runtime";

import app from "./app";
import { log } from "./middleware/loggingMiddleware";

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
	log(`Server running on port ${PORT}`);
});
