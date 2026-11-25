# Booking window and timezone rules

Status: accepted

Booking windows start on the next calendar day in `Asia/Almaty` and cover 14 calendar
days. Owner working hours are 09:00–18:00 in that timezone. Available starts are
generated every 30 minutes, and an interval remains bookable only when it does not
overlap another Booking. Touching intervals are allowed.

The server enforces the same date window, working hours, 30-minute start alignment,
and duration bounds when creating a Booking; generated slots are not a security or
validation boundary.
