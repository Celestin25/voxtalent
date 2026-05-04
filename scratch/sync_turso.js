const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');

// Manually read .env
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

function getEnv(key) {
  const match = envContent.match(new RegExp(`${key}="?([^"\\s\\n]+)"?`));
  return match ? match[1] : null;
}

const url = getEnv('TURSO_DATABASE_URL');
const token = getEnv('TURSO_AUTH_TOKEN');

if (!url || !token) {
  console.error("Missing Turso credentials in .env");
  process.exit(1);
}

async function sync() {
  const client = createClient({ url, authToken: token });

  console.log("Syncing Challenge...");
  const challengeCols = [
    "jobTitle TEXT", 
    "jobDescription TEXT", 
    "jobLocation TEXT", 
    "isRemote BOOLEAN DEFAULT 0"
  ];
  for (const col of challengeCols) {
    try {
      await client.execute(`ALTER TABLE Challenge ADD COLUMN ${col}`);
      console.log(`Added column to Challenge: ${col}`);
    } catch (e) {
      console.log(`Skip Challenge: ${col} (already exists or error)`);
    }
  }

  console.log("Syncing Submission...");
  const submissionCols = [
    "firstName TEXT", "lastName TEXT", "preferredFirstName TEXT", "email TEXT", "phone TEXT", "country TEXT",
    "resumeUrl TEXT", "resumeName TEXT", "resumeType TEXT",
    "coverLetterUrl TEXT", "coverLetterName TEXT", "coverLetterType TEXT",
    "interestQuestion TEXT", "fitQuestion TEXT", "salaryExpectations TEXT", "joinDate TEXT", "countryOfResidence TEXT", "visaSponsorship TEXT", "gender TEXT", "heardAboutRole TEXT", "sourceDetail TEXT", "linkedInProfile TEXT"
  ];
  for (const col of submissionCols) {
    try {
      await client.execute(`ALTER TABLE Submission ADD COLUMN ${col}`);
      console.log(`Added column to Submission: ${col}`);
    } catch (e) {
      console.log(`Skip Submission: ${col} (already exists or error)`);
    }
  }
  
  console.log("Migration complete!");
}

sync();
