import { getBeauticianById, Beautician } from "@/services/beauticians";
import { getSalonById } from "@/services/salons"; // To display salon info
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';

interface BeauticianPageProps {
  params: {
    id: string;
  };
}

export default async function BeauticianPage({ params }: BeauticianPageProps) {
  const beautician = await getBeauticianById(params.id);

  if (!beautician) {
    notFound(); // Show 404 if beautician not found
  }

  // Fetch salon details if beautician is associated with one
  const salon = beautician.salonId ? await getSalonById(beautician.salonId) : null;

  return (
    <main className="container mx-auto p-4 md:p-8">
       {/* Header with Image and Basic Info */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        <div className="w-full md:w-1/3">
            {beautician.profileImage ? (
                <Image
                    src={beautician.profileImage} // Ensure face-free
                    alt={`${beautician.name}`}
                    width={300}
                    height={300} // Make it squarer for profile
                    className="rounded-lg object-cover w-full bg-muted"
                />
            ) : (
                <div className="h-40 w-full bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    No Image Available
                </div>
            )}
        </div>
        <div className="w-full md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{beautician.name}</h1>
            <div className="flex items-center gap-4 mb-2">
                 {beautician.rating && (
                    <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg font-medium">{beautician.rating.toFixed(1)}</span>
                    </div>
                )}
                 <Badge variant="secondary">{beautician.yearsOfExperience} Years Experience</Badge>
            </div>
             <div className="mb-4">
                <span className="font-semibold">Specialties:</span> {beautician.specialty.join(', ')}
            </div>
            {salon && (
                <p className="text-lg text-muted-foreground mb-3">
                    Works at: <a href={`/salons/${salon.id}`} className="text-blue-600 hover:underline">{salon.name}</a>
                </p>
            )}
            <p className="text-base mb-4">{beautician.bio}</p>
            {/* Add Booking Button/Link - Might link to salon page or specific booking flow */}
            {salon && 
             <a href={`/salons/${salon.id}`} className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90">Book via {salon.name}</a>
            }
        </div>
      </div>

        {/* Availability & Portfolio (Placeholders) */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader><CardTitle>Availability</CardTitle></CardHeader>
                <CardContent>
                   {beautician.availability ? (
                       <ul className="list-disc list-inside space-y-1">
                           {Object.entries(beautician.availability).map(([day, hours]) => (
                               <li key={day}><strong>{day}:</strong> {hours}</li>
                           ))}
                       </ul>
                   ) : salon ? (
                       <p className="text-muted-foreground">Typically available during <a href={`/salons/${salon.id}`} className="text-blue-600 hover:underline">{salon.name}'s</a> operating hours.</p>
                   ) : (
                       <p className="text-muted-foreground">Availability not specified.</p>
                   )}
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Portfolio</CardTitle></CardHeader>
                <CardContent>
                   <p className="text-muted-foreground">Portfolio images coming soon...</p>
                    {/* TODO: Add image gallery component using beautician.portfolioImages */}
                </CardContent>
            </Card>
       </div>

    </main>
  );
}
