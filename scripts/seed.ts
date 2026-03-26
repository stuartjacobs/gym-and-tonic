import mongoose from "mongoose";
import { config } from "dotenv";
config({ path: ".env.local" });

// Models inline to avoid TS path issues in scripts
const ComedianSchema = new mongoose.Schema({
  name: String, slug: String, bio: String, avatar: String, banner: String,
  socialLinks: { instagram: String, twitter: String, youtube: String, tiktok: String },
}, { timestamps: true });

const ShowSchema = new mongoose.Schema({
  comedianId: { type: mongoose.Schema.Types.ObjectId, ref: "Comedian" },
  title: String, slug: String, description: String, thumbnail: String, banner: String,
  category: String, tags: [String], featured: Boolean,
}, { timestamps: true });

const SeriesSchema = new mongoose.Schema({
  showId: { type: mongoose.Schema.Types.ObjectId, ref: "Show" },
  title: String, slug: String, description: String, seasonNumber: Number, thumbnail: String,
}, { timestamps: true });

const EpisodeSchema = new mongoose.Schema({
  seriesId: { type: mongoose.Schema.Types.ObjectId, ref: "Series" },
  title: String, slug: String, description: String, duration: Number,
  thumbnail: String, videoUrl: String, episodeNumber: Number, views: Number,
}, { timestamps: true });

const Comedian = mongoose.models.Comedian || mongoose.model("Comedian", ComedianSchema);
const Show = mongoose.models.Show || mongoose.model("Show", ShowSchema);
const Series = mongoose.models.Series || mongoose.model("Series", SeriesSchema);
const Episode = mongoose.models.Episode || mongoose.model("Episode", EpisodeSchema);

const comedians = [
  {
    name: "Chad Flexington",
    slug: "chad-flexington",
    bio: "Former competitive bodybuilder turned stand-up. Can bench press 300lbs while delivering a killer punchline. His biceps have their own Instagram.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chad&backgroundColor=b6e3f4",
    banner: "",
    socialLinks: { instagram: "@chadflexington", twitter: "@flexchad" },
  },
  {
    name: "Brenda Burpees",
    slug: "brenda-burpees",
    bio: "The queen of HIIT and hilarity. Makes burpees bearable by making you laugh so hard you can't breathe anyway. Has been kicked out of 3 Planet Fitness locations.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=brenda&backgroundColor=ffd5dc",
    banner: "",
    socialLinks: { instagram: "@brendaburpees", tiktok: "@burpeequeen" },
  },
  {
    name: "Guru McStretchface",
    slug: "guru-mcstretchface",
    bio: "A yoga instructor who achieved enlightenment during a particularly aggressive downward dog. His chakras are perfectly aligned (his back, not so much).",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guru&backgroundColor=c0aede",
    banner: "",
    socialLinks: { youtube: "@gurumcstretchface" },
  },
  {
    name: "DJ Deadlift",
    slug: "dj-deadlift",
    bio: "Part DJ, part powerlifter, all comedy. Drops bass and barbells simultaneously. His playlists are heavier than his PRs.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=djdead&backgroundColor=d1d4f9",
    banner: "",
    socialLinks: { instagram: "@djdeadlift", twitter: "@dropthebarbell" },
  },
  {
    name: "Karen Cardio",
    slug: "karen-cardio",
    bio: "Wants to speak to the manager of your metabolism. Will make you run laps around the gym while she roasts your life choices. Her Yelp reviews are legendary.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karen&backgroundColor=ffdfbf",
    banner: "",
    socialLinks: { instagram: "@karencardio" },
  },
  {
    name: "Professor Planks",
    slug: "professor-planks",
    bio: "Has a PhD in Making You Hold Planks While He Tells Jokes. Tenure-track at the University of Core Strength. Publishes papers nobody reads but everyone feels.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=prof&backgroundColor=c0e8d5",
    banner: "",
    socialLinks: { twitter: "@profplanks" },
  },
  {
    name: "Salsa Steve",
    slug: "salsa-steve",
    bio: "A dance fitness instructor who can't actually dance but makes up for it with unmatched enthusiasm and a complete lack of rhythm. The vibes are immaculate.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=steve&backgroundColor=ffd5b4",
    banner: "",
    socialLinks: { tiktok: "@salsasteve", instagram: "@twoleftfeet" },
  },
  {
    name: "Lunges McFunny",
    slug: "lunges-mcfunny",
    bio: "Irish-born comedian who discovered fitness at age 40 and won't shut up about it. Combines Celtic wisdom with questionable exercise science.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lunges&backgroundColor=b6e3f4",
    banner: "",
    socialLinks: { instagram: "@lungesmcfunny", youtube: "@lungesmcfunny" },
  },
  {
    name: "Abs-olutely Hilarious Amy",
    slug: "abs-olutely-hilarious-amy",
    bio: "Stand-up comedian by night, Pilates instructor by day. Claims she got a six-pack from laughing at her own jokes. Nobody can disprove this theory.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amy&backgroundColor=ffd5dc",
    banner: "",
    socialLinks: { instagram: "@absamy", twitter: "@absolutelyamy" },
  },
  {
    name: "The Treadmill Comedian",
    slug: "the-treadmill-comedian",
    bio: "Performs entire stand-up sets while running on a treadmill. Gets funnier as he gets more out of breath. Has fallen off twice. Both times were his best material.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=treadmill&backgroundColor=d1d4f9",
    banner: "",
    socialLinks: { youtube: "@treadmillcomedian", tiktok: "@runningfunny" },
  },
];

interface ShowTemplate {
  comedianSlug: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  series: {
    title: string;
    slug: string;
    description: string;
    seasonNumber: number;
    episodes: {
      title: string;
      slug: string;
      description: string;
      duration: number;
    }[];
  }[];
}

const shows: ShowTemplate[] = [
  {
    comedianSlug: "chad-flexington",
    title: "Flex & Funny",
    slug: "flex-and-funny",
    description: "Chad Flexington's signature show where he teaches you to build muscle while building character. Warning: your abs will hurt from both the crunches AND the laughing.",
    category: "Strength & Punchlines",
    tags: ["strength", "comedy", "beginner-friendly"],
    featured: true,
    series: [{
      title: "Season 1: Guns & Puns", slug: "guns-and-puns",
      description: "A 6-week arm program where every rep comes with a joke", seasonNumber: 1,
      episodes: [
        { title: "Welcome to the Gun Show", slug: "welcome-gun-show", description: "Chad introduces you to his biceps (they have names) and warms you up with light lifts and heavy jokes.", duration: 1800 },
        { title: "Curl Your Enthusiasm", slug: "curl-your-enthusiasm", description: "Bicep curls so good, even Larry David would approve. Features Chad's impression of a kettlebell.", duration: 2100 },
        { title: "The Tricep of Truth", slug: "tricep-of-truth", description: "Chad reveals the truth: nobody actually likes tricep dips. But he makes them bearable with his dating stories.", duration: 1920 },
        { title: "Shoulder the Burden", slug: "shoulder-the-burden", description: "Shoulder day meets therapy session. Chad lifts your spirits while you lift dumbbells overhead.", duration: 2400 },
        { title: "Chest Day Confessions", slug: "chest-day-confessions", description: "Chad opens up about his chest day rituals while you bench press your feelings away.", duration: 2100 },
      ],
    }],
  },
  {
    comedianSlug: "brenda-burpees",
    title: "Brenda's Burn Notice",
    slug: "brendas-burn-notice",
    description: "High-intensity interval training with high-intensity comedy. Brenda will make you sweat, cry, and pee yourself laughing — sometimes all at once.",
    category: "HIIT Comedy",
    tags: ["hiit", "cardio", "intense"],
    featured: true,
    series: [{
      title: "Season 1: Sweat & Regret", slug: "sweat-and-regret",
      description: "The HIIT series that'll make you question every life choice that led you here", seasonNumber: 1,
      episodes: [
        { title: "Burpee or Bust", slug: "burpee-or-bust", description: "20 minutes of burpees interspersed with Brenda's rant about people who say 'I love burpees.' Spoiler: they're lying.", duration: 1200 },
        { title: "Mountain Climbers & Existential Dread", slug: "mountain-climbers-dread", description: "Scale metaphorical mountains while Brenda philosophizes about why anyone chooses HIIT over Netflix.", duration: 1500 },
        { title: "Jump Squat Confessional", slug: "jump-squat-confessional", description: "Brenda shares her deepest secrets between jump squats. Your legs will give out before her stories do.", duration: 1800 },
        { title: "The Tabata Roast", slug: "tabata-roast", description: "Brenda roasts you for 20 seconds, then you exercise for 10. Wait, is that backwards? Either way, it hurts.", duration: 1200 },
      ],
    }],
  },
  {
    comedianSlug: "guru-mcstretchface",
    title: "Namaste in Bed (But You Got Up Anyway)",
    slug: "namaste-in-bed",
    description: "Gentle yoga meets ungentle comedy. Guru McStretchface guides you through poses while questioning every wellness trend on Instagram.",
    category: "Yoga & Giggles",
    tags: ["yoga", "relaxation", "mindfulness", "comedy"],
    featured: true,
    series: [{
      title: "Season 1: Downward Spiral", slug: "downward-spiral",
      description: "A yoga journey from 'I can do this' to 'why am I shaped like this'", seasonNumber: 1,
      episodes: [
        { title: "Sun Salutation & Self-Deprecation", slug: "sun-salutation-self-deprecation", description: "Greet the sun while Guru greets all of his insecurities. A beautiful morning practice.", duration: 2700 },
        { title: "Warrior III: A Hero's Struggle", slug: "warrior-three-struggle", description: "Attempt Warrior III while Guru narrates your wobbling like a nature documentary.", duration: 2400 },
        { title: "Corpse Pose: A Love Story", slug: "corpse-pose-love-story", description: "The most anticipated episode. 45 minutes of lying on the floor while Guru tells his dating stories.", duration: 2700 },
        { title: "Hot Yoga, Hotter Takes", slug: "hot-yoga-hotter-takes", description: "Guru shares his controversial yoga opinions while you try not to slip in your own sweat.", duration: 3000 },
      ],
    }],
  },
  {
    comedianSlug: "dj-deadlift",
    title: "Drop the Bass, Raise the Bar",
    slug: "drop-the-bass-raise-the-bar",
    description: "DJ Deadlift combines sick beats with sicker lifts. Every workout is a club night your muscles didn't ask for.",
    category: "Strength & Punchlines",
    tags: ["strength", "music", "party"],
    featured: true,
    series: [{
      title: "Season 1: Beats Per Min(ute of Pain)", slug: "beats-per-minute-pain",
      description: "Each episode is themed around a music genre that makes you lift heavier", seasonNumber: 1,
      episodes: [
        { title: "Techno Deadlifts", slug: "techno-deadlifts", description: "Untz untz untz goes the music. Crack crack crack goes your knees. DJ Deadlift doesn't judge.", duration: 2400 },
        { title: "Drum & Bass(ic Training)", slug: "drum-and-basic-training", description: "Military-style training with drum and bass. DJ Deadlift has a whistle. He shouldn't, but he does.", duration: 2100 },
        { title: "Lo-Fi Hip Hop Lifts to Study/Chill To", slug: "lofi-lifts", description: "The chill episode. Slow reps, smooth beats, soft comedy. Even your muscles need a spa day.", duration: 3000 },
      ],
    }],
  },
  {
    comedianSlug: "karen-cardio",
    title: "The Manager Will See You Now",
    slug: "the-manager-will-see-you-now",
    description: "Karen Cardio wants to speak to the manager of your fitness. An unrelenting cardio program delivered with the energy of a woman returning an item without a receipt.",
    category: "Cardio Roast",
    tags: ["cardio", "roast", "running", "intense"],
    featured: false,
    series: [{
      title: "Season 1: Complaint Department", slug: "complaint-department",
      description: "Karen files complaints against your laziness, one rep at a time", seasonNumber: 1,
      episodes: [
        { title: "I'd Like to Speak to Your Personal Trainer", slug: "speak-to-trainer", description: "Karen reviews your previous workouts and finds them all unacceptable. Time to fix that.", duration: 1800 },
        { title: "This Is NOT What I Ordered", slug: "not-what-i-ordered", description: "A surprise workout where nothing goes as planned. Karen hates surprises. You will too.", duration: 1500 },
        { title: "Where's the Manager of My Metabolism?", slug: "metabolism-manager", description: "Karen demands answers about why she can't eat pizza every day and still lose weight.", duration: 2100 },
        { title: "One Star Review of These Squats", slug: "one-star-squats", description: "Karen reviews squats: 'Would not recommend. Extremely inconvenient. My thighs are filing a lawsuit.'", duration: 1800 },
      ],
    }],
  },
  {
    comedianSlug: "professor-planks",
    title: "Core Curriculum",
    slug: "core-curriculum",
    description: "Professor Planks presents a peer-reviewed, academically rigorous core workout program. Attendance is mandatory. There will be a final exam (it's a 5-minute plank).",
    category: "HIIT Comedy",
    tags: ["core", "abs", "academic", "planks"],
    featured: false,
    series: [{
      title: "Semester 1: Introduction to Suffering", slug: "intro-to-suffering",
      description: "The prerequisite course nobody wanted but everyone needs", seasonNumber: 1,
      episodes: [
        { title: "Lecture 1: The Plank Theorem", slug: "plank-theorem", description: "Professor Planks proves mathematically that planks feel 10x longer than they actually are.", duration: 1500 },
        { title: "Lecture 2: Applied Crunches", slug: "applied-crunches", description: "A practical lab session where theory meets agony. Extra credit for not complaining.", duration: 1800 },
        { title: "Lecture 3: Russian Twist & Shout", slug: "russian-twist-shout", description: "An exploration of rotational core work, featuring the Professor's questionable Russian accent.", duration: 1500 },
        { title: "The Midterm (Side Plank Edition)", slug: "midterm-side-plank", description: "Your midterm exam. Grade is pass/fail. The Professor shows no mercy but does show funny cat videos during rest.", duration: 2100 },
      ],
    }],
  },
  {
    comedianSlug: "salsa-steve",
    title: "Two Left Feet, One Good Time",
    slug: "two-left-feet-one-good-time",
    description: "Steve can't dance. Like, at all. But that's what makes this the most entertaining dance fitness show on the platform. Zero coordination, maximum joy.",
    category: "Dance & Laugh",
    tags: ["dance", "fun", "no-coordination-needed"],
    featured: true,
    series: [{
      title: "Season 1: Steve Tries Dancing", slug: "steve-tries-dancing",
      description: "A documentary of one man's beautiful failure to find the beat", seasonNumber: 1,
      episodes: [
        { title: "The Cha-Cha-Cha-Chaos", slug: "cha-cha-chaos", description: "Steve attempts the cha-cha. What follows is the most uncoordinated 30 minutes in fitness history.", duration: 1800 },
        { title: "Zumba Gone Wrong (So Right)", slug: "zumba-gone-wrong", description: "Steve joins a Zumba class. Gets lost immediately. Creates 3 new dance moves by accident.", duration: 2100 },
        { title: "The Electric Slide Into My DMs", slug: "electric-slide-dms", description: "Steve teaches the electric slide while reading his best dating app messages. Cardio AND cringe.", duration: 1500 },
      ],
    }],
  },
  {
    comedianSlug: "lunges-mcfunny",
    title: "Leg Day with a Leprechaun",
    slug: "leg-day-with-a-leprechaun",
    description: "Lunges McFunny brings Irish charm and questionable exercise form to leg day. Every session includes at least one story about his mother and three pints of wisdom.",
    category: "Strength & Punchlines",
    tags: ["legs", "strength", "irish", "storytelling"],
    featured: false,
    series: [{
      title: "Season 1: Emerald Isle of Gains", slug: "emerald-isle-gains",
      description: "A leg program inspired by Irish folklore and questionable science", seasonNumber: 1,
      episodes: [
        { title: "Pot of Gold(en Legs)", slug: "pot-of-golden-legs", description: "Lunges promises a pot of gold at the end of this leg session. There is no pot of gold. There are only lunges.", duration: 2400 },
        { title: "The Blarney Squat", slug: "blarney-squat", description: "Kiss the Blarney Stone of Gains. Deep squats with deeper Irish storytelling.", duration: 2100 },
        { title: "Celtic Calf Raises", slug: "celtic-calf-raises", description: "Standing calf raises while Lunges performs a one-man show about growing up on a dairy farm.", duration: 1800 },
      ],
    }],
  },
  {
    comedianSlug: "abs-olutely-hilarious-amy",
    title: "Ab Fab: The Core Comedy Show",
    slug: "ab-fab-core-comedy-show",
    description: "Amy combines stand-up comedy with Pilates-style core training. Your abs will be sore from the exercises AND from laughing at her razor-sharp observations about gym culture.",
    category: "HIIT Comedy",
    tags: ["pilates", "core", "stand-up", "women"],
    featured: false,
    series: [{
      title: "Season 1: Pilates of the Caribbean", slug: "pilates-of-caribbean",
      description: "A swashbuckling core adventure with questionable nautical themes", seasonNumber: 1,
      episodes: [
        { title: "The Hundred (Reasons I Hate Pilates)", slug: "hundred-reasons-hate-pilates", description: "Amy performs The Hundred while listing actual reasons she questions her career choices.", duration: 1500 },
        { title: "Roll Up & Roll Out", slug: "roll-up-roll-out", description: "Roll-ups so dramatic they should win an Oscar. Amy narrates your struggle like a sports commentator.", duration: 1800 },
        { title: "Teaser: Can Amy Touch Her Toes?", slug: "teaser-touch-toes", description: "A season finale where Amy attempts the Pilates Teaser and tells jokes to distract from her form.", duration: 2100 },
      ],
    }],
  },
  {
    comedianSlug: "the-treadmill-comedian",
    title: "Running Commentary",
    slug: "running-commentary",
    description: "Full stand-up comedy sets performed while running on a treadmill. The more out of breath he gets, the funnier it becomes. Voted 'Most Likely to Go Viral Mid-Workout.'",
    category: "Cardio Roast",
    tags: ["running", "treadmill", "stand-up", "cardio"],
    featured: true,
    series: [{
      title: "Season 1: Miles of Material", slug: "miles-of-material",
      description: "Each episode is a different distance, a different speed, and a different comedy set", seasonNumber: 1,
      episodes: [
        { title: "The 5K Set", slug: "the-5k-set", description: "A casual 5K pace with casual observational comedy. By minute 20, neither is casual anymore.", duration: 2400 },
        { title: "Sprint Interval Roast", slug: "sprint-interval-roast", description: "Sprint for 30 seconds, roast the audience for 30 seconds. Repeat until someone passes out.", duration: 1800 },
        { title: "The Marathon Monologue", slug: "marathon-monologue", description: "A 45-minute treadmill run with a continuous comedy monologue. He stops twice to wheeze. Both times are hilarious.", duration: 2700 },
        { title: "The Fall (Literally)", slug: "the-fall-literally", description: "The famous episode where he actually falls off the treadmill. Gets back on. Keeps going. Legend.", duration: 2100 },
      ],
    }],
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes("placeholder")) {
    console.log("⚠️  No valid MONGODB_URI found. Generating mock data info instead.");
    console.log(`Would create: ${comedians.length} comedians, ${shows.length} shows`);
    const totalEpisodes = shows.reduce((acc, s) => 
      acc + s.series.reduce((a, sr) => a + sr.episodes.length, 0), 0
    );
    console.log(`Total episodes: ${totalEpisodes}`);
    console.log("\nTo seed the database, add a valid MONGODB_URI to .env.local and run again.");
    return;
  }

  await mongoose.connect(uri);
  console.log("🔌 Connected to MongoDB");

  // Clear existing data
  await Promise.all([
    Comedian.deleteMany({}),
    Show.deleteMany({}),
    Series.deleteMany({}),
    Episode.deleteMany({}),
  ]);
  console.log("🗑️  Cleared existing data");

  // Create comedians
  const createdComedians = await Comedian.insertMany(comedians);
  const comedianMap = new Map(createdComedians.map((c) => [c.slug, c._id]));
  console.log(`🎤 Created ${createdComedians.length} comedians`);

  let showCount = 0;
  let seriesCount = 0;
  let episodeCount = 0;

  for (const showData of shows) {
    const comedianId = comedianMap.get(showData.comedianSlug);
    if (!comedianId) {
      console.warn(`⚠️  Comedian not found: ${showData.comedianSlug}`);
      continue;
    }

    const show = await Show.create({
      comedianId,
      title: showData.title,
      slug: showData.slug,
      description: showData.description,
      thumbnail: "",
      banner: "",
      category: showData.category,
      tags: showData.tags,
      featured: showData.featured,
    });
    showCount++;

    for (const seriesData of showData.series) {
      const series = await Series.create({
        showId: show._id,
        title: seriesData.title,
        slug: seriesData.slug,
        description: seriesData.description,
        seasonNumber: seriesData.seasonNumber,
        thumbnail: "",
      });
      seriesCount++;

      const episodeDocs = seriesData.episodes.map((ep, i) => ({
        seriesId: series._id,
        title: ep.title,
        slug: ep.slug,
        description: ep.description,
        duration: ep.duration,
        thumbnail: "",
        videoUrl: "",
        episodeNumber: i + 1,
        views: Math.floor(Math.random() * 50000) + 1000,
      }));

      await Episode.insertMany(episodeDocs);
      episodeCount += episodeDocs.length;
    }
  }

  console.log(`📺 Created ${showCount} shows`);
  console.log(`🎬 Created ${seriesCount} series`);
  console.log(`🎥 Created ${episodeCount} episodes`);
  console.log("\n✅ Seed complete! Your gym is open for business 🏋️‍♂️🍋");

  await mongoose.disconnect();
}

seed().catch(console.error);
