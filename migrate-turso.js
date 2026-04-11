const { createClient } = require('@libsql/client');

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN');
    process.exit(1);
  }

  const client = createClient({
    url,
    authToken,
  });

  console.log('Connecting to Turso at:', url);

  const columns = [
    { name: 'fileUrl', type: 'TEXT' },
    { name: 'fileName', type: 'TEXT' },
    { name: 'fileType', type: 'TEXT' }
  ];

  for (const col of columns) {
    try {
      console.log(`Adding column ${col.name}...`);
      await client.execute(`ALTER TABLE Submission ADD COLUMN ${col.name} ${col.type};`);
      console.log(`Successfully added ${col.name}`);
    } catch (e) {
      if (e.message.includes('duplicate column name')) {
        console.log(`Column ${col.name} already exists.`);
      } else {
        console.error(`Error adding ${col.name}:`, e.message);
      }
    }
  }

  console.log('Migration completed!');
}

main().catch(console.error);
