import asyncio
import uuid
from dataclasses import dataclass


@dataclass(frozen=True)
class BookingRequest:
    request_id: str
    user_id: str
    show_id: str
    seat_count: int


@dataclass(frozen=True)
class BookingResult:
    request_id: str
    success: bool
    message: str
    seats: tuple[int, ...] = ()


class MovieShow:
    def __init__(self, show_id: str, total_seats: int) -> None:
        if total_seats <= 0:
            raise ValueError("total_seats must be greater than zero")
        self.show_id = show_id
        self._available_seats = list(range(1, total_seats + 1))
        self._lock = asyncio.Lock()

    async def reserve_seats(self, seat_count: int) -> tuple[int, ...]:
        if seat_count <= 0:
            return ()
        async with self._lock:
            if len(self._available_seats) < seat_count:
                return ()
            seats = tuple(self._available_seats[:seat_count])
            del self._available_seats[:seat_count]
            return seats


class MovieTicketSystem:
    def __init__(self) -> None:
        self._shows: dict[str, MovieShow] = {}
        self._queue: asyncio.Queue[tuple[BookingRequest, asyncio.Future[BookingResult]] | None] = (
            asyncio.Queue()
        )
        self._workers: list[asyncio.Task] = []
        self._running = False

    def add_show(self, show_id: str, total_seats: int) -> None:
        self._shows[show_id] = MovieShow(show_id, total_seats)

    async def start(self, worker_count: int = 2) -> None:
        if self._running:
            return
        self._running = True
        self._workers = [asyncio.create_task(self._worker()) for _ in range(max(1, worker_count))]

    async def stop(self) -> None:
        if not self._running:
            return
        for _ in self._workers:
            await self._queue.put(None)
        await asyncio.gather(*self._workers)
        self._workers = []
        self._running = False

    async def submit_booking(self, user_id: str, show_id: str, seat_count: int) -> BookingResult:
        if not self._running:
            raise RuntimeError("MovieTicketSystem is not running. Call start() first.")

        request = BookingRequest(
            request_id=str(uuid.uuid4()),
            user_id=user_id,
            show_id=show_id,
            seat_count=seat_count,
        )
        loop = asyncio.get_running_loop()
        result_future: asyncio.Future[BookingResult] = loop.create_future()
        await self._queue.put((request, result_future))
        return await result_future

    async def _worker(self) -> None:
        while True:
            item = await self._queue.get()
            if item is None:
                self._queue.task_done()
                break
            request, future = item
            result = await self._handle_booking(request)
            if not future.done():
                future.set_result(result)
            self._queue.task_done()

    async def _handle_booking(self, request: BookingRequest) -> BookingResult:
        if request.seat_count <= 0:
            return BookingResult(request.request_id, False, "Seat count must be greater than zero.")

        show = self._shows.get(request.show_id)
        if show is None:
            return BookingResult(request.request_id, False, "Show not found.")

        seats = await show.reserve_seats(request.seat_count)
        if not seats:
            return BookingResult(request.request_id, False, "Not enough available seats.")
        return BookingResult(request.request_id, True, "Booking successful.", seats)
