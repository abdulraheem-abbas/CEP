// Curriculum Hub data — Grade 1–12, organised by grade group and subject.
// External resources are shown when platform content is sparse.

export const GRADE_GROUPS = [
  { range: [1, 3], label: 'Primary I', labelAr: 'ابتدائي (أول–ثالث)', color: 'emerald' },
  { range: [4, 6], label: 'Primary II', labelAr: 'ابتدائي (رابع–سادس)', color: 'blue' },
  { range: [7, 9], label: 'Preparatory', labelAr: 'إعدادي (سابع–تاسع)', color: 'violet' },
  { range: [10, 12], label: 'Secondary', labelAr: 'ثانوي (عاشر–ثاني عشر)', color: 'amber' },
]

export const SUBJECTS = [
  { id: 'math', name: 'Mathematics', nameAr: 'الرياضيات', icon: '📐', color: 'blue' },
  { id: 'arabic', name: 'Arabic Language', nameAr: 'اللغة العربية', icon: '✍️', color: 'emerald' },
  { id: 'english', name: 'English', nameAr: 'اللغة الإنجليزية', icon: '🌐', color: 'sky' },
  { id: 'science', name: 'Science', nameAr: 'العلوم', icon: '🔬', color: 'violet' },
  { id: 'social', name: 'Social Studies', nameAr: 'الدراسات الاجتماعية', icon: '🌍', color: 'amber' },
]

// Shared trusted external resources
export const EXTERNAL_RESOURCES = {
  math: [
    { name: 'Khan Academy', nameAr: 'خان أكاديمي', url: 'https://www.khanacademy.org/math', desc: 'Free step-by-step math lessons for all levels', descAr: 'دروس رياضيات مجانية خطوة بخطوة لجميع المستويات' },
    { name: 'Math is Fun', nameAr: 'الرياضيات ممتعة', url: 'https://www.mathsisfun.com', desc: 'Clear explanations with examples and practice', descAr: 'شرح واضح مع أمثلة وتدريبات' },
    { name: 'Brilliant.org', nameAr: 'Brilliant.org', url: 'https://www.brilliant.org', desc: 'Interactive problem solving for curious minds', descAr: 'حل مشكلات تفاعلي للعقول الفضولية' },
  ],
  arabic: [
    { name: 'Edraak (إدراك)', nameAr: 'إدراك', url: 'https://www.edraak.org', desc: "Free Arabic courses from Jordan's eDraak platform", descAr: 'دورات عربية مجانية من منصة إدراك' },
    { name: 'Al-Arabiya Institute', nameAr: 'معهد العربية', url: 'https://al-arabiya.net', desc: 'Arabic grammar and language resources', descAr: 'موارد النحو والصرف واللغة العربية' },
    { name: 'Forvo Arabic', nameAr: 'Forvo عربي', url: 'https://forvo.com/languages/ar', desc: 'Correct Arabic pronunciation guide', descAr: 'دليل النطق الصحيح للعربية' },
  ],
  english: [
    { name: 'British Council Learn English', nameAr: 'المجلس البريطاني', url: 'https://learnenglish.britishcouncil.org', desc: 'Free English lessons for all levels', descAr: 'دروس إنجليزية مجانية لجميع المستويات' },
    { name: 'Khan Academy English', nameAr: 'خان أكاديمي - إنجليزي', url: 'https://www.khanacademy.org/humanities/grammar', desc: 'Grammar lessons and exercises', descAr: 'دروس وتدريبات النحو الإنجليزي' },
    { name: 'BBC Learning English', nameAr: 'تعلم الإنجليزية BBC', url: 'https://www.bbc.co.uk/learningenglish', desc: 'Real-world English from BBC', descAr: 'الإنجليزية الواقعية من BBC' },
  ],
  science: [
    { name: 'Khan Academy Science', nameAr: 'خان أكاديمي - علوم', url: 'https://www.khanacademy.org/science', desc: 'Physics, chemistry, biology for all levels', descAr: 'فيزياء وكيمياء وأحياء لجميع المستويات' },
    { name: 'CK-12', nameAr: 'CK-12', url: 'https://www.ck12.org', desc: 'Free science and math textbooks', descAr: 'كتب مدرسية مجانية للعلوم والرياضيات' },
    { name: 'National Geographic Kids', nameAr: 'ناشيونال جيوغرافيك', url: 'https://kids.nationalgeographic.com', desc: 'Science facts for young learners', descAr: 'حقائق علمية للمتعلمين الصغار' },
  ],
  social: [
    { name: 'Khan Academy History', nameAr: 'خان أكاديمي - تاريخ', url: 'https://www.khanacademy.org/humanities/world-history', desc: 'World history lessons and context', descAr: 'دروس التاريخ العالمي وسياقه' },
    { name: 'National Geographic', nameAr: 'ناشيونال جيوغرافيك', url: 'https://www.nationalgeographic.com', desc: 'Geography, cultures, and world exploration', descAr: 'جغرافيا وثقافات واستكشاف العالم' },
    { name: 'BBC History', nameAr: 'تاريخ BBC', url: 'https://www.bbc.co.uk/history', desc: 'Reliable world history articles', descAr: 'مقالات تاريخ موثوقة' },
  ],
}

// Curriculum content by grade group and subject
export const CURRICULUM = {
  '1-3': {
    math: [
      {
        id: 'g13-m1', title: 'Numbers 1–100', titleAr: 'الأعداد من 1 إلى 100',
        explanation: 'Numbers help us count and order things. We start at 1 and count up to 100. After 9 comes 10, after 19 comes 20, and so on. Try counting the chairs in your classroom!',
        explanationAr: 'الأعداد تساعدنا على العد وترتيب الأشياء. نبدأ من 1 ونعد حتى 100. بعد 9 يأتي 10، وبعد 19 يأتي 20، وهكذا. جرّب عدّ الكراسي في فصلك!',
        keyPoints: ['Count objects one by one', 'Numbers come in order: 1, 2, 3…', 'Every 10 numbers form a group (tens, twenties…)', 'Zero (0) means nothing is there'],
        keyPointsAr: ['عدّ الأشياء واحداً بواحد', 'الأعداد تسير بالترتيب: 1، 2، 3...', 'كل 10 أعداد تشكل مجموعة (عشرات، عشرون...)', 'الصفر (0) يعني لا يوجد شيء'],
      },
      {
        id: 'g13-m2', title: 'Addition (+)', titleAr: 'الجمع (+)',
        explanation: 'Addition means putting two groups together to find the total. If you have 3 apples and get 2 more, you have 5 apples: 3 + 2 = 5. The answer is called the "sum".',
        explanationAr: 'الجمع يعني ضمّ مجموعتين لإيجاد المجموع الكلي. إذا كان لديك 3 تفاحات وأضفت 2 أخرى، أصبح لديك 5 تفاحات: 3 + 2 = 5. والإجابة تُسمى "المجموع".',
        keyPoints: ['Use the + symbol to add', 'Adding 0 to a number keeps it the same', 'You can add in any order: 3+2 = 2+3', 'Addition makes numbers bigger'],
        keyPointsAr: ['نستخدم رمز + للجمع', 'جمع 0 مع أي عدد لا يغيره', 'يمكن الجمع بأي ترتيب: 3+2 = 2+3', 'الجمع يجعل الأعداد أكبر'],
      },
      {
        id: 'g13-m3', title: 'Subtraction (−)', titleAr: 'الطرح (−)',
        explanation: 'Subtraction means taking away. If you have 7 sweets and eat 3, you have 4 left: 7 − 3 = 4. The answer is called the "difference".',
        explanationAr: 'الطرح يعني الأخذ أو التقليص. إذا كان لديك 7 حلويات وأكلت 3، بقي معك 4: 7 − 3 = 4. والإجابة تُسمى "الفرق".',
        keyPoints: ['Use the − symbol to subtract', 'Subtracting 0 keeps the number the same', 'The answer is always smaller than what you started with', 'Check your answer by adding back'],
        keyPointsAr: ['نستخدم رمز − للطرح', 'طرح 0 لا يغير العدد', 'الإجابة دائماً أصغر مما بدأت به', 'تحقق من إجابتك بالجمع مرة أخرى'],
      },
      {
        id: 'g13-m4', title: 'Basic Shapes', titleAr: 'الأشكال الأساسية',
        explanation: 'Shapes are all around us! A circle is perfectly round. A square has 4 equal sides. A triangle has 3 sides. A rectangle has 4 sides — the long sides are equal and the short sides are equal.',
        explanationAr: 'الأشكال في كل مكان حولنا! الدائرة مستديرة تماماً. المربع له 4 أضلاع متساوية. المثلث له 3 أضلاع. المستطيل له 4 أضلاع — الأضلاع الطويلة متساوية والقصيرة متساوية.',
        keyPoints: ['Circle: round with no corners', 'Square: 4 equal sides, 4 corners', 'Triangle: 3 sides, 3 corners', 'Rectangle: 4 sides, 2 long + 2 short'],
        keyPointsAr: ['الدائرة: مستديرة بلا زوايا', 'المربع: 4 أضلاع متساوية و4 زوايا', 'المثلث: 3 أضلاع و3 زوايا', 'المستطيل: 4 أضلاع، ضلعان طويلان وضلعان قصيران'],
      },
    ],
    arabic: [
      {
        id: 'g13-a1', title: 'Arabic Alphabet (الحروف الهجائية)', titleAr: 'الحروف الهجائية',
        explanation: 'The Arabic alphabet has 28 letters. Arabic is written from right to left. Most letters change shape depending on where they appear in a word — at the beginning, middle, or end.',
        explanationAr: 'الأبجدية العربية تتكون من 28 حرفاً. تُكتب العربية من اليمين إلى اليسار. معظم الحروف تتغير أشكالها حسب موقعها في الكلمة — في البداية أو الوسط أو النهاية.',
        keyPoints: ['28 letters in the Arabic alphabet', 'Written right to left', 'Letters can look different at the start, middle, or end of words', 'Some letters are "sun letters", some are "moon letters"'],
        keyPointsAr: ['28 حرفاً في الأبجدية العربية', 'تُكتب من اليمين إلى اليسار', 'الحروف تبدو مختلفة في بداية الكلمة أو وسطها أو نهايتها', 'بعض الحروف شمسية وبعضها قمرية'],
      },
      {
        id: 'g13-a2', title: 'Short Vowels (الحركات)', titleAr: 'الحركات (فتحة – ضمة – كسرة)',
        explanation: 'Arabic has three short vowels written as small marks: Fatha (ـَ) makes an "a" sound, Dhamma (ـُ) makes an "u" sound, and Kasra (ـِ) makes an "i" sound. Sukoon (ـْ) means the letter has no vowel.',
        explanationAr: 'في العربية ثلاث حركات قصيرة تُكتب كعلامات صغيرة: الفتحة (ـَ) صوت الألف، الضمة (ـُ) صوت الواو، الكسرة (ـِ) صوت الياء. السكون (ـْ) يعني أن الحرف لا حركة له.',
        keyPoints: ['Fatha (ـَ): "a" sound — كَتَبَ (kataba)', 'Dhamma (ـُ): "u" sound — كُتُبٌ (kutub)', 'Kasra (ـِ): "i" sound — كِتَابٌ (kitab)', 'Sukoon (ـْ): no vowel — بَيْت (bayt)'],
        keyPointsAr: ['الفتحة (ـَ): صوت الألف — كَتَبَ', 'الضمة (ـُ): صوت الواو — كُتُبٌ', 'الكسرة (ـِ): صوت الياء — كِتَابٌ', 'السكون (ـْ): حرف ساكن — بَيْت'],
      },
      {
        id: 'g13-a3', title: 'Reading Simple Words', titleAr: 'قراءة الكلمات البسيطة',
        explanation: 'Once you know the letters and vowels, you can start reading words. Sound out each letter one by one and put them together. Start with short 2–3 letter words. Practice every day!',
        explanationAr: 'بمجرد أن تعرف الحروف والحركات، يمكنك البدء بقراءة الكلمات. انطق كل حرف على حدة ثم اجمعها معاً. ابدأ بكلمات قصيرة من حرفين أو ثلاثة. تدرّب كل يوم!',
        keyPoints: ['Read from right to left', 'Sound out each letter with its vowel', 'Common words: باب (door), بيت (house), ماء (water)', 'Practice reading out loud for better pronunciation'],
        keyPointsAr: ['اقرأ من اليمين إلى اليسار', 'انطق كل حرف مع حركته', 'كلمات شائعة: باب، بيت، ماء', 'تدرّب على القراءة بصوت عالٍ للنطق الأفضل'],
      },
    ],
    english: [
      {
        id: 'g13-e1', title: 'The English Alphabet (A–Z)', titleAr: 'الأبجدية الإنجليزية (A–Z)',
        explanation: 'English has 26 letters. Each letter has an uppercase (capital) and a lowercase version. For example: A and a, B and b. The five vowel letters are A, E, I, O, U — all other letters are consonants.',
        explanationAr: 'اللغة الإنجليزية لها 26 حرفاً. كل حرف له شكل كبير (capital) وشكل صغير. مثلاً: A و a، B و b. حروف العلة الخمسة هي A، E، I، O، U — وباقي الحروف حروف ساكنة.',
        keyPoints: ['26 letters: A to Z', '5 vowels: A, E, I, O, U', 'English is read and written left to right', 'Both capital and small letters are important'],
        keyPointsAr: ['26 حرفاً من A إلى Z', '5 حروف علة: A، E، I، O، U', 'الإنجليزية تُقرأ وتُكتب من اليسار إلى اليمين', 'الحروف الكبيرة والصغيرة كلها مهمة'],
      },
      {
        id: 'g13-e2', title: 'Colors, Numbers & Greetings', titleAr: 'الألوان والأرقام والتحيات',
        explanation: 'These are some of the first words you need in English. Colors: red, blue, green, yellow. Numbers: one, two, three… ten. Greetings: Hello!, Good morning!, My name is…, How are you?',
        explanationAr: 'هذه من أول الكلمات التي تحتاجها بالإنجليزية. الألوان: أحمر red، أزرق blue، أخضر green، أصفر yellow. الأرقام: one، two، three... ten. التحيات: Hello!، Good morning!، My name is...، How are you?',
        keyPoints: ['Basic colors: red, blue, green, yellow, white, black', 'Numbers 1–10: one, two, three, four, five, six, seven, eight, nine, ten', 'Greetings: Hello / Hi / Good morning / Good afternoon', 'Introduce yourself: "My name is ___. I am ___ years old."'],
        keyPointsAr: ['الألوان الأساسية: red أحمر، blue أزرق، green أخضر', 'الأرقام 1-10: one، two، three... ten', 'التحيات: Hello أهلاً / Good morning صباح الخير', 'قدّم نفسك: "My name is ___. I am ___ years old."'],
      },
    ],
    science: [
      {
        id: 'g13-s1', title: 'Living & Non-living Things', titleAr: 'الكائنات الحية وغير الحية',
        explanation: 'Living things are alive — they grow, breathe, eat, move, and have babies. Non-living things don\'t do any of these. A cat is living. A rock is non-living. Plants are living too!',
        explanationAr: 'الكائنات الحية تعيش — تنمو وتتنفس وتأكل وتتحرك وتتكاثر. الأشياء غير الحية لا تفعل أياً من هذه. القطة كائن حي. الصخرة غير حية. النباتات أيضاً كائنات حية!',
        keyPoints: ['Living things: humans, animals, plants, fungi', 'Non-living things: rocks, water, air, cars, tables', 'All living things need water, food, and air', 'Living things grow and change over time'],
        keyPointsAr: ['الكائنات الحية: البشر، الحيوانات، النباتات، الفطريات', 'الأشياء غير الحية: الصخور، الماء، الهواء، السيارات، الطاولات', 'كل الكائنات الحية تحتاج ماء وغذاء وهواء', 'الكائنات الحية تنمو وتتغير مع الوقت'],
      },
      {
        id: 'g13-s2', title: 'Animals & Their Habitats', titleAr: 'الحيوانات وبيئاتها',
        explanation: 'Animals live in different places called "habitats". Fish live in water. Lions live on grasslands. Eagles live in mountains. Each animal is perfectly built for its habitat.',
        explanationAr: 'تعيش الحيوانات في أماكن مختلفة تُسمى "البيئات". الأسماك تعيش في الماء. الأسود تعيش في السهول. النسور تعيش في الجبال. كل حيوان مبني بشكل مثالي ليناسب بيئته.',
        keyPoints: ['Habitat = the natural home of an animal', 'Ocean: fish, whales, dolphins, sharks', 'Desert: camels, scorpions, lizards', 'Forest: bears, birds, deer, insects', 'Animals eat plants (herbivores), animals (carnivores), or both (omnivores)'],
        keyPointsAr: ['البيئة = الموطن الطبيعي للحيوان', 'المحيط: الأسماك، الحيتان، الدلافين', 'الصحراء: الجمال، العقارب، السحالي', 'الغابة: الدببة، الطيور، الغزلان', 'تأكل الحيوانات نباتات (عاشبة) أو حيوانات (آكلة لحوم) أو كليهما (آكلة للجميع)'],
      },
    ],
    social: [
      {
        id: 'g13-ss1', title: 'My Family & Community', titleAr: 'عائلتي ومجتمعي',
        explanation: 'Your family is the people closest to you — parents, siblings, grandparents. Your community is all the people in your neighborhood, school, and town. We all have roles and help each other.',
        explanationAr: 'عائلتك هم الأشخاص الأقرب إليك — الوالدان والإخوة والأجداد. مجتمعك هو جميع الناس في حيّك ومدرستك وبلدتك. لكلٍّ منا دور ونتعاون مع بعضنا.',
        keyPoints: ['Family: parents, siblings, grandparents, relatives', 'Community helpers: teachers, doctors, police, farmers', 'Rules help us live together peacefully', 'Respecting others makes communities stronger'],
        keyPointsAr: ['العائلة: الوالدان والإخوة والأجداد والأقارب', 'مساعدو المجتمع: المعلمون والأطباء والشرطة والمزارعون', 'القواعد تساعدنا على العيش معاً بسلام', 'احترام الآخرين يجعل المجتمعات أقوى'],
      },
    ],
  },

  '4-6': {
    math: [
      {
        id: 'g46-m1', title: 'Multiplication Tables', titleAr: 'جداول الضرب',
        explanation: 'Multiplication is repeated addition. 3 × 4 means "3 groups of 4" which equals 12. Knowing your times tables (1×1 up to 12×12) by heart makes all of math much easier!',
        explanationAr: 'الضرب هو جمع متكرر. 3 × 4 تعني "3 مجموعات من 4" وتساوي 12. حفظ جداول الضرب (من 1×1 حتى 12×12) يجعل الرياضيات كلها أسهل بكثير!',
        keyPoints: ['3 × 4 = 4 + 4 + 4 = 12', 'Any number × 0 = 0', 'Any number × 1 = that same number', 'Multiplication can be done in any order: 3×4 = 4×3'],
        keyPointsAr: ['3 × 4 = 4 + 4 + 4 = 12', 'أي عدد × 0 = 0', 'أي عدد × 1 = نفس العدد', 'الضرب يمكن أن يتم بأي ترتيب: 3×4 = 4×3'],
      },
      {
        id: 'g46-m2', title: 'Fractions', titleAr: 'الكسور',
        explanation: 'A fraction shows part of a whole. If you cut a pizza into 4 equal slices and eat 1, you ate 1/4 (one quarter). The bottom number (denominator) is how many equal parts. The top number (numerator) is how many you have.',
        explanationAr: 'الكسر يُظهر جزءاً من الكل. إذا قطعت بيتزا إلى 4 شرائح متساوية وأكلت 1، فقد أكلت 1/4 (ربعاً). الرقم السفلي (المقام) هو عدد الأجزاء المتساوية. الرقم العلوي (البسط) هو ما لديك.',
        keyPoints: ['Fraction = numerator ÷ denominator', '1/2 = one half, 1/4 = one quarter, 1/3 = one third', 'Same denominator → add/subtract numerators only', 'Proper fractions: numerator < denominator (e.g., 3/4)'],
        keyPointsAr: ['الكسر = البسط ÷ المقام', '1/2 = نصف، 1/4 = ربع، 1/3 = ثلث', 'مقامات متساوية → اجمع أو اطرح البسط فقط', 'كسر حقيقي: البسط < المقام (مثل 3/4)'],
      },
      {
        id: 'g46-m3', title: 'Area & Perimeter', titleAr: 'المساحة والمحيط',
        explanation: 'Perimeter is the total distance around a shape. Area is the amount of space inside it. For a rectangle: Perimeter = 2 × (length + width). Area = length × width.',
        explanationAr: 'المحيط هو المسافة الكلية حول الشكل. المساحة هي كمية الفراغ داخله. للمستطيل: المحيط = 2 × (الطول + العرض). المساحة = الطول × العرض.',
        keyPoints: ['Perimeter of rectangle = 2(l + w)', 'Area of rectangle = l × w', 'Area is measured in square units (cm², m²)', 'Perimeter is measured in regular units (cm, m)'],
        keyPointsAr: ['محيط المستطيل = 2(الطول + العرض)', 'مساحة المستطيل = الطول × العرض', 'المساحة تُقاس بالوحدات المربعة (سم²، م²)', 'المحيط يُقاس بوحدات عادية (سم، م)'],
      },
      {
        id: 'g46-m4', title: 'Decimals & Percentages', titleAr: 'الأعداد العشرية والنسبة المئوية',
        explanation: 'Decimals are another way to write fractions. 0.5 = 1/2. A percentage is a fraction out of 100. 50% means 50 out of every 100, which is the same as 1/2.',
        explanationAr: 'الأعداد العشرية طريقة أخرى لكتابة الكسور. 0.5 = 1/2. النسبة المئوية هي كسر من 100. 50% تعني 50 من كل 100، وهو نفس 1/2.',
        keyPoints: ['0.5 = 1/2 = 50%', '0.25 = 1/4 = 25%', '0.75 = 3/4 = 75%', 'To find 20% of 60: 60 × 0.20 = 12'],
        keyPointsAr: ['0.5 = 1/2 = 50%', '0.25 = 1/4 = 25%', '0.75 = 3/4 = 75%', 'لإيجاد 20% من 60: 60 × 0.20 = 12'],
      },
    ],
    arabic: [
      {
        id: 'g46-a1', title: 'Parts of Speech (أقسام الكلام)', titleAr: 'أقسام الكلام',
        explanation: 'In Arabic, words are divided into three types: اسم (noun/name), فعل (verb), and حرف (particle/preposition). Every sentence is built from these three building blocks.',
        explanationAr: 'في العربية، تنقسم الكلمات إلى ثلاثة أنواع: اسم وفعل وحرف. كل جملة مبنية من هذه المكونات الثلاثة.',
        keyPoints: ['اسم (Ism) = noun: refers to a person, place, or thing (كتاب، مدينة، محمد)', 'فعل (Fi\'l) = verb: shows an action (كَتَبَ، يَذهَب، قَرَأ)', 'حرف (Harf) = particle: connects or adds meaning (في، على، من)', 'Identifying these correctly is the foundation of Arabic grammar'],
        keyPointsAr: ['اسم = يدل على شخص أو مكان أو شيء (كتاب، مدينة، محمد)', 'فعل = يدل على حدث أو عمل (كَتَبَ، يَذهَب، قَرَأ)', 'حرف = يربط أو يضيف معنى (في، على، من)', 'معرفة هذه الأنواع هي أساس النحو العربي'],
      },
      {
        id: 'g46-a2', title: 'Reading Comprehension', titleAr: 'الفهم القرائي',
        explanation: 'Reading comprehension means understanding what you read, not just saying the words. Ask yourself: What is this text about? Who is in it? What happened? What is the main idea?',
        explanationAr: 'الفهم القرائي يعني فهم ما تقرأه، لا مجرد نطق الكلمات. اسأل نفسك: عمَ يتحدث هذا النص؟ من فيه؟ ماذا حدث؟ ما الفكرة الرئيسية؟',
        keyPoints: ['Read the title first — it hints at the topic', 'Read slowly and think about what each sentence means', 'Underline words you don\'t know and guess from context', 'Summarize the text in your own words after reading'],
        keyPointsAr: ['اقرأ العنوان أولاً — إنه يلمح للموضوع', 'اقرأ ببطء وفكّر في معنى كل جملة', 'ضع خطاً تحت الكلمات التي لا تعرفها وحاول تخمينها من السياق', 'لخّص النص بكلماتك بعد القراءة'],
      },
    ],
    english: [
      {
        id: 'g46-e1', title: 'Simple Present Tense', titleAr: 'المضارع البسيط',
        explanation: 'We use the simple present tense to talk about things that happen regularly or are always true. For example: "I go to school every day." "The sun rises in the east." For he/she/it, add -s or -es to the verb.',
        explanationAr: 'نستخدم المضارع البسيط للحديث عن الأشياء التي تحدث بانتظام أو هي دائماً صحيحة. مثلاً: "I go to school every day." "The sun rises in the east." مع he/she/it نضيف -s أو -es للفعل.',
        keyPoints: ['I/you/we/they + base verb: "I eat breakfast daily"', 'He/she/it + verb+s: "She eats breakfast daily"', 'Negatives: "I do not (don\'t) like coffee"', 'Questions: "Do you like coffee?"'],
        keyPointsAr: ['I/you/we/they + الفعل الأساسي: "I eat breakfast daily"', 'He/she/it + فعل+s: "She eats breakfast daily"', 'النفي: "I do not (don\'t) like coffee"', 'الأسئلة: "Do you like coffee?"'],
      },
      {
        id: 'g46-e2', title: 'Writing Simple Paragraphs', titleAr: 'كتابة فقرات بسيطة',
        explanation: 'A paragraph is a group of sentences about one idea. It starts with a topic sentence (main idea), followed by supporting sentences (details), and ends with a concluding sentence.',
        explanationAr: 'الفقرة هي مجموعة جمل حول فكرة واحدة. تبدأ بجملة الموضوع (الفكرة الرئيسية)، تليها جمل داعمة (التفاصيل)، وتنتهي بجملة خاتمة.',
        keyPoints: ['Topic sentence: states the main idea', 'Supporting sentences: give details and examples', 'Concluding sentence: wraps up the paragraph', 'Every sentence starts with a capital letter and ends with a period'],
        keyPointsAr: ['جملة الموضوع: تحدد الفكرة الرئيسية', 'الجمل الداعمة: تقدم التفاصيل والأمثلة', 'الجملة الخاتمة: تختتم الفقرة', 'كل جملة تبدأ بحرف كبير وتنتهي بنقطة'],
      },
    ],
    science: [
      {
        id: 'g46-s1', title: 'States of Matter', titleAr: 'حالات المادة',
        explanation: 'Matter exists in three main states: solid, liquid, and gas. Ice is solid water. Liquid water flows freely. Steam is water as gas. Heat can change matter from one state to another.',
        explanationAr: 'توجد المادة في ثلاث حالات رئيسية: صلبة وسائلة وغازية. الجليد ماء صلب. الماء السائل يتدفق بحرية. البخار ماء في حالته الغازية. الحرارة يمكنها تغيير حالة المادة.',
        keyPoints: ['Solid: definite shape and volume (ice, rock, wood)', 'Liquid: definite volume, takes the shape of its container (water, juice)', 'Gas: no definite shape or volume (air, steam)', 'Melting: solid → liquid, Freezing: liquid → solid, Evaporation: liquid → gas'],
        keyPointsAr: ['صلب: شكل وحجم محددان (جليد، صخرة، خشب)', 'سائل: حجم محدد يأخذ شكل الإناء (ماء، عصير)', 'غاز: لا شكل ولا حجم محدد (هواء، بخار)', 'الذوبان: صلب← سائل، التجمد: سائل← صلب، التبخر: سائل← غاز'],
      },
      {
        id: 'g46-s2', title: 'The Solar System', titleAr: 'المجموعة الشمسية',
        explanation: 'Our solar system has the Sun at the center with 8 planets orbiting it. In order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. Earth is the 3rd planet and the only one with life.',
        explanationAr: 'مجموعتنا الشمسية لها الشمس في المركز وحولها 8 كواكب. بالترتيب من الشمس: عطارد، الزهرة، الأرض، المريخ، المشتري، زحل، أورانوس، نبتون. الأرض الكوكب الثالث والوحيد المعروف بحياة.',
        keyPoints: ['8 planets in our solar system', 'Mnemonic: My Very Educated Mother Just Served Us Noodles', 'The Sun is a star — Earth orbits it once a year', 'The Moon orbits Earth — one orbit takes about 29 days'],
        keyPointsAr: ['8 كواكب في مجموعتنا الشمسية', 'ترتيبها: عطارد، الزهرة، الأرض، المريخ، المشتري، زحل، أورانوس، نبتون', 'الشمس نجم — تدور الأرض حوله مرة كل سنة', 'القمر يدور حول الأرض — كل دورة تستغرق نحو 29 يوماً'],
      },
    ],
    social: [
      {
        id: 'g46-ss1', title: 'Ancient Egypt & Yemen', titleAr: 'مصر القديمة واليمن',
        explanation: 'Egypt is one of the oldest civilizations in the world, known for the Pharaohs, the Nile River, and the pyramids. Yemen is one of the oldest inhabited regions in Arabia, home to ancient kingdoms like Sheba (سبأ).',
        explanationAr: 'مصر من أقدم الحضارات في العالم، اشتهرت بالفراعنة ونهر النيل والأهرامات. اليمن من أقدم المناطق المأهولة في الجزيرة العربية، وموطن ممالك قديمة كسبأ.',
        keyPoints: ['Ancient Egypt: 3100 BCE – 30 BCE, along the Nile River', 'Famous for: Pyramids, Sphinx, hieroglyphics, mummification', 'Yemen/Sheba: ancient trade routes, Marib Dam, frankincense trade', 'Both civilizations were centers of knowledge and culture'],
        keyPointsAr: ['مصر القديمة: 3100 ق.م – 30 ق.م، على ضفاف نهر النيل', 'اشتهرت بـ: الأهرامات، أبو الهول، الهيروغليفية، التحنيط', 'اليمن/سبأ: طرق التجارة القديمة، سد مأرب، تجارة اللبان', 'كلتا الحضارتين كانتا مراكز للمعرفة والثقافة'],
      },
    ],
  },

  '7-9': {
    math: [
      {
        id: 'g79-m1', title: 'Algebra: Variables & Equations', titleAr: 'الجبر: المتغيرات والمعادلات',
        explanation: 'Algebra uses letters (variables) to represent unknown numbers. An equation is a statement that two things are equal. To solve x + 5 = 12, subtract 5 from both sides: x = 7.',
        explanationAr: 'يستخدم الجبر الحروف (المتغيرات) لتمثيل أعداد مجهولة. المعادلة هي عبارة تقول أن شيئين متساويان. لحل x + 5 = 12، اطرح 5 من كلا الطرفين: x = 7.',
        keyPoints: ['Variable: a letter that represents an unknown (x, y, n)', 'Equation: has an "=" sign — e.g., 2x + 3 = 11', 'To solve: do the same operation to both sides', 'Check your answer by substituting back into the equation'],
        keyPointsAr: ['المتغير: حرف يمثل مجهولاً (x، y، n)', 'المعادلة: لها علامة "=" — مثلاً 2x + 3 = 11', 'للحل: قم بنفس العملية على الطرفين', 'تحقق من إجابتك بتعويضها في المعادلة'],
      },
      {
        id: 'g79-m2', title: 'Geometry: Angles & Triangles', titleAr: 'الهندسة: الزوايا والمثلثات',
        explanation: 'An angle is formed where two lines meet. Angles are measured in degrees (°). A right angle = 90°. Acute angle < 90°. Obtuse angle > 90°. The angles in any triangle always add up to 180°.',
        explanationAr: 'الزاوية تتشكل عند التقاء خطين. تُقاس الزوايا بالدرجات (°). الزاوية القائمة = 90°. الزاوية الحادة < 90°. الزاوية المنفرجة > 90°. زوايا أي مثلث مجموعها دائماً 180°.',
        keyPoints: ['Right angle: exactly 90°', 'Acute angle: less than 90°', 'Obtuse angle: between 90° and 180°', 'Triangle angles sum = 180°', 'Pythagorean theorem: a² + b² = c² (for right triangles)'],
        keyPointsAr: ['الزاوية القائمة: 90° تماماً', 'الزاوية الحادة: أقل من 90°', 'الزاوية المنفرجة: بين 90° و180°', 'مجموع زوايا المثلث = 180°', 'نظرية فيثاغورس: a² + b² = c² (للمثلثات القائمة)'],
      },
      {
        id: 'g79-m3', title: 'Statistics & Probability', titleAr: 'الإحصاء والاحتمالات',
        explanation: 'Statistics is collecting and analyzing data. Mean (average) = sum of all values ÷ number of values. Median = the middle value. Mode = most frequent value. Probability tells us how likely something is to happen.',
        explanationAr: 'الإحصاء هو جمع البيانات وتحليلها. المتوسط = مجموع القيم ÷ عددها. الوسيط = القيمة الوسطى. المنوال = القيمة الأكثر تكراراً. الاحتمال يخبرنا عن مدى إمكانية حدوث شيء ما.',
        keyPoints: ['Mean: add all values, divide by count', 'Median: sort the values, find the middle one', 'Mode: the most frequent value', 'Probability = (favorable outcomes) ÷ (total outcomes), between 0 and 1'],
        keyPointsAr: ['المتوسط: اجمع القيم كلها ثم اقسم على عددها', 'الوسيط: رتّب القيم وأوجد الوسطى', 'المنوال: القيمة الأكثر تكراراً', 'الاحتمال = (النتائج المواتية) ÷ (النتائج الكلية)، بين 0 و1'],
      },
    ],
    arabic: [
      {
        id: 'g79-a1', title: 'Sentence Structure (الجملة)', titleAr: 'تركيب الجملة العربية',
        explanation: 'Arabic has two types of sentences: الجملة الاسمية (Nominal sentence — starts with a noun) and الجملة الفعلية (Verbal sentence — starts with a verb). Each has specific grammatical rules for endings (إعراب).',
        explanationAr: 'للعربية نوعان من الجمل: الجملة الاسمية (تبدأ باسم) والجملة الفعلية (تبدأ بفعل). لكل منهما قواعد نحوية محددة لضبط الأواخر (الإعراب).',
        keyPoints: ['Nominal sentence: المبتدأ + الخبر (subject + predicate)', 'Verbal sentence: الفعل + الفاعل + المفعول (verb + subject + object)', 'إعراب: word endings change based on function in the sentence', 'الفاعل (subject of verb) always takes الضمة (ـُ)'],
        keyPointsAr: ['الجملة الاسمية: المبتدأ + الخبر', 'الجملة الفعلية: الفعل + الفاعل + المفعول به', 'الإعراب: تتغير أواخر الكلمات حسب وظيفتها في الجملة', 'الفاعل دائماً مرفوع (ـُ)'],
      },
      {
        id: 'g79-a2', title: 'Essay & Composition Writing', titleAr: 'كتابة المقال والتعبير',
        explanation: 'A good essay has an introduction (paragraph 1 — introduce your topic), body paragraphs (paragraphs 2–3 — your ideas and evidence), and a conclusion (last paragraph — summarize and final thought).',
        explanationAr: 'المقال الجيد له مقدمة (فقرة 1 — قدّم موضوعك)، وفقرات الجسم (فقرتان 2-3 — أفكارك وأدلتك)، وخاتمة (الفقرة الأخيرة — الخلاصة والفكرة الختامية).',
        keyPoints: ['Introduction: hook + background + thesis statement', 'Body: each paragraph = 1 main idea + evidence', 'Conclusion: restate thesis + final thought', 'Use connecting words: أولاً، ثانياً، بالإضافة، في الختام'],
        keyPointsAr: ['المقدمة: مقدمة جذابة + خلفية + الفكرة الرئيسية', 'الجسم: كل فقرة = فكرة رئيسية + دليل', 'الخاتمة: إعادة الفكرة الرئيسية + الفكرة الختامية', 'استخدم الروابط: أولاً، ثانياً، بالإضافة، في الختام'],
      },
    ],
    english: [
      {
        id: 'g79-e1', title: 'Past, Present & Future Tenses', titleAr: 'الأزمنة: الماضي والحاضر والمستقبل',
        explanation: 'English verbs change form to show when something happened. Past: "I studied yesterday." Present: "I study every day." Future: "I will study tomorrow." There are also continuous forms for ongoing actions.',
        explanationAr: 'تتغير الأفعال الإنجليزية لتُظهر متى حدث الشيء. الماضي: "I studied yesterday." الحاضر: "I study every day." المستقبل: "I will study tomorrow." هناك أيضاً صيغ مستمرة للأفعال الجارية.',
        keyPoints: ['Simple past: verb + -ed (regular) OR irregular forms (go→went)', 'Present continuous: am/is/are + verb-ing', 'Future simple: will + base verb', 'Past continuous: was/were + verb-ing'],
        keyPointsAr: ['الماضي البسيط: فعل + -ed (منتظم) أو أشكال شاذة (go→went)', 'المضارع المستمر: am/is/are + فعل-ing', 'المستقبل البسيط: will + الفعل الأساسي', 'الماضي المستمر: was/were + فعل-ing'],
      },
    ],
    science: [
      {
        id: 'g79-s1', title: 'Forces & Motion (Physics)', titleAr: 'القوى والحركة (الفيزياء)',
        explanation: 'A force is a push or pull that can change the motion of an object. Newton\'s First Law: an object stays at rest or moves at constant speed unless a force acts on it. Force = Mass × Acceleration (F = ma).',
        explanationAr: 'القوة هي دفع أو شد يمكنه تغيير حركة جسم ما. القانون الأول لنيوتن: الجسم يبقى ساكناً أو يتحرك بسرعة ثابتة ما لم تؤثر عليه قوة. القوة = الكتلة × التسارع (F = ma).',
        keyPoints: ['Force is measured in Newtons (N)', 'Gravity pulls objects toward Earth\'s center', 'Friction slows objects down', 'Newton\'s 3rd Law: every action has an equal and opposite reaction'],
        keyPointsAr: ['القوة تُقاس بالنيوتن (N)', 'الجاذبية تسحب الأجسام نحو مركز الأرض', 'الاحتكاك يبطئ الأجسام', 'القانون الثالث لنيوتن: لكل فعل ردّ فعل مساوٍ ومعاكس'],
      },
      {
        id: 'g79-s2', title: 'Cells: The Building Blocks of Life', titleAr: 'الخلايا: لبنات الحياة',
        explanation: 'All living things are made of cells. A cell is the smallest unit of life. Animal cells and plant cells are similar but different — plant cells have a cell wall and chloroplasts, animal cells don\'t.',
        explanationAr: 'كل الكائنات الحية مكوّنة من خلايا. الخلية هي أصغر وحدة للحياة. الخلايا الحيوانية والنباتية متشابهة لكنها مختلفة — الخلية النباتية لها جدار خلوي وبلاستيدات خضراء، أما الحيوانية فلا.',
        keyPoints: ['Cell membrane: controls what enters/exits the cell', 'Nucleus: the "brain" — contains DNA', 'Mitochondria: the "powerhouse" — produces energy', 'Chloroplasts (plants only): converts sunlight into food (photosynthesis)'],
        keyPointsAr: ['غشاء الخلية: يتحكم بما يدخل ويخرج من الخلية', 'النواة: "الدماغ" — تحتوي على DNA', 'الميتوكوندريا: "محطة الطاقة" — تنتج الطاقة', 'البلاستيدات الخضراء (النبات فقط): تحوّل ضوء الشمس إلى غذاء (التمثيل الضوئي)'],
      },
    ],
    social: [
      {
        id: 'g79-ss1', title: 'World History: Key Civilizations', titleAr: 'التاريخ العالمي: الحضارات الكبرى',
        explanation: 'World history is the story of how human societies developed. Key ancient civilizations include Mesopotamia (Iraq), Egypt, Greece, Rome, China, and India. Each contributed ideas in science, law, art, and government.',
        explanationAr: 'التاريخ العالمي هو قصة تطور المجتمعات البشرية. الحضارات القديمة الرئيسية تشمل بلاد الرافدين (العراق) ومصر واليونان وروما والصين والهند. كل منها قدّمت أفكاراً في العلوم والقانون والفن والحكم.',
        keyPoints: ['Mesopotamia: first writing (cuneiform), code of Hammurabi', 'Ancient Egypt: hieroglyphics, pyramids, papyrus, astronomy', 'Ancient Greece: democracy, philosophy (Socrates, Plato, Aristotle), Olympics', 'Islamic Golden Age: algebra, medicine, translation of ancient texts'],
        keyPointsAr: ['بلاد الرافدين: أول كتابة (المسمارية)، قانون حمورابي', 'مصر القديمة: الهيروغليفية، الأهرامات، البردي، الفلك', 'اليونان القديمة: الديمقراطية، الفلسفة، الأولمبياد', 'العصر الذهبي الإسلامي: الجبر، الطب، ترجمة النصوص القديمة'],
      },
    ],
  },

  '10-12': {
    math: [
      {
        id: 'g1012-m1', title: 'Trigonometry', titleAr: 'علم المثلثات',
        explanation: 'Trigonometry studies the relationship between angles and sides in triangles. The three main functions are sine (sin), cosine (cos), and tangent (tan). In a right triangle: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse.',
        explanationAr: 'علم المثلثات يدرس العلاقة بين الزوايا والأضلاع في المثلثات. الدوال الثلاث الرئيسية هي الجيب (sin) وجيب التمام (cos) والظل (tan). في المثلث القائم: sin θ = المقابل/الوتر، cos θ = المجاور/الوتر.',
        keyPoints: ['sin θ = opposite / hypotenuse', 'cos θ = adjacent / hypotenuse', 'tan θ = opposite / adjacent (or sin/cos)', 'SOH-CAH-TOA: memory trick for these formulas', 'Angles 30°, 45°, 60° have standard values worth memorizing'],
        keyPointsAr: ['sin θ = المقابل ÷ الوتر', 'cos θ = المجاور ÷ الوتر', 'tan θ = المقابل ÷ المجاور (أو sin ÷ cos)', 'SOH-CAH-TOA: طريقة سهلة لتذكر هذه الصيغ', 'الزوايا 30° و45° و60° لها قيم قياسية تستحق الحفظ'],
      },
      {
        id: 'g1012-m2', title: 'Introduction to Calculus', titleAr: 'مقدمة في حساب التفاضل والتكامل',
        explanation: 'Calculus has two parts: Differentiation (finding rates of change) and Integration (finding areas under curves). The derivative of a function tells you its slope at any point. If f(x) = x², then f\'(x) = 2x.',
        explanationAr: 'حساب التفاضل والتكامل له جزآن: التفاضل (إيجاد معدلات التغير) والتكامل (إيجاد المساحات تحت المنحنيات). مشتقة الدالة تخبرك بميلها عند أي نقطة. إذا f(x) = x²، فإن f\'(x) = 2x.',
        keyPoints: ['Limit: the value a function approaches as x gets close to a number', 'Derivative: rate of change, d/dx of x^n = n·x^(n-1)', 'Power rule: d/dx(x³) = 3x²', 'Integral: reverse of derivative — ∫x² dx = x³/3 + C'],
        keyPointsAr: ['النهاية: القيمة التي تقترب منها الدالة عندما يقترب x من عدد ما', 'المشتقة: معدل التغير، d/dx من x^n = n·x^(n-1)', 'قاعدة القوى: d/dx(x³) = 3x²', 'التكامل: عكس المشتقة — ∫x² dx = x³/3 + C'],
      },
    ],
    arabic: [
      {
        id: 'g1012-a1', title: 'Literary Analysis (النقد الأدبي)', titleAr: 'النقد الأدبي',
        explanation: 'Literary analysis means closely reading a text to understand its meaning, style, and themes. Ask: Who is speaking? What images and metaphors are used? What is the tone? What is the message?',
        explanationAr: 'النقد الأدبي يعني قراءة النص بعناية لفهم معناه وأسلوبه وموضوعاته. اسأل: من يتكلم؟ ما الصور والاستعارات المستخدمة؟ ما النبرة؟ ما الرسالة؟',
        keyPoints: ['Theme: the central message or idea', 'Imagery: descriptive language that appeals to the senses', 'Metaphor: comparing two unlike things without "like/as"', 'Simile: comparison using "like" or "as" (كأن، مثل)', 'Tone: the attitude of the writer toward the subject'],
        keyPointsAr: ['الموضوع: الرسالة أو الفكرة المحورية', 'الصورة الأدبية: لغة وصفية تخاطب الحواس', 'الاستعارة: مقارنة بين شيئين مختلفين بدون "مثل/كأن"', 'التشبيه: مقارنة باستخدام "مثل" أو "كأن"', 'النبرة: موقف الكاتب من الموضوع'],
      },
    ],
    english: [
      {
        id: 'g1012-e1', title: 'Essay Writing: Arguments & Evidence', titleAr: 'كتابة المقالات: الحجج والأدلة',
        explanation: 'An argumentative essay presents a claim and supports it with evidence. Structure: Introduction (thesis) → Body (argument 1, argument 2, counter-argument) → Conclusion. Use evidence: statistics, quotes, examples.',
        explanationAr: 'المقال الحجاجي يقدم ادعاءً ويدعمه بأدلة. الهيكل: مقدمة (الأطروحة) ← الجسم (حجة 1، حجة 2، الرأي المقابل) ← خاتمة. استخدم أدلة: إحصائيات، اقتباسات، أمثلة.',
        keyPoints: ['Thesis statement: your main argument in one sentence', 'Topic sentence: starts each body paragraph', 'Evidence: facts, statistics, expert quotes, examples', 'Counter-argument: address the opposing view, then refute it', 'Conclusion: restate thesis + call to action or broader implication'],
        keyPointsAr: ['الأطروحة: حجتك الرئيسية في جملة واحدة', 'جملة الموضوع: تبدأ كل فقرة في الجسم', 'الدليل: حقائق وإحصائيات واقتباسات خبراء وأمثلة', 'الرأي المقابل: تناول وجهة النظر المعارضة ثم ردّ عليها', 'الخاتمة: إعادة الأطروحة + نداء للعمل أو دلالة أوسع'],
      },
    ],
    science: [
      {
        id: 'g1012-s1', title: 'Physics: Electricity & Magnetism', titleAr: 'الفيزياء: الكهرباء والمغناطيسية',
        explanation: 'Electric current is the flow of electrons. Ohm\'s Law: V = IR (Voltage = Current × Resistance). Magnets have north and south poles — like poles repel, opposite poles attract. Electricity and magnetism are fundamentally connected.',
        explanationAr: 'التيار الكهربائي هو تدفق الإلكترونات. قانون أوم: V = IR (الجهد = التيار × المقاومة). للمغناطيس قطبان شمالي وجنوبي — القطبان المتشابهان يتنافران والمختلفان يتجاذبان.',
        keyPoints: ['Voltage (V): electrical pressure, measured in Volts', 'Current (I): flow of electrons, measured in Amperes (A)', 'Resistance (R): opposition to flow, measured in Ohms (Ω)', 'Ohm\'s Law: V = I × R', 'Series circuit: current same everywhere; Parallel circuit: voltage same everywhere'],
        keyPointsAr: ['الجهد (V): الضغط الكهربائي، يُقاس بالفولت', 'التيار (I): تدفق الإلكترونات، يُقاس بالأمبير', 'المقاومة (R): مقاومة التدفق، تُقاس بالأوم (Ω)', 'قانون أوم: V = I × R', 'الدائرة التسلسلية: التيار متساوٍ في كل مكان؛ الدائرة المتفرعة: الجهد متساوٍ في كل مكان'],
      },
      {
        id: 'g1012-s2', title: 'Chemistry: Chemical Bonds', titleAr: 'الكيمياء: الروابط الكيميائية',
        explanation: 'Atoms bond together to form molecules. Ionic bonds form between metals and non-metals (electrons transferred). Covalent bonds form between non-metals (electrons shared). These bonds determine the properties of substances.',
        explanationAr: 'تترابط الذرات لتشكل جزيئات. الرابطة الأيونية تتشكل بين الفلزات وغير الفلزات (نقل إلكترونات). الرابطة التساهمية تتشكل بين غير الفلزات (مشاركة إلكترونات). هذه الروابط تحدد خصائص المواد.',
        keyPoints: ['Ionic bond: metal + non-metal, transfer of electrons (e.g., NaCl)', 'Covalent bond: non-metal + non-metal, sharing electrons (e.g., H₂O, CO₂)', 'Electronegativity determines bond type', 'Polar covalent: unequal sharing (e.g., H₂O)', 'Non-polar covalent: equal sharing (e.g., O₂, N₂)'],
        keyPointsAr: ['الرابطة الأيونية: فلز + غير فلز، نقل إلكترونات (مثل NaCl)', 'الرابطة التساهمية: غير فلز + غير فلز، مشاركة إلكترونات (مثل H₂O، CO₂)', 'الكهروسالبية تحدد نوع الرابطة', 'التساهمية القطبية: مشاركة غير متساوية (مثل H₂O)', 'التساهمية غير القطبية: مشاركة متساوية (مثل O₂، N₂)'],
      },
    ],
    social: [
      {
        id: 'g1012-ss1', title: 'Economics: Supply, Demand & Markets', titleAr: 'الاقتصاد: العرض والطلب والأسواق',
        explanation: 'Economics studies how people and societies allocate scarce resources. Supply is how much producers offer. Demand is how much consumers want. When supply is low and demand is high, prices rise. Markets balance supply and demand.',
        explanationAr: 'الاقتصاد يدرس كيفية توزيع الموارد الشحيحة. العرض هو ما يقدمه المنتجون. الطلب هو ما يريده المستهلكون. عندما يكون العرض منخفضاً والطلب مرتفعاً، ترتفع الأسعار. تعمل الأسواق على توازن العرض والطلب.',
        keyPoints: ['Supply: amount available at a given price', 'Demand: amount consumers want at a given price', 'Price mechanism: prices rise when demand exceeds supply', 'GDP: Gross Domestic Product — total value of goods/services produced', 'Inflation: general rise in prices over time'],
        keyPointsAr: ['العرض: الكمية المتاحة بسعر معين', 'الطلب: الكمية التي يريدها المستهلكون بسعر معين', 'آلية الأسعار: ترتفع الأسعار عندما يتجاوز الطلب العرض', 'الناتج المحلي الإجمالي: إجمالي قيمة السلع والخدمات المنتجة', 'التضخم: الارتفاع العام في الأسعار مع مرور الوقت'],
      },
    ],
  },
}
