import { getSalons } from "@/services/salons";
import { SalonCard } from "@/components/SalonCard";

export default async function HomePage() {
  const salons = await getSalons();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-12">
      <h1 className="text-3xl font-bold mb-8">Featured Salons</h1>
      
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salons.map((salon) => (
          <SalonCard key={salon.id} salon={salon} />
        ))}
      </div>

      {/* Placeholder for other sections like Beauticians, Services etc. */}
      {/* 
      <h2 className="text-2xl font-bold mt-12 mb-6">Top Beauticians</h2>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         Add Beautician Cards here 
      </div>
      */}

    </main>
  );
}
