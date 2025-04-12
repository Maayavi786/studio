import {onDocumentCreated} from "firebase-functions/v2/firestore";
import {initializeApp} from "firebase-admin/app";
import * as admin from "firebase-admin";

initializeApp();

exports.validateBooking = onDocumentCreated(
  "bookings/{bookingId}",
  async (event) => {
    const bookingData = event.data?.data();
    // Add checks if bookingData is undefined (optional but safer)
    if (!bookingData) {
      // These lines should have 6 spaces
      console.error("Booking data is undefined for event:", event.id);
      return;
    }

    const salonId = bookingData.salonId;
    const dateTime = bookingData.dateTime;

    // Query existing bookings for conflicts (Simplified example)
    const db = admin.firestore();
    const bookingsRef = db.collection("bookings");
    const conflictingBookingsQuery = bookingsRef
      .where("salonId", "==", salonId)
      .where("dateTime", "==", dateTime);

    const conflictingBookingsSnap = await conflictingBookingsQuery.get();

    // Check if event.data.ref exists before updating
    const bookingRef = event.data?.ref;
    if (!bookingRef) {
      // These lines should have 6 spaces
      console.error("Booking reference is undefined for event:", event.id);
      return;
    }

    if (!conflictingBookingsSnap.empty) {
      // Conflict found: reject the booking
      // These lines should have 6 spaces
      console.log(`Booking conflict found for ${event.id}. Rejecting.`);
      await bookingRef.update({status: "rejected", conflict: true});
    } else {
      // No conflict: confirm the booking
      // These lines should have 6 spaces
      console.log(`No conflict for ${event.id}. Confirming.`);
      await bookingRef.update({status: "confirmed"});
    }
  });

