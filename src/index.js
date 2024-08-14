import { server } from "./io.js";
import {nms} from "./rtmp.js";

async function main() {
    try {
        // Start server
        server.listen(3000, () => {
            console.log(`Server running on port -> ${3000 }`)
        });

        nms.run();
    } catch (error) {
        console.log(error);
    }
};


main()