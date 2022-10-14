const options = require("./corsOptions");

const cors = {
    origin: options.map((url) => url || !url),
    credentials: true,
};
