
import { redirect } from 'next/navigation';

export default function DashboardKnowledgeBasePage() {
  // The content for the knowledge base is on the public-facing site
  // This allows unauthenticated users to access it as well.
  // We redirect logged-in users from the dashboard to the public page.
  redirect('/knowledge-base');
}
