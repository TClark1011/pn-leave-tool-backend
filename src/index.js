import "core-js/stable";
import "regenerator-runtime/runtime";

import app from "./app";
import { PORT } from "./constants/env";
import { log } from "./middleware/loggingMiddleware";

app.listen(PORT, () => {
	log(`Server running on port ${PORT}`);
});
