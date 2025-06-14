import { redirect } from 'next/navigation'

function DashboardPage() {
  return redirect('/dashboard/auditee');
}

export default DashboardPage