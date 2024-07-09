import serverNode from "./server.js";

async function main() {
    try {
        // Start server
        serverNode.listen(3000, () => {
            console.log(`Server running on port -> ${3000 }`)
        });
    } catch (error) {
        console.log(error);
    }
};


main()