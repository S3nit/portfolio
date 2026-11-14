# Signal explorer

An interactive sine wave that shows how frequency and amplitude change a signal over one second.

## Try the explorer

Move the frequency slider to change how many cycles fit in the window. Move the amplitude slider to change the wave’s height.

<!-- signal-explorer -->

## How it works

The plot samples the equation `v(t) = A sin(2πft)`. Frequency (`f`) is measured in hertz, amplitude (`A`) in volts, and time (`t`) in seconds.

- At 2 Hz, two complete cycles fit in the window.
- At 4 Hz, each cycle takes a quarter of a second.
- At 0.5 V, the peaks are half as tall as they are at 1 V.
