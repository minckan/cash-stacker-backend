const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Cash Stacker",
    description: "",
  },
  host: "localhost:8080",
  schemes: ["http"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
  security: [{ bearerAuth: "" }],
};

const outputFile = "./src/swagger-output.json";
const endpointsFiles = ["src/app.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
