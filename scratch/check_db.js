const { createClient } = require('@libsql/client');
require('dotenv').config();

async function check() {
  const client = createClient({ 
    url: process.env.TURSO_DATABASE_URL, 
    authToken: process.env.TURSO_AUTH_TOKEN 
  });

  console.log("Columns for Submission:");
  const res = await client.execute("PRAGMA table_info(Submission)");
  console.log(JSON.stringify(res.rows, null, 2));

  console.log("Columns for Challenge:");
  const res2 = await client.execute("PRAGMA table_info(Challenge)");
  console.log(JSON.stringify(res2.rows, null, 2));
}

check();
