"use strict";
const express = require('express');
const app = express();
app.set('puerto', 8888);
app.get('/', (request, response) => {
    response.send('GET - servidor NodeJS');
});
app.listen(app.get('puerto'), () => {
    console.log('Servidor corriendo sobre puerto:', app.get('puerto'));
});
//# sourceMappingURL=servidor_node.js.map