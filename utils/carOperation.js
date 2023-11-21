import { parseDate, millisecondsToDays } from "@/utils/dateOperations";

/**
 * Determines whether car is available or not
 */
export function checkCarAvailability(rentalLog) {
  let availability = "Available";
  const todayDate = new Date().setHours(0, 0, 0, 0);
  for (let log of rentalLog) {
    if (
      parseDate(log.startDate).setHours(0, 0, 0, 0) <= todayDate &&
      parseDate(log.endDate).setHours(0, 0, 0, 0) >= todayDate
    ) {
      const unavailabilityDuration =
        parseDate(log.endDate).setHours(0, 0, 0, 0) - todayDate;

      if (unavailabilityDuration === 0) {
        availability = "Available in 24 hours";
      } else {
        availability = `Available in ${
          millisecondsToDays(unavailabilityDuration) + 1
        } days`;
      }
    }
  }

  return availability;
}
