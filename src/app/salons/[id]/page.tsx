'use client'; // Need client component for state and interactivity

import * as React from "react";
import { useState, useEffect } from "react";
import { getSalonById, Salon } from "@/services/salons";
import { getProductsBySalonId, Product } from "@/services/products"; // Import product service
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Star, Clock, ShoppingBag } from 'lucide-react'; // Added ShoppingBag icon

interface SalonPageProps {
  params: {
    id: string;
  };
}

// Mock available time slots
const availableTimes = [
    "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

// --- Skeleton Component --- 
function SalonPageSkeleton() {
  // ... (Skeleton component remains the same) ...
  return (
    <main className="container mx-auto p-4 md:p-8 animate-pulse">
      {/* Skeleton Header */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        <div className="w-full md:w-1/3">
            <Skeleton className="h-40 w-full rounded-lg bg-muted" />
        </div>
        <div className="w-full md:w-2/3 space-y-3">
            <Skeleton className="h-8 w-3/4 bg-muted" />
            <Skeleton className="h-5 w-1/2 bg-muted" />
            <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-16 bg-muted" />
                <Skeleton className="h-6 w-24 bg-muted" />
            </div>
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-5/6 bg-muted" />
            <Skeleton className="h-10 w-32 bg-muted mt-2" />
        </div>
      </div>

      {/* Skeleton Booking Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2">
            <CardHeader><Skeleton className="h-6 w-40 bg-muted" /></CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4 p-2">
                            <Skeleton className="h-5 w-5 bg-muted" />
                            <Skeleton className="h-5 flex-grow bg-muted" />
                            <Skeleton className="h-5 w-16 bg-muted" />
                            <Skeleton className="h-5 w-16 bg-muted" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        <div className="space-y-6">
             <Card>
                 <CardHeader><Skeleton className="h-6 w-32 bg-muted" /></CardHeader>
                 <CardContent className="flex justify-center">
                    <Skeleton className="h-64 w-full max-w-xs rounded-md border p-0 bg-muted" />
                 </CardContent>
             </Card>
             <Card>
                 <CardHeader><Skeleton className="h-6 w-32 bg-muted" /></CardHeader>
                 <CardContent>
                     <div className="grid grid-cols-3 gap-2">
                         {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-9 w-full bg-muted" />
                         ))}
                     </div>
                 </CardContent>
             </Card>
        </div>
      </div>

       {/* Skeleton Product Section Placeholder */}
       <Card className="mb-8">
           <CardHeader><Skeleton className="h-6 w-48 bg-muted" /></CardHeader>
           <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[...Array(4)].map((_, i) => (
                     <div key={i} className="space-y-2">
                        <Skeleton className="h-24 w-full bg-muted" />
                        <Skeleton className="h-4 w-3/4 bg-muted" />
                        <Skeleton className="h-4 w-1/2 bg-muted" />
                     </div>
                 ))}
              </div>
           </CardContent>
       </Card>

      {/* Skeleton Summary Card */}
      <Card className="mb-8">
          <CardHeader><Skeleton className="h-6 w-48 bg-muted" /></CardHeader>
          <CardContent>
              <Skeleton className="h-5 w-3/4 bg-muted mb-4" />
              <Skeleton className="h-12 w-40 bg-muted" />
          </CardContent>
      </Card>

      {/* Skeleton Lower Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader><Skeleton className="h-6 w-32 bg-muted" /></CardHeader>
                <CardContent><Skeleton className="h-20 w-full bg-muted" /></CardContent>
            </Card>
            <Card>
                <CardHeader><Skeleton className="h-6 w-24 bg-muted" /></CardHeader>
                <CardContent><Skeleton className="h-20 w-full bg-muted" /></CardContent>
            </Card>
       </div>
    </main>
  );
}

// --- Main Component --- 
export default function SalonPage({ params }: SalonPageProps) {
  const [salon, setSalon] = useState<Salon | null>(null);
  const [products, setProducts] = useState<Product[]>([]); // State for products
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch salon and products concurrently
        const [fetchedSalon, fetchedProducts] = await Promise.all([
           getSalonById(params.id),
           getProductsBySalonId(params.id)
        ]);

        if (!fetchedSalon) {
          setError('Salon not found');
        } else {
          setSalon(fetchedSalon);
          setProducts(fetchedProducts); // Set products
        }
      } catch (err) {
        setError('Failed to fetch salon data.');
        console.error(err);
      } finally {
           setIsLoading(false);
      }
    }
    fetchData();
  }, [params.id]);

  // ... (handleServiceToggle, getTotalPrice, getTotalDuration, handleBookingConfirm remain the same) ...
  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
        const service = salon?.services.find(s => s.serviceId === serviceId);
        return total + (service?.price || 0);
    }, 0);
  };
  
  const getTotalDuration = () => {
     return selectedServices.reduce((total, serviceId) => {
        const service = salon?.services.find(s => s.serviceId === serviceId);
        return total + (service?.duration || 0);
    }, 0);
  }

  const handleBookingConfirm = () => {
    console.log("Booking Confirmed (Simulated):", {
        salonId: salon?.id,
        services: selectedServices,
        date: selectedDate?.toLocaleDateString(),
        time: selectedTime,
        totalPrice: getTotalPrice(),
        totalDuration: getTotalDuration()
    });
    setSelectedServices([]);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    // TODO: Show a success toast here
  };

  // --- Render Logic --- 
  if (isLoading) {
    return <SalonPageSkeleton />;
  }

  if (error) {
     return <div className="container mx-auto p-8 text-red-600">Error: {error}. Please try refreshing the page.</div>;
  }

  if (!salon) {
     notFound();
  }

  const canBook = selectedServices.length > 0 && selectedDate && selectedTime;

  // --- Actual Page Render --- 
  return (
    <main className="container mx-auto p-4 md:p-8">
      {/* Header */}
      {/* ... (Header remains the same) ... */}
       <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        <div className="w-full md:w-1/3">
            {salon.images.logo ? (
                <Image
                    src={salon.images.logo}
                    alt={`${salon.name} logo`}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full bg-muted"
                    priority
                />
            ) : salon.images.interior[0] ? (
                 <Image
                    src={salon.images.interior[0]}
                    alt={`${salon.name} interior`}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full bg-muted"
                    priority
                />
            ) : (
                <div className="h-40 w-full bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    No Image Available
                </div>
            )}
        </div>
        <div className="w-full md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{salon.name}</h1>
            <p className="text-lg text-muted-foreground mb-3">{salon.location}</p>
            <div className="flex items-center gap-4 mb-4">
                 {salon.rating && (
                    <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg font-medium">{salon.rating.toFixed(1)}</span>
                    </div>
                )}
                <div>
                    {salon.isLadiesOnly && <Badge variant="secondary">Ladies Only</Badge>}
                    {salon.hasHijabFriendlyAreas && <Badge variant="secondary" className="ml-2">Hijab Friendly</Badge>}
                </div>
            </div>
            <p className="text-base mb-4">{salon.description}</p>
        </div>
      </div>

      {/* Booking Section */}
      {/* ... (Booking Section remains the same) ... */} 
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Service Selection */} 
        <Card className="lg:col-span-2">
             <CardHeader><CardTitle>1. Select Services</CardTitle></CardHeader>
             <CardContent>
                 <Table>
                     <TableHeader>
                         <TableRow>
                             <TableHead className="w-[50px]"></TableHead>
                             <TableHead>Service</TableHead>
                             <TableHead>Duration</TableHead>
                             <TableHead className="text-right">Price</TableHead>
                         </TableRow>
                     </TableHeader>
                     <TableBody>
                         {salon.services.map((service) => (
                             <TableRow key={service.serviceId} >
                                 <TableCell>
                                     <Checkbox 
                                         id={service.serviceId}
                                         checked={selectedServices.includes(service.serviceId)}
                                         onCheckedChange={() => handleServiceToggle(service.serviceId)}
                                         aria-label={`Select ${service.name}`}
                                     />
                                 </TableCell>
                                 <TableCell className="font-medium">
                                     <label htmlFor={service.serviceId} className="cursor-pointer">{service.name}</label>
                                 </TableCell>
                                 <TableCell>{service.duration} min</TableCell>
                                 <TableCell className="text-right">{service.price} {service.currency || 'SAR'}</TableCell>
                             </TableRow>
                         ))}
                     </TableBody>
                 </Table>
             </CardContent>
         </Card>

        {/* Date & Time Selection */} 
        <div className="space-y-6">
             <Card>
                 <CardHeader><CardTitle>2. Select Date</CardTitle></CardHeader>
                 <CardContent className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))} // Disable past dates
                        className="rounded-md border p-0"
                    />
                 </CardContent>
             </Card>

            <Card>
                 <CardHeader><CardTitle>3. Select Time</CardTitle></CardHeader>
                 <CardContent>
                     <div className="grid grid-cols-3 gap-2">
                         {availableTimes.map(time => (
                            <Button 
                                key={time} 
                                variant={selectedTime === time ? "default" : "outline"}
                                onClick={() => setSelectedTime(time)}
                                disabled={!selectedDate} // Disable if no date selected
                                className="text-xs md:text-sm"
                            >
                                {time}
                            </Button>
                         ))}
                     </div>
                      {!selectedDate && <p className="text-xs text-muted-foreground mt-2">Please select a date first.</p>}
                 </CardContent>
             </Card>
        </div>
      </div>

      {/* --- Products Section --- */} 
      {products.length > 0 && (
          <Card className="mb-8">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5" /> Products Available
                  </CardTitle>
                  <CardDescription>Browse products sold by {salon.name}</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {products.map(product => (
                          <div key={product.id} className="border rounded-lg p-3 text-center relative group">
                              {product.imageUrl ? (
                                  <Image 
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width={100}
                                    height={100}
                                    className="mx-auto mb-2 h-24 w-auto object-contain bg-muted rounded"
                                  />
                              ) : (
                                  <div className="h-24 w-full bg-muted rounded flex items-center justify-center mb-2">
                                      <ShoppingBag className="w-8 h-8 text-muted-foreground"/>
                                  </div>
                              )}
                              <p className="text-sm font-medium truncate group-hover:whitespace-normal">{product.name}</p>
                              <p className="text-xs text-muted-foreground">{product.brand || 'Generic'}</p>
                              <p className="text-sm font-semibold mt-1">{product.price} {product.currency || 'SAR'}</p>
                              <Button size="sm" variant="outline" className="mt-2 text-xs w-full">
                                Add to Cart
                              </Button> 
                               {/* TODO: Implement Add to Cart functionality */}
                          </div>
                      ))}
                  </div>
              </CardContent>
          </Card>
      )}

      {/* Booking Summary and Action */}
      {/* ... (Booking Summary remains the same) ... */} 
       <Card className="mb-8">
            <CardHeader><CardTitle>Booking Summary</CardTitle></CardHeader>
            <CardContent>
                {selectedServices.length === 0 && !selectedDate && !selectedTime && (
                    <p className="text-muted-foreground">Please select services, date, and time above.</p>
                )}
                {(selectedServices.length > 0 || selectedDate || selectedTime) && (
                    <div className="space-y-3">
                         {selectedServices.length > 0 && (
                            <div>
                                <p><strong>Selected Services:</strong></p>
                                <ul className="list-disc list-inside ml-4">
                                    {selectedServices.map(id => {
                                        const service = salon.services.find(s => s.serviceId === id);
                                        return <li key={id}>{service?.name} ({service?.price} {service?.currency || 'SAR'})</li>
                                    })}
                                </ul>
                                <p className="mt-1"><strong>Total Duration:</strong> {getTotalDuration()} min</p>
                                <p><strong>Total Price:</strong> {getTotalPrice()} {salon.services[0]?.currency || 'SAR'}</p>
                            </div>
                        )}
                        {selectedDate && (
                            <p><strong>Date:</strong> {selectedDate.toLocaleDateString('en-CA')}</p>
                        )}
                        {selectedTime && (
                             <p><strong>Time:</strong> {selectedTime}</p>
                        )}
                    </div>
                )}

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button size="lg" className="mt-6 w-full md:w-auto" disabled={!canBook}>
                            Proceed to Book Service
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                       {/* ... (Alert Dialog content remains the same) ... */}
                         <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Your Booking?</AlertDialogTitle>
                        <AlertDialogDescription>
                             Please review your selection before confirming:
                             <ul className="list-disc list-inside my-3 space-y-1">
                                {selectedServices.map(id => {
                                    const service = salon.services.find(s => s.serviceId === id);
                                    return <li key={id}>{service?.name}</li>
                                })}
                            </ul>
                            <strong>Date:</strong> {selectedDate?.toLocaleDateString('en-CA')}<br />
                            <strong>Time:</strong> {selectedTime}<br />
                            <strong>Total Price:</strong> {getTotalPrice()} {salon.services[0]?.currency || 'SAR'}
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleBookingConfirm}>Confirm Booking</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                 {!canBook && selectedServices.length > 0 && (
                      <p className="text-sm text-amber-600 mt-2">Please select both a date and a time to proceed.</p>
                 )}
            </CardContent>
        </Card>

      {/* Operating Hours & Gallery */} 
      {/* ... (These cards remain the same) ... */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader><CardTitle>Operating Hours</CardTitle></CardHeader>
                <CardContent>
                   <ul className="list-disc list-inside space-y-1">
                       {Object.entries(salon.operatingHours).map(([day, hours]) => (
                           <li key={day}><strong>{day}:</strong> {hours}</li>
                       ))}
                   </ul>
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Gallery</CardTitle></CardHeader>
                <CardContent>
                   <p className="text-muted-foreground">Gallery images coming soon...</p>
                </CardContent>
            </Card>
       </div>

    </main>
  );
}
