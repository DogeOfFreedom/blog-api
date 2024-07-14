const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const Comment = require("../models/comment");
const Post = require("../models/post");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const posts = [
  {
    author: new mongoose.Types.ObjectId("669354d9f3bc9c6f8f0f7c96"),
    title: "Subject X: An overrated nightmare of design",
    text: "Subject X may look appealing, but it’s a convoluted mess. The flashy exterior hides impracticality and frustration. Overhyped and underdelivering, it’s a cautionary tale in design gone wrong.",
    isPublished: false,
  },
  {
    _id: new mongoose.Types.ObjectId("669373979d04553e03409333"),
    author: new mongoose.Types.ObjectId("669354d9f3bc9c6f8f0f7c96"),
    title: "New Beginnings",
    text: `New beginnings are moments of profound transformation, filled with promise and potential. They mark the end of one chapter and the start of another, offering a chance to reset, rethink, and renew. Whether prompted by choice or circumstance, new beginnings carry a blend of excitement and apprehension, challenging us to step out of our comfort zones and embrace the unknown.
One of the most inspiring aspects of new beginnings is the opportunity for growth and self-discovery. These moments invite us to reevaluate our goals, passions, and values. They allow us to shed old habits, limiting beliefs, and unfulfilling routines, creating space for new experiences and perspectives. The journey of starting anew often reveals strengths and capacities we didn't know we had, fostering resilience and adaptability.
Take, for instance, the decision to pursue a new career. This kind of new beginning can be both daunting and exhilarating. It requires leaving behind familiar roles and responsibilities, often venturing into uncharted territory. Yet, it also opens doors to learning, professional development, and personal fulfillment. The initial uncertainty gradually gives way to a sense of achievement and purpose as we adapt to new challenges and build new skills.
New beginnings also play a crucial role in relationships. Moving to a new city, starting a new job, or entering a new phase of life can bring about significant changes in our social circles. These transitions offer a chance to meet new people, form fresh connections, and deepen existing bonds. While saying goodbye to old friends and familiar faces can be difficult, the potential for new friendships and enriching relationships is an exciting prospect.
In personal development, new beginnings are often associated with significant milestones such as starting college, embarking on a new fitness journey, or adopting a healthier lifestyle. Each of these steps represents a commitment to bettering oneself, an investment in one's future happiness and well-being. The path may be challenging, requiring discipline and perseverance, but the rewards of improved health, knowledge, and self-esteem are well worth the effort.
Moreover, new beginnings are not confined to monumental life changes. They can be found in everyday moments and decisions. Each day offers a fresh start, a chance to set new intentions and make small, positive changes. Whether it's learning a new skill, picking up a new hobby, or simply choosing to see the world with a more optimistic outlook, these small new beginnings can accumulate over time, leading to significant personal growth.
In conclusion, new beginnings are powerful catalysts for change and self-improvement. They challenge us to embrace the unfamiliar and embark on journeys of discovery and growth. While the path may be uncertain and fraught with challenges, the potential for transformation and fulfillment makes new beginnings a crucial and exciting part of the human experience.`,
    isPublished: true,
  },
  {
    _id: new mongoose.Types.ObjectId("669373979d04553e03409334"),
    author: new mongoose.Types.ObjectId("669354d9f3bc9c6f8f0f7c96"),
    title: "My Bank Account is Empty, Help, Almost Homeless",
    text: `
I’m in a dire situation and desperately need advice. My bank account is completely empty, and I’m on the brink of becoming homeless. I’ve never been in such a tough spot before, and I’m not sure where to turn. I’ve tried to find a job, but it seems like every application I send out gets ignored or rejected. The bills keep piling up, and I’ve already sold most of my belongings just to get by. My rent is overdue, and I’ve received an eviction notice. The thought of losing my home terrifies me.
I don’t have any family nearby who can help, and my friends are in no position to lend me money. I’ve contacted a few local shelters, but they’re full, and I’m on a waiting list. I’m feeling completely overwhelmed and don’t know what my next step should be. I’ve been looking into community resources and assistance programs, but I’m not sure which ones can offer immediate help. I’m also worried about the long-term impact this will have on my life. How do I rebuild from here? How do I find stability when everything feels so uncertain?
Any advice or guidance would be greatly appreciated. I’m willing to do whatever it takes to get back on my feet. If you’ve been through something similar or know someone who has, please share what helped you or them. Are there any specific organizations or programs I should reach out to? Any tips on how to quickly secure a job or temporary housing? I feel like I’m running out of time, and I’m scared of what the future holds. Please, if you have any advice, I’m all ears. I just need a lifeline to help me navigate through this incredibly tough time.`,
    isPublished: true,
  },
  {
    _id: new mongoose.Types.ObjectId("669373979d04553e03409332"),
    author: new mongoose.Types.ObjectId("669354d9f3bc9c6f8f0f7c96"),
    title: "My Cat",
    text: `My cat, Luna, is my constant companion and a source of endless joy and comfort in my life. I adopted her from a local shelter two years ago, and from the moment she entered my home, she transformed it into a place of warmth and laughter. Luna is a small, sleek black cat with bright green eyes that seem to sparkle with mischief and intelligence. Her presence has been a profound blessing, bringing an immeasurable amount of happiness to my daily routine.
One of the most endearing aspects of Luna's personality is her playful nature. She has a collection of toys, but her favorite is a simple, worn-out feather on a string. Watching her chase it around the room, leaping and pouncing with graceful agility, never fails to bring a smile to my face. Her playful antics are a delightful distraction from the stresses of everyday life. Whether she's darting through the house in a sudden burst of energy or batting at imaginary foes, Luna's playfulness is infectious and always brightens my day.
Luna also has a nurturing side that has been particularly comforting during difficult times. She seems to sense when I am feeling down and will curl up beside me, purring softly, offering her silent support. Her purring is incredibly soothing, like a gentle reminder that everything will be okay. There have been nights when I couldn't sleep, and Luna's presence provided the comfort and reassurance I needed to find peace. She has an uncanny ability to make me feel less alone, no matter what I'm going through.
Luna's independent streak is another trait I admire. She enjoys her alone time and will often retreat to her favorite spot by the window, where she can watch the world go by. It's fascinating to observe her as she watches birds and squirrels with keen interest, her tail flicking in anticipation. Despite her independence, Luna is always there to greet me at the door when I come home, her little face lighting up with recognition and affection. It's a daily ritual that I look forward to, no matter how my day has been.
Caring for Luna has taught me a great deal about responsibility and unconditional love. Ensuring she has a healthy diet, regular veterinary check-ups, and plenty of stimulation has made me more organized and attentive. In return, Luna has given me the gift of her trust and affection, a bond that grows stronger with each passing day. Her gentle nuzzles and the way she curls up in my lap are constant reminders of the deep connection we share.
Luna's quirky habits never cease to amuse me. She has a particular fondness for boxes and will immediately claim any new one that enters the house, no matter how small. Her fascination with running water is another source of entertainment; she'll jump onto the bathroom counter and paw at the faucet until I turn it on for her to drink from. These little quirks are part of what makes Luna so special and unique.
In summary, Luna is more than just a pet; she is a beloved member of my family. Her playful spirit, comforting presence, and independent nature have enriched my life in countless ways. She has been a steadfast companion through good times and bad, always ready with a purr or a playful swipe. I cannot imagine my life without her, and I am grateful every day for the joy and love she brings into my home.`,
    isPublished: true,
  },
  {
    author: new mongoose.Types.ObjectId("669354d9f3bc9c6f8f0f7c96"),
    title: "[NUMBER 1] [NEVER SEEN BEFORE] [HENSHIN]",
    text: "Get ready for the ultimate transformation! Witness the [NUMBER 1] [NEVER SEEN BEFORE] [HENSHIN] that will blow your mind. This is a spectacle you won’t want to miss – stay tuned!",
    isPublished: false,
  },
];

const users = [
  {
    _id: new mongoose.Types.ObjectId("669373979d04553e0340932f"),
    firstname: "Tommy",
    lastname: "Harding",
    email: "tomh@gmail.com",
    username: "midnightwing",
    password: "321321",
    profilePictureURL:
      "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1720954157/qhe205kuhmg3ehauchxk.jpg",
  },
  {
    _id: new mongoose.Types.ObjectId("669373979d04553e03409322"),
    firstname: "viewer",
    lastname: "viewer",
    email: "viewer@gmail.com",
    username: "viewer",
    password: "321321",
    profilePictureURL:
      "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1720954158/q3xwjcbwp7dio69oajzl.jpg",
  },
  {
    _id: "669354d9f3bc9c6f8f0f7c96",
    firstname: "author",
    lastname: "author",
    email: "viewer@gmail.com",
    username: "author",
    password: "321321",
    profilePictureURL:
      "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1720954136/wyb6vpbz8cgavl3uxkfd.png",
    isAuthor: true,
  },
];

const comments = [
  {
    author: new mongoose.Types.ObjectId("669373979d04553e0340932f"),
    originPost: new mongoose.Types.ObjectId("669373979d04553e03409333"),
    content: "Completely agree! This is spot on.",
  },
  {
    author: new mongoose.Types.ObjectId("669373979d04553e0340932f"),
    originPost: new mongoose.Types.ObjectId("669373979d04553e03409333"),
    content: "Strongly disagree, this misses the mark entirely.",
  },
  {
    author: new mongoose.Types.ObjectId("669373979d04553e03409322"),
    originPost: new mongoose.Types.ObjectId("669373979d04553e03409333"),
    content: "Couldn’t agree more, well said!",
  },
  {
    author: new mongoose.Types.ObjectId("669373979d04553e0340932f"),
    originPost: new mongoose.Types.ObjectId("669373979d04553e03409334"),
    content: "I disagree, but I see your point.",
  },
  {
    author: new mongoose.Types.ObjectId("669373979d04553e03409322"),
    originPost: new mongoose.Types.ObjectId("669373979d04553e03409334"),
    content: "Absolutely, I agree 100%.",
  },
  {
    author: new mongoose.Types.ObjectId("669373979d04553e0340932f"),
    originPost: new mongoose.Types.ObjectId("669373979d04553e03409334"),
    content: "I can't agree with this perspective.",
  },
  {
    author: new mongoose.Types.ObjectId("669373979d04553e0340932f"),
    originPost: new mongoose.Types.ObjectId("669373979d04553e03409332"),
    content: "This is exactly right, I agree.",
  },
  {
    author: new mongoose.Types.ObjectId("669373979d04553e0340932f"),
    originPost: new mongoose.Types.ObjectId("669373979d04553e03409332"),
    content: "I completely disagree with this.",
  },
  {
    author: new mongoose.Types.ObjectId("669373979d04553e03409322"),
    originPost: new mongoose.Types.ObjectId("669373979d04553e03409332"),
    content: `
I recently came across a post discussing the importance of maintaining a work-life balance, and I have mixed feelings about it. On one hand, I absolutely agree that work-life balance is crucial for overall well-being. The post highlighted the negative impacts of overworking, such as burnout, stress, and decreased productivity. I couldn’t agree more with this point. In today’s fast-paced world, it’s easy to get caught up in the hustle and neglect personal time, which is essential for mental and physical health.
However, there are some aspects of the post that I disagree with. For instance, the post suggested that strict boundaries between work and personal life are the only way to achieve balance. While this might work for some, I believe flexibility is key. Everyone’s situation is different, and what works for one person might not work for another. Some people thrive in environments where work and personal life blend seamlessly, allowing them to shift between the two as needed. For others, clear-cut boundaries might be the best approach.
Moreover, the post downplayed the role of passion in work. If someone loves what they do, they might not mind spending extra hours on their job. This doesn’t necessarily mean they lack balance; it could simply mean they derive fulfillment from their work. Dismissing this aspect seems overly rigid to me.
In conclusion, while I agree with the core message of the post about the importance of work-life balance, I believe the approach to achieving it should be more nuanced. Flexibility and personal preferences should be considered, rather than adhering to a one-size-fits-all solution. Balancing work and life is a personal journey, and different strategies work for different people.`,
  },
];

const resetUserCollection = expressAsyncHandler(async () => {
  await User.collection.drop();
  await users.forEach((user) => {
    bcrypt.hash(user.password, 10, async (err, hashedPassword) => {
      const newUser = {
        ...user,
        password: hashedPassword,
      };
      await User.create(newUser);
    });
  });
});

const resetPostCollection = expressAsyncHandler(async () => {
  await Post.collection.drop();
  await posts.forEach((post) => Post.create(post));
});

const resetCommentCollection = expressAsyncHandler(async () => {
  await Comment.collection.drop();
  await comments.forEach((comment) => {
    Comment.create(comment);
  });
});

const resetAll = expressAsyncHandler(async (req, res) => {
  await resetUserCollection();
  await resetCommentCollection();
  await resetPostCollection();
  return res.send("done");
});

router.get("/reset", resetAll);

module.exports = router;
