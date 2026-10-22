
const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../app");

test("GET / returns a success response", async () => {
    const server = app.listen(0);

    try {
        const address = server.address();
        const response = await fetch(
            `http://127.0.0.1:${address.port}/`
        );

        assert.equal(response.status, 200);

        const data = await response.json();

        assert.equal(data.status, "success");
        assert.equal(
            data.message,
            "My first DevOps project is running!"
        );
    } finally {
        await new Promise((resolve, reject) => {
            server.close(error => error ? reject(error) : resolve());
        });
    }
});
