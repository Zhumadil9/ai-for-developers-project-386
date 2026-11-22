import "@typespec/http";
import "@typespec/openapi3";

using TypeSpec.Http;

@service(#{ title: "Calendar booking API" })
@server("http://localhost:3001", "Local development")
namespace CalendarBooking;

model HealthResponse {
  status: "ok";
}

@route("/health")
@get
op health(): {
  @statusCode statusCode: 200;
  @body body: HealthResponse;
};
