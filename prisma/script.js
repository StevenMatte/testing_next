import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const schemaPath = path.resolve(__dirname, "../prisma/schema.prisma");
const binaryTargets = process.env.OS_SYSTEM;
let schema = fs.readFileSync(schemaPath, "utf-8");
if (!binaryTargets) {
  schema = schema.replace(/binaryTargets\s*=\s*\[[^\]]*?\]/, "");
} else {
  schema = schema.replace(/binaryTargets\s*=\s*\[[^\]]*?\]/, `binaryTargets = ${binaryTargets}`);
}

fs.writeFileSync(schemaPath, schema);

console.log("✅ schema.prisma updated with binaryTargets:", binaryTargets);
