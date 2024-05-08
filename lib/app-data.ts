export const exerciseCategories = [
  {
    name: 'Chest',
    alt: 'chest exercise',
    src: 'https://static.strengthlevel.com/images/illustrations/decline-bench-press-1000x1000.jpg',
    link: 'chest',
  },
  {
    name: 'Back',
    alt: 'back exercise',
    src: 'https://static.strengthlevel.com/images/illustrations/pull-ups-1000x1000.jpg',
    link: 'back',
  },
  {
    name: 'Quadriceps',
    alt: 'quadriceps exercise',
    src: 'https://static.strengthlevel.com/images/illustrations/dumbbell-lunge-1000x1000.jpg',
    link: 'quadriceps',
  },
  {
    name: 'Hamstrings/Glutes',
    alt: 'double-headed exercise',
    src: 'https://static.strengthlevel.com/images/illustrations/deadlift-1000x1000.jpg',
    link: 'hamstrings-glutes',
  },
  {
    name: 'Shoulders',
    alt: 'shoulders exercise',
    src: 'https://static.strengthlevel.com/images/illustrations/shoulder-press-1000x1000.jpg',
    link: 'shoulders',
  },
  {
    name: 'Abs',
    alt: 'belly exercise',
    src: 'https://static.strengthlevel.com/images/illustrations/cable-crunch-1000x1000.jpg',
    link: 'abs',
  },
  {
    name: 'Biceps',
    alt: 'biceps exercise',
    src: 'https://static.strengthlevel.com/images/illustrations/dumbbell-curl-1000x1000.jpg',
    link: 'biceps',
  },
  {
    name: 'Triceps',
    alt: 'triceps exercise',
    src: 'https://static.strengthlevel.com/images/illustrations/dips-1000x1000.jpg',
    link: 'triceps',
  },
] as const;
export const categoryDescriptions = [
  {
    category: 'chest',
    title: 'chest muscles',
    description:
      "Within the chest area, there are many muscle groups, but the most well-known among them are the pectoralis major and minor, the subclavius muscle, and the serratus anterior. They are crucial for maintaining stability and proper body posture. The most popular exercise for chest training is barbell bench press on a flat bench. However, it's worth noting that during this exercise, in addition to the chest muscles, the triceps and shoulder muscles are also actively engaged",
    imageUrl:
      'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9194_1521031139_c560x377x0x17,540x360.jpg',
  },
  {
    category: 'back',
    title: 'back muscles',
    description:
      'Our back consists of a whole group of muscles performing various functions. Well-developed back muscles give the silhouette a V-shaped appearance. Among the largest and most visible muscles, we can include the latissimus dorsi, trapezius, and erector spinae.For a comprehensive back workout, remember to perform exercises based on vertical pulling, such as pull-ups on a bar, as well as horizontal pulling, such as barbell rows.',
    imageUrl:
      'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9197_1521031212_c554x373x0x13,540x360.jpg',
  },
  {
    category: 'quadriceps',
    title: 'quadriceps / hamstrings',
    description:
      'The following positions mostly depict compound exercises, which means that during a single movement, we engage multiple joints and muscles. Exercises in this category heavily involve the quadriceps muscles, which is why they have been classified in this category. The main function of the quadriceps muscle is knee extension. Therefore, any exercise requiring this movement will engage the quadriceps muscle.',
    imageUrl:
      'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9193_1521031142_c560x377x9x17,540x360.jpg',
  },
  {
    category: 'hamstrings-glutes',
    title: 'glutes/hamstrings',
    description:
      'This category includes exercises that heavily engage the hamstring and glute muscles. In exercises based on the hip hinge movement pattern, utilized in the deadlift, these muscles work in close synergy.The primary function of the hamstring muscle is knee flexion, for example, in the crane exercise. The glutes, on the other hand, are powerful hip extensors, playing a major role in exercises like hip thrusts with a barbell.',
    imageUrl:
      'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9195_1521031215_c560x377x2x4,540x360.jpg',
  },
  {
    category: 'shoulders',
    title: 'shoulders',
    description:
      'The shoulder muscles, commonly referred to as the deltoids, form a group of muscles responsible for controlling our arms. They are divided into three parts: anterior, lateral, and posterior. The anterior deltoid serves as the driving force for most overhead presses, the lateral deltoid is largely isolated through lateral raises with dumbbells, while the posterior deltoid is responsible for moving the arm backward. To engage the posterior deltoid, perform raises in a bent-over position.',
    imageUrl:
      'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9190_1521030039_540x360.jpg',
  },
  {
    category: 'abs',
    title: 'abdominal',
    description:
      'The abdominal muscles are located in the center of our body and, without our conscious awareness, participate in every movement activity related to locomotion or free weight exercises. They connect the upper and lower parts of the body. Their fundamental tasks include stabilization and maintaining a straight posture. The exercises presented below aim to strengthen our muscles and assist in achieving their sculpting.',
    imageUrl:
      'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9192_1521031073_c560x377x0x17,540x360.jpg',
  },
  {
    category: 'biceps',
    title: 'biceps',
    description:
      "As the name suggests, this is a muscle composed of two heads. The short head is located on the inner side of the arm, and the long head is on the outer side. Just below them is the brachialis muscle, which, together with the biceps, flexes the elbow joint. Basic exercises aimed at developing our biceps include arm curls with dumbbells or a barbell. However, let's not forget the significant involvement of the biceps and shoulder muscles in back muscle exercises.",
    imageUrl:
      'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9191_1521031033_c560x377x0x17,540x360.jpg',
  },
  {
    category: 'triceps',
    title: 'triceps',
    description:
      'The muscle occupying about 2/3 of the volume of our arm is composed of three heads: lateral, long, and medial. The main function of the muscle is extension at the elbow joint, so any exercise involving this movement will engage our triceps.Among the most popular exercises are dips, a bodyweight exercise, and French presses, typically performed using an EZ bar or dumbbells.',
    imageUrl:
      'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9198_1521031241_c560x377x9x17,540x360.jpg',
  },
];
export const exercises = [
  {
    exerciseName: 'Barbell Bench Press',
    category: 'chest',
    muscle1: ['pectoralis major', 'triceps brachii', 'anterior deltoid'],
    muscle2: ['anterior serratus', 'anterior deltoid'],
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg',
    videoUrl: [
      'https://www.youtube.com/embed/bmjHkNJr7O0',
      'https://www.youtube.com/embed/l9BBv5bU4ks',
    ],
    link: 'barbell bench press',
  },
  {
    exerciseName: 'Barbell Bench Press (30-45° Incline)',
    category: 'chest',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/incline-bench-press-1000x1000.jpg',
    muscle1: [
      'pectoralis major clavicular part (upper)',
      'triceps brachii',
      'anterior deltoid',
    ],
    muscle2: ['anterior serratus'],
    videoUrl: ['https://www.youtube.com/embed/LDxaLKO33TQ'],
    link: 'barbell bench press 30 45 incline',
  },
  {
    exerciseName: 'Dumbbell Bench Press',
    category: 'chest',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/decline-dumbbell-bench-press-1000x1000.jpg',
    muscle1: ['pectoralis major', 'triceps brachii', 'anterior deltoid'],
    videoUrl: ['https://www.youtube.com/embed/ACsYCmLA9Do'],
    link: 'dumbbell-bench-press',
  },
  {
    exerciseName: 'Dumbbell Bench Press (30-45° Incline)',
    category: 'chest',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/incline-dumbbell-bench-press-1000x1000.jpg',
    muscle1: ['pectoralis major clavicular part (upper)', 'anterior deltoid'],
    muscle2: ['triceps brachii'],
    videoUrl: ['https://www.youtube.com/embed/C06qMsCzjQ8'],
    link: 'dumbbell bench press 30 45 incline',
  },
  {
    exerciseName: 'Cable Flyes',
    category: 'chest',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/cable-fly-1000x1000.jpg',
    muscle1: ['pectoralis major', 'anterior deltoid'],
    videoUrl: ['https://www.youtube.com/embed/vM1Ovmiu71M'],
    link: 'cable flyes',
  },
  // Back exercises
  {
    exerciseName: 'Pull-Ups (Wide Grip)',
    category: 'back',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/pull-ups-1000x1000.jpg',
    muscle1: ['latissimus dorsi', 'trapezius', 'rhomboids', 'biceps brachii'],
    videoUrl: [
      'https://www.youtube.com/embed/UvW6XnClK7A',
      'https://www.youtube.com/embed/YYbqPzlwY6c',
    ],
    link: 'pull ups wide grip',
  },
  {
    exerciseName: 'Bent Over Barbell Rows',
    category: 'back',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/bent-over-row-1000x1000.jpg',
    muscle1: ['latissimus dorsi', 'trapezius', 'rhomboids'],
    muscle2: [
      'pectoralis major clavicular part (upper)',
      'brachialis',
      'anterior deltoid',
    ],
    videoUrl: [
      'https://www.youtube.com/embed/MOlDmANU_4U',
      'https://www.youtube.com/embed/d6MZDg35qzc',
    ],
    link: 'bent overbarbellrows',
  },
  {
    exerciseName: 'Seated Cable Row',
    category: 'back',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/seated-cable-row-1000x1000.jpg',
    muscle1: [
      'latissimus dorsi ',
      ' teres major',
      ' posterior deltoid ',
      'biceps brachii muscle',
    ],
    videoUrl: [
      'https://www.youtube.com/watch?v=sP_4vybjVJs&ab_channel=MindPumpTV',
    ],
    link: 'seated cable row',
  },
  // Quadriceps/Hamstrings exercises
  {
    exerciseName: 'Dumbbell Lunges',
    category: 'quadriceps',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/dumbbell-lunge-1000x1000.jpg',
    muscle1: ['quadriceps', 'hamstrings', 'gluteus maximus'],
    videoUrl: ['https://www.youtube.com/embed/M4THUsShZFA'],
    link: 'dumbbell lunges',
  },
  {
    exerciseName: 'Back Squats',
    category: 'quadriceps',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/squat-1000x1000.jpg',
    muscle1: ['quadriceps'],
    muscle2: ['hamstrings', 'gluteus maximus'],
    videoUrl: ['https://www.youtube.com/embed/aX7aE0meWcY'],
    link: 'back squats',
  },
  {
    exerciseName: 'Front Squats',
    category: 'quadriceps',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/front-squat-1000x1000.jpg',
    muscle1: ['quadriceps'],
    muscle2: ['hamstrings', 'gluteus maximus'],
    videoUrl: ['https://www.youtube.com/embed/gOsd8NNPg04'],
    link: 'front squats',
  },
  // Glutes/Hamstrings exercises
  {
    exerciseName: 'Deadlift',
    category: 'hamstrings-glutes',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/deadlift-1000x1000.jpg',
    muscle1: [
      'gluteus maximus',
      'hamstrings',
      'quadriceps',
      'erector spinae',
      'lumbar trapezius',
      'rhomboids',
    ],
    videoUrl: [
      'https://www.youtube.com/embed/eMhIdSrCaqU',
      'https://www.youtube.com/embed/0_igODjLiXM',
    ],
    link: 'deadlift',
  },
  {
    exerciseName: 'Hip Thrusts',
    category: 'hamstrings-glutes',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/hip-thrust-1000x1000.jpg',
    muscle1: ['gluteus maximus', 'hamstrings', 'quadriceps'],
    videoUrl: [
      'https://www.youtube.com/embed/ezEQkeQWMPM',
      'https://www.youtube.com/embed/zj6IrdvL9Ps',
    ],
    link: 'hip thrusts',
  },
  {
    exerciseName: 'Leg Abduction on Machine',
    category: 'hamstrings-glutes',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/hip-abduction-1000x1000.jpg',
    muscle1: [
      'gluteus maximus',
      'iliotibial tract',
      'tensor fasciae latae',
      'adductors',
    ],
    videoUrl: ['https://www.youtube.com/embed/IydaB14rnlg'],
    link: 'leg abduction on machine',
  },
  // Shoulders exercises
  {
    exerciseName: 'Barbell Overhead Press',
    category: 'shoulders',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/shoulder-press-1000x1000.jpg',
    muscle1: ['anterior deltoid'],
    muscle2: ['pectoralis major clavicular part (upper)', 'subscapularis'],
    videoUrl: [
      'https://www.youtube.com/embed/utGTzZRrwm0',
      'https://www.youtube.com/embed/CHWdd9-6Vfw',
    ],
    link: 'barbell overhead press',
  },
  {
    exerciseName: 'Seated Dumbbell Press',
    category: 'shoulders',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/seated-dumbbell-shoulder-press-1000x1000.jpg',
    muscle1: ['middle deltoid'],
    muscle2: ['triceps brachii', 'trapezius'],
    videoUrl: ['https://www.youtube.com/embed/pInYJYisaEo'],
    link: 'seated dumbbell press',
  },
  {
    exerciseName: 'Lateral Raises with Dumbbells',
    category: 'shoulders',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/dumbbell-lateral-raise-1000x1000.jpg',
    muscle1: ['middle deltoid', 'pectoralis major sternal part (middle)'],
    muscle2: ['trapezius'],
    videoUrl: ['https://www.youtube.com/embed/5g5U2dIoeQ0'],
    link: 'lateral raises with dumbbells',
  },
  {
    exerciseName: 'Face Pulls',
    category: 'shoulders',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/face-pull-1000x1000.jpg',
    muscle1: ['posterior deltoid', 'infraspinatus', 'teres minor', 'trapezius'],
    videoUrl: [
      'https://www.youtube.com/embed/foz3Le39glE',
      'https://www.youtube.com/embed/51AuMQzpBVY',
    ],
    link: 'face pulls',
  },
  {
    exerciseName: 'Dumbbell Front Raise',
    category: 'shoulders',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/dumbbell-front-raise-1000x1000.jpg',
    muscle1: ['anterior deltoid'],
    muscle2: ['pectoralis major clavicular part (upper)'],
    videoUrl: ['https://www.youtube.com/embed/0ZslV4JJkIg'],
    link: 'dumbbell front raise',
  },
  // Abdominal exercises
  {
    exerciseName: 'Hanging Knee Raises',
    category: 'abs',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/hanging-knee-raise-1000x1000.jpg',
    muscle1: ['rectus abdominis', 'iliopsoas', 'quadriceps'],
    videoUrl: ['https://www.youtube.com/embed/u1OJQFS3Irw'],
    link: 'hanging knee raises',
  },
  {
    exerciseName: 'Scissor Kicks',
    category: 'abs',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/scissor-kicks-1000x1000.jpg',
    time: true,
    muscle1: ['rectus abdominis', 'obliques'],
    videoUrl: ['https://www.youtube.com/embed/y1hXARQhHZM'],
    link: 'scissor kicks',
  },
  {
    exerciseName: 'Hanging Leg Raise',
    category: 'abs',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/toes-to-bar-1000x1000.jpg',
    muscle1: ['triceps brachii', 'abdominal', 'quadriceps femoris'],
    muscle2: ['biceps brachii ', 'latissimus dorsi'],
    videoUrl: ['https://www.youtube.com/embed/yTTuVSKU-Ks'],
    link: 'hanging leg raise',
  },
  {
    exerciseName: 'Cable Crunch',
    category: 'abs',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/cable-crunch-1000x1000.jpg',
    muscle1: ['rectus abdominis', 'obliques'],
    videoUrl: [
      'https://www.youtube.com/watch?v=ToJeyhydUxU&pp=ygUMQ2FibGUgQ3J1bmNo&ab_channel=TestosteroneNation',
    ],
    link: 'cable crunch',
  },
  // Biceps exercises
  {
    exerciseName: 'Preacher Curl',
    category: 'biceps',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/preacher-curl-1000x1000.jpg',
    muscle1: ['biceps brachii', 'brachialis'],
    videoUrl: ['https://www.youtube.com/embed/QkK9UjGI4Pw'],
    link: 'preacher curl',
  },
  {
    exerciseName: 'Hammer Curls with Dumbbells',
    category: 'biceps',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/hammer-curl-1000x1000.jpg',
    muscle1: ['brachioradialis', 'biceps brachii'],
    videoUrl: ['https://www.youtube.com/embed/s_ubLsRZ59I'],
    link: 'hammer curls with dumbbells',
  },
  {
    exerciseName: 'Standing Barbell Curls',
    category: 'biceps',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/barbell-curl-1000x1000.jpg',
    muscle1: ['biceps brachii', 'brachialis'],
    videoUrl: ['https://www.youtube.com/embed/wHbgdQ5rS7g'],
    link: 'standing arbell curls',
  },
  {
    exerciseName: 'Overhead Cable Curl',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/overhead-cable-curl-1000x1000.jpg',
    muscle1: ['biceps brachii', 'brachialis'],
    videoUrl: ['https://www.youtube.com/embed/XlvPT0mfQO8'],
    link: 'overhead cable curl',
  },
  // Triceps exercises
  {
    exerciseName: 'Dips',
    category: 'triceps',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/dips-1000x1000.jpg',
    muscle1: ['triceps brachii'],
    muscle2: ['brachialis'],
    videoUrl: ['https://www.youtube.com/embed/hiAvKCpOWdg'],
    link: 'dips',
  },
  {
    exerciseName: 'Tricep Pushdown',
    category: 'triceps',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/tricep-pushdown-1000x1000.jpg',
    muscle1: ['triceps brachii', 'brachialis'],
    videoUrl: ['https://www.youtube.com/embed/WBwvIlLTm00'],
    link: 'tricep pushdown',
  },
  {
    exerciseName: 'Lying Tricep Extension',
    category: 'triceps',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/lying-tricep-extension-1000x1000.jpg',
    muscle1: ['triceps brachii'],
    videoUrl: ['https://www.youtube.com/embed/TJkoGDIdRYk'],
    link: 'lying tricep extension',
  },
  {
    exerciseName: 'Dumbbell Tricep Extension',
    category: 'triceps',
    imageUrl:
      'https://static.strengthlevel.com/images/illustrations/dumbbell-tricep-extension-1000x1000.jpg',
    muscle1: ['triceps brachii'],
    videoUrl: ['https://www.youtube.com/embed/mJf7Q8_nJMk'],
    link: 'dumbbell tricep extension',
  },
];
