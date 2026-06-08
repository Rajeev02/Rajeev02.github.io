## ⛺ Section 4: Plurebus, Dunst & WildTrails Case Studies (Native Android Java)

*⏱️ 2 min read*

#### 1. Offline-First Safari Syncing (WildTrails)
- **Context**: A wildlife tracking app used in remote areas with poor network coverage. Users need to log sightings offline, and the data must sync when connection is restored.
- **Challenge**: Background sync must be reliable without draining battery, running even when the app is in the background or device is rebooted.
- **Solution**: Built the application completely as a native Android application in Java using SQLite for local storage and structured background syncing:
  - Implemented a SQLite database with a custom `SQLiteOpenHelper` to store sightings locally with transaction safety (ACID).
  - Used the Android SDK's native **`WorkManager` API** (using Java) and background services to schedule opportunistic uploads.
  - Registered constraints on the background jobs so that syncing only occurs when network connectivity is active (via `ConnectivityManager`) and the battery is not low.
  - Handled device reboots using a `BroadcastReceiver` listening for `BOOT_COMPLETED` to reschedule critical pending sync tasks, ensuring no data loss.

#### 2. VR and Ticketing (Dunst Technologies)
- **Context**: Consumer-facing travel apps utilizing VR tours and ticketing.
- **Challenge**: Smooth rendering of complex 360/VR media and interactive ticket widgets on lower-end Android devices without blocking the main UI thread.
- **Solution**: Built completely as a native Android app in Java:
  - Integrated native OpenGL ES-based VR rendering views, offloading heavy media rendering and decoding to the GPU.
  - Handled bitmap decoding asynchronously using background thread pools (`ExecutorService`) and custom thread-safe queues.
  - Optimized the native layout hierarchy (using custom ViewGroups and flat XML layouts) to reduce view nesting, preventing overdraw and maintaining 60 FPS rendering on target hardware.

#### 3. Media-Rich Booking and Discovery Platform (Plurebus)
- **Context**: An entertainment platform similar to BookMyShow, focused on discovery and booking experiences for movies, theatre, drama, and live shows.
- **Challenge**: Handling dynamic listing updates, image-heavy schedules, and seat-layout grids efficiently without memory leaks or UI lag on mid-range Android devices.
- **Solution**: Built completely as a native Android application in Java using custom RecyclerView layouts and caching layers:
  - Designed custom adapters for `RecyclerView` with view pooling and payload-based differential updates (`DiffUtil`) to prevent UI flashes during listing updates.
  - Implemented asynchronous image loading and custom LRU cache handlers to manage movie poster caching, reducing heap consumption and preventing Out-Of-Memory (OOM) errors.
  - Developed a highly interactive, custom Canvas-based view for seat selection, managing coordinate mappings and seat states natively in Java.

---


---
