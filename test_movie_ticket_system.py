import asyncio
import unittest

from movie_ticket_system import MovieTicketSystem


class MovieTicketSystemTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self) -> None:
        self.system = MovieTicketSystem()
        self.system.add_show("show-1", 5)
        await self.system.start(worker_count=3)

    async def asyncTearDown(self) -> None:
        await self.system.stop()

    async def test_concurrent_bookings_do_not_oversell(self) -> None:
        results = await asyncio.gather(
            self.system.submit_booking("user-1", "show-1", 2),
            self.system.submit_booking("user-2", "show-1", 2),
            self.system.submit_booking("user-3", "show-1", 2),
        )

        successful = [result for result in results if result.success]
        failed = [result for result in results if not result.success]
        booked_seats = sum(len(result.seats) for result in successful)

        self.assertEqual(2, len(successful))
        self.assertEqual(1, len(failed))
        self.assertEqual(4, booked_seats)

    async def test_booking_fails_for_unknown_show(self) -> None:
        result = await self.system.submit_booking("user-1", "unknown-show", 1)
        self.assertFalse(result.success)
        self.assertEqual("Show not found.", result.message)

    async def test_booking_fails_for_invalid_seat_count(self) -> None:
        result = await self.system.submit_booking("user-1", "show-1", 0)
        self.assertFalse(result.success)
        self.assertEqual("Seat count must be greater than zero.", result.message)


if __name__ == "__main__":
    unittest.main()
