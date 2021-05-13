/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { spawn } from "child_process";
import { createConnection } from "typeorm";
import { seedPropertyOptions } from "../components/Properties/PropertyOption/seed";
import { seedPropertyType } from "../components/Properties/PropertyType/seed";
import { seedCountry } from "./../components/Country/seed";
import { seedProperty } from "./../components/Properties/Property/seed";
import { seedRole } from "./../components/Role/seed";
import { seedState } from "./../components/State/seed";
import { seedUser } from "./../components/User/seed";
import { logger } from "./../configs/Logger";

// @ts-ignore
const dropTables = async () => {
  const ls = spawn("npx", ["typeorm", "schema:drop"]);

  ls.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
  });

  ls.on("exit", (code) => {
    console.log(`child process exited with code ${code}`);
    runMigration();
  });
};
const runMigration = () => {
  createConnection()
    .then(async () => {
      await seedCountry();
      await seedState();
      await seedRole();
      await seedUser();
      await seedPropertyType();
      await seedPropertyOptions();
      await seedProperty();
    })
    .catch((error: Error) => {
      logger.error(error);
    });
};

// dropTables();
runMigration();