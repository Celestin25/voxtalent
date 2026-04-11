const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const r = await prisma.user.upsert({
      where: { id: 'guest-candidate' },
      update: {},
      create: {
        id: 'guest-candidate',
        email: 'guest@voxtalent.com',
        password: 'guest',
        name: 'Anonymous Guest',
        role: 'CANDIDATE'
      }
    });
    console.log('Upsert success:', r);
  } catch (e) {
    console.error('Upsert failed:', e);
  }
}
main().then(async () => await prisma.$disconnect());
