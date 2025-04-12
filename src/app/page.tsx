
import { SidebarLayout } from '@/components/SidebarLayout';

export default function Home() {
  return (
    <SidebarLayout>
      {/* Main content of the application will go here */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">Welcome to Tajammalati</h1>
        <p className="mt-2">Explore the best salon services in KSA.</p>
      </div>
    </SidebarLayout>
  );
}

