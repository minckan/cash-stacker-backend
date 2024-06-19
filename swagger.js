const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Cash Stacker",
    description: "",
  },
  host: process.env.BASE_URL,
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
