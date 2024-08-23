import sequelizeORM from "./config/db";
import { server } from "./io";
import {nms} from "./rtmp";


import './models/users.models'
import './models/personas.model'
import './models/messages.model'
import './models/streams.model'
import './models/channel.model'

async function main() {
    try {
        // Connect to database

        const coneccion = await sequelizeORM.sync({ alter: false })
        console.log(`conectado a la base de datos, ${coneccion.config.database}`)

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