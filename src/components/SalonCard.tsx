'use client';

import * as React from "react";
import Image from 'next/image';
import { Salon } from "@/services/salons"; // Assuming path alias '@' is configured
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from 'lucide-react'; // Using lucide-react for icons

interface SalonCardProps {
  salon: Salon;
}

export function SalonCard({ salon }: SalonCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardHeader className="p-0 relative h-40"> {/* Adjust height as needed */}
        {/* Basic placeholder for image - ideally use next/image */}
        {salon.images.logo ? (
           <Image
            src={salon.images.logo} // Use the first interior image or logo as placeholder
            alt={`${salon.name} logo`}
            layout="fill"
            objectFit="cover"
            className="bg-gray-200" // Background color while loading
           />
        ) : salon.images.interior[0] ? (
          <Image
            src={salon.images.interior[0]} // Use the first interior image or logo as placeholder
            alt={`${salon.name} interior`}
            layout="fill"
            objectFit="cover"
            className="bg-gray-200"
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="mb-1 text-lg font-semibold">{salon.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2">{salon.location}</CardDescription>
        <CardDescription className="text-sm mb-3 line-clamp-2">{salon.description}</CardDescription>
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
                {salon.rating && (
                    <>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{salon.rating.toFixed(1)}</span>
                    </>
                )}
            </div>
            <div>
                {salon.isLadiesOnly && <Badge variant="outline">Ladies Only</Badge>}
                {salon.hasHijabFriendlyAreas && <Badge variant="outline" className="ml-1">Hijab Friendly</Badge>}
            </div>
        </div>
        {/* Optionally display a few services */}
        {/* <div className="text-xs text-muted-foreground">
          Services: {salon.services.slice(0, 2).map(s => s.name).join(', ')}...
        </div> */}
      </CardContent>
    </Card>
  );
}
