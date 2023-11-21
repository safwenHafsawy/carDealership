import { parseDate } from "@/utils/dateOperations";

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
        const seconds = Math.floor(unavailabilityDuration / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        availability = `Available in ${days + 1} days`;
      }
    }
  }

  return availability;
}
