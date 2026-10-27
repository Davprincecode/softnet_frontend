// tooltipConfig.ts
export const tooltipConfig = {
  bufferTime: {
    label: "Buffer Time Between Bookings",
    text: "Adds a gap between consecutive bookings to allow time for preparation, cleanup, or transition."
  },
  minimumBookingNotice: {
    label: "Minimum Booking Notice (Days)",
    text: "Sets the minimum number of days required before a customer can make a booking. For example, selecting 1 day prevents same-day bookings."
  },
  maximumBookingWindow: {
    label: "Maximum Booking Window (Days)",
    text: "Limits how far into the future customers can book. For example, selecting 60 days disables bookings beyond 60 days from today."
  },
  bookingDuration: {
    label: "Booking Duration",
    text: "Defines how long each booking lasts. For example, a 2-hour duration blocks 2 hours per booking."
  },
  bookingsPerDay: {
    label: "Maximum Bookings Per Day",
    text: "Sets the maximum number of bookings that can be accepted in a single day."
  }
};
