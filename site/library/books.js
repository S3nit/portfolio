// Each chapter is one reader page. Keep all book text here.
export const shelves = [
  {
    name: "Circuits & systems",
    books: [
      {
        title: "The Quiet Circuit", binding: "moss", motif: "circuit",
        subtitle: "A field guide to voltage, current, and a single loop.",
        chapters: [
          ["Two points", "A voltmeter asks a question about two places. Put its probes on the same piece of ideal wire and it reads zero, even if that wire sits ten volts above the point marked ground.", "Voltage is a difference. Before assigning a number to it, draw the two points and label which one you have chosen as the reference."],
          ["Around the loop", "Picture an ideal 6 V source connected to two identical resistors in series. Charge has one route through the loop, so the current through the first resistor also passes through the second.", "Each resistor drops 3 V. Start at the negative terminal, rise by six volts through the source, then fall by three twice. Your pencil returns to the voltage where it began."],
          ["An open path", "Erase a short piece of wire anywhere in that drawing. In the ideal steady-state model the current becomes zero. Neither resistor now has a voltage drop, because its current is zero.", "The source still maintains six volts. Follow the two disconnected ends back to its terminals: the entire difference now appears across the gap."]
        ]
      },
      {
        title: "Fields on Paper", binding: "clay", motif: "field",
        subtitle: "Reading a field map one arrow at a time.",
        chapters: [
          ["One small arrow", "Imagine laying a tiny positive test charge at one point on a map. The arrow drawn there points in the direction of the electric force on it. Change the sign of the charge and the force reverses.", "A field exists at that point whether or not you draw the arrow. The drawing records a local measurement: force per unit positive charge."],
          ["Between plates", "Draw two broad parallel plates, one positive and one negative. Far from their edges, straight arrows of nearly equal length are a useful approximation. Walk toward an edge and that neat picture begins to bend.", "Those outward curves are fringing fields. A tidy diagram becomes more informative when it marks the region where its approximation works."],
          ["Walking a contour", "On an electrostatic potential map, choose a contour and trace it without crossing another. Every point along your route has the same potential. The field has no component along that contour.", "Where neighbouring contours represent equal voltage steps, closer spacing means a stronger field. You can read that change from the drawing without placing a single arrow."]
        ]
      },
      {
        title: "Stored Energy", binding: "indigo", motif: "charge",
        subtitle: "A pocket study of a capacitor charging through a resistor.",
        chapters: [
          ["At the switch", "Connect an uncharged ideal capacitor to a DC source through a resistor. Just after the switch closes, the capacitor voltage is still zero. The resistor initially sees the full supply voltage.", "As charge gathers on the plates, the capacitor voltage rises. Less voltage remains across the resistor, so the charging current falls."],
          ["The time constant", "Multiply resistance in ohms by capacitance in farads. The result, RC, is a time in seconds. A 10 kΩ resistor and a 100 μF capacitor give a time constant of one second.", "After one time constant, the capacitor has covered about 63 percent of the journey from its starting voltage to its final voltage. After the next second it covers 63 percent of the remaining distance."],
          ["A different ending", "Disconnect the source and place a resistor across the charged capacitor. The voltage now decays. The initial field between the plates held energy; the resistor converts that energy into heat.", "For an ideal capacitor that stored energy is ½CV². Doubling the voltage at a fixed capacitance therefore stores four times as much energy."]
        ]
      },
      {
        title: "Little Loops", binding: "mint", motif: "loop", pocket: true,
        subtitle: "Two paths through one circuit.",
        chapters: [
          ["The fork", "Draw a battery and follow the wire with your pencil. At a junction, give your pencil two possible paths back to the battery. You have just drawn parallel branches."],
          ["A fair split", "Put the same resistor in both branches. Each resistor sees the same voltage, so each takes the same current. The battery supplies their sum."],
          ["A different pair", "Double just one resistance. At the same voltage, its branch current halves. The other branch still sees the original voltage when the source is ideal."]
        ]
      },
      {
        title: "Bit by Bit", binding: "lilac", motif: "bits", pocket: true,
        subtitle: "Counting with three tiny switches.",
        chapters: [
          ["Two choices", "Imagine a row of three lamps. Give their positions the values four, two, and one. A glowing lamp contributes its value. A dark lamp contributes zero."],
          ["Make a five", "Light the four and the one. The row now reads 101, or five. To make six, leave four on, turn one off, and light two."],
          ["One more lamp", "With all three lamps on, you get seven. To count one step further, add a lamp worth eight on the left. Eight is 1000: one new light and three dark ones."]
        ]
      },
      {
        title: "Magnet Mouse", binding: "peach", motif: "mouse", pocket: true,
        subtitle: "A compass takes a walk around a magnet.",
        chapters: [
          ["A tiny pointer", "Imagine a mouse carrying a compass past a bar magnet. At each stopping place the needle turns, then settles. The mouse draws a short arrow pointing where the north-seeking end points."],
          ["Join the trail", "The mouse takes small steps in the direction of each arrow. Outside the magnet, the trail curves from near its north pole toward its south pole when the magnet dominates the surrounding field."],
          ["Turn the magnet", "Keep the little compass in one place and reverse the bar magnet. After a wobble the needle points roughly the other way. The mouse updates the arrow on the map."]
        ]
      }
    ]
  },
  {
    name: "Signals & measurement",
    books: [
      {
        title: "A Language of Waves", binding: "ocean", motif: "wave",
        subtitle: "Three ways to describe the same repeating trace.",
        chapters: [
          ["A repeatable mark", "Choose a point where a sine wave crosses its centre line while rising. Follow it until it next crosses that line while rising again. The elapsed time is one period.", "A crossing on the way down would give only half a period. Pick a feature with a direction, and the measurement stops being ambiguous."],
          ["A shared beat", "Two traces repeat every 20 milliseconds. Each has a frequency of 50 Hz. One trace reaches its crest five milliseconds after the other: a delay of one quarter of a cycle.", "That relative shift is 90 degrees in magnitude. The crests can be different heights without changing either the frequency or that delay."],
          ["A moving baseline", "Add two volts to every point on a sine wave. Both its peaks and its troughs move upward by two volts. The distance between them stays the same.", "A vertical shift changes the DC offset. Measure peak-to-peak height and average level separately, and two very different signals become easier to compare."]
        ]
      },
      {
        title: "Sampling Time", binding: "wine", motif: "samples",
        subtitle: "What a sequence of evenly spaced measurements can tell us.",
        chapters: [
          ["A row of dots", "A digital recorder takes a voltage reading every millisecond. Its sample rate is 1,000 readings per second. Between those dots the stored record contains no additional measurements.", "A smooth curve joining the dots is an interpretation. Which curves can be ruled out depends on what you know about the original signal."],
          ["A borrowed frequency", "Sample a cosine at 100 samples per second. A 10 Hz cosine and a 90 Hz cosine, both starting at their peaks, produce the same sequence of numbers. At sample n, their phase angles differ by a sign and whole turns.", "This is aliasing. Once those numbers are all you have, examining them more closely cannot tell you which of the two inputs was present."],
          ["Before the recorder", "A low-pass filter before the sampler reduces energy above the band you intend to record. Place it after sampling and a fast component may already look like a slow one.", "Real filters roll off gradually. Leave room between the signal band and half the sample rate so that the filter has space to do its work."]
        ]
      },
      {
        title: "Reading the Trace", binding: "ochre", motif: "trace",
        subtitle: "A short notebook on interpreting an oscilloscope display.",
        chapters: [
          ["Start with the scales", "A trace spans four vertical divisions from its lowest point to its highest. At 0.5 V per division, that is 2 V peak to peak. The same drawing at a different scale could describe a very different voltage.", "Write the vertical and horizontal scales beside any sketch. Without them you have preserved a shape and lost the measurement."],
          ["Holding still", "A repetitive signal seems stationary when each displayed sweep starts at the same feature. A rising-edge trigger can start the sweep as the signal rises through a chosen level.", "Move the trigger level outside the signal range and a normal triggered sweep has no qualifying event. A missing update can be a clue about the trigger setting."],
          ["Question the picture", "Suppose a short pulse looks like a smooth hill. Is the source producing a hill, or is the measurement system rounding a sharper edge? The trace alone does not decide.", "Change one condition at a time: the time scale, the sampling setting, or the instrument bandwidth. Record which features persist. A good bench note includes both the observation and how it was obtained."]
        ]
      },
      {
        title: "Echo Post", binding: "apricot", motif: "echo", pocket: true,
        subtitle: "Send a clap to a wall and time its reply.",
        chapters: [
          ["Out and back", "Clap beside a distant flat wall. The echo took two journeys: from you to the wall, and back to you. A stopwatch measures the whole trip."],
          ["Half the distance", "Suppose the delay is a fifth of a second. At a sound speed of about 340 metres per second, the sound travelled about 68 metres. The wall was about 34 metres away."],
          ["A second reply", "In a courtyard, another wall can return the clap later. Each arrival tells you about a path length. It takes more information to work out which wall sent which reply."]
        ]
      },
      {
        title: "Moon Clock", binding: "periwinkle", motif: "moon", pocket: true,
        subtitle: "A pocket clock for thinking about phase.",
        chapters: [
          ["The dial", "Imagine one hand going round a clock face every second. Noon is your reference point. A quarter of a second later, the hand has turned a quarter circle."],
          ["Two hands", "Give a second clock the same speed, but start its hand at three. The hands keep their separation. They have the same frequency and a quarter-turn phase difference."],
          ["The shadow", "Shine an imaginary light across the dial. The hand tip’s shadow on a diameter slides to and fro. Even though the hand turns steadily, its shadow slows at each end before turning back."]
        ]
      },
      {
        title: "Noise Nest", binding: "sage", motif: "nest", pocket: true,
        subtitle: "Finding a steady reading among small fluctuations.",
        chapters: [
          ["A handful of readings", "A sensor reports 9, 11, 10, 9 and 11 units while its input stays still. Their average is 10. Saving the individual readings also tells you how much they varied."],
          ["A quieter average", "When the fluctuations are independent and centred on zero, averaging more readings tends to reduce their effect. A run of readings that all drift upward deserves a different explanation."],
          ["A hidden offset", "Imagine every reading is two units too high because the instrument has an offset. Averaging can make the result look remarkably steady. Checking it against a known reference reveals the error."]
        ]
      }
    ]
  }
];
