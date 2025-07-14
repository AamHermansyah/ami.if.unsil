import db from "@/lib/prisma"

async function main() {
  // Auditee
  const auditeeAccess = await db.access.upsert({
    where: { email: '227006009@student.unsil.ac.id' },
    update: {},
    create: {
      email: '227006009@student.unsil.ac.id',
      role: 'AUDITEE',
      status: 'ACTIVE',
    },
  })

  // Auditor
  const auditorAccess = await db.access.upsert({
    where: { email: 'auditor@unsil.ac.id' },
    update: {},
    create: {
      email: 'auditor@unsil.ac.id',
      role: 'AUDITOR',
      status: 'ACTIVE',
    },
  })

  console.log('Seed complete:')
  console.log('- Auditee:', auditeeAccess.email)
  console.log('- Auditor:', auditorAccess.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
