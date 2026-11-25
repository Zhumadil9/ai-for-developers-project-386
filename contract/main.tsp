import "@typespec/http";
import "@typespec/openapi3";

using TypeSpec.Http;

@service(#{ title: "Calendar booking API" })
@server("http://localhost:3001", "Local development")
namespace CalendarBooking;

model HealthResponse {
  status: "ok";
}

model EventType {
  id: string;
  name: string;
  description: string;
  durationMinutes: int32;
}

model TimeSlot {
  start: string;
  end: string;
  timezone: "Asia/Almaty";
}

@doc("The server accepts starts only within the next 14 calendar days beginning tomorrow in Asia/Almaty. Starts must align to 30-minute increments during 09:00–18:00 owner hours, and the event duration must end by 18:00. Overlapping bookings are rejected.")
model CreateBookingRequest {
  eventTypeId: string;
  guestName: string;
  guestEmail: string;
  start: string;
  timezone: "Asia/Almaty";
}

model Booking {
  id: string;
  eventTypeId: string;
  guestName: string;
  guestEmail: string;
  start: string;
  end: string;
  timezone: "Asia/Almaty";
}

model ConflictResponse {
  message: string;
  conflict: {
    start: string;
    end: string;
  };
}

model ValidationResponse {
  message: string;
  errors: string[];
}

@route("/health")
@get
op health(): {
  @statusCode statusCode: 200;
  @body body: HealthResponse;
};

@route("/event-types")
@get
op listEventTypes(): {
  @statusCode statusCode: 200;
  @body body: EventType[];
};

@route("/event-types/{eventTypeId}/slots")
@get
op listSlots(@path eventTypeId: string): {
  @statusCode statusCode: 200;
  @body body: TimeSlot[];
};

@route("/bookings")
@post
op createBooking(@body body: CreateBookingRequest): {
  @statusCode statusCode: 201;
  @body body: Booking;
} | {
  @statusCode statusCode: 400;
  @body body: ValidationResponse;
} | {
  @statusCode statusCode: 409;
  @body body: ConflictResponse;
};

@route("/bookings/upcoming")
@get
op listUpcomingBookings(): {
  @statusCode statusCode: 200;
  @body body: Booking[];
};
