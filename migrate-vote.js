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

  console.log('Connecting to Turso...');

  try {
    console.log('Adding feedback column to Vote table...');
    await client.execute('ALTER TABLE Vote ADD COLUMN feedback TEXT;');
    console.log('Successfully added feedback column.');
  } catch (e) {
    if (e.message.includes('duplicate column name')) {
      console.log('Column feedback already exists.');
    } else {
      console.error('Error adding feedback:', e.message);
    }
  }

  console.log('Migration completed!');
}

main().catch(console.error);
