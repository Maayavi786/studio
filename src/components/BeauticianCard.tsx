'use client';

import * as React from "react";
import Image from 'next/image';
import { Beautician } from "@/services/beauticians";
import { getSalonById, Salon } from "@/services/salons"; // To fetch salon name if needed
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from 'lucide-react';

interface BeauticianCardProps {
  beautician: Beautician;
}

export function BeauticianCard({ beautician }: BeauticianCardProps) {
  const [salonName, setSalonName] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (beautician.salonId) {
      getSalonById(beautician.salonId).then(salon => {
        if (salon) {
          setSalonName(salon.name);
        }
      });
    }
  }, [beautician.salonId]);

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardHeader className="p-0 relative h-40"> {/* Adjust height as needed */}
        {/* Use profile image - ensure it's face-free */}
        {beautician.profileImage ? (
          <Image
            src={beautician.profileImage}
            alt={`${beautician.name}`}
            layout="fill"
            objectFit="cover"
            className="bg-gray-200" // Background color while loading
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="mb-1 text-lg font-semibold">{beautician.name}</CardTitle>
        {salonName && (
            <CardDescription className="text-sm text-blue-600 mb-1">Works at: {salonName}</CardDescription>
        )}
        <CardDescription className="text-sm text-muted-foreground mb-2">
           Specialties: {beautician.specialty.join(', ')}
        </CardDescription>
        <CardDescription className="text-sm mb-3 line-clamp-2">{beautician.bio}</CardDescription>
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
                {beautician.rating && (
                    <>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{beautician.rating.toFixed(1)}</span>
                    </>
                )}
            </div>
            <Badge variant="secondary">{beautician.yearsOfExperience} Yrs Exp</Badge>
        </div>
        {/* Optional: Link to beautician profile page */}
      </CardContent>
    </Card>
  );
}
