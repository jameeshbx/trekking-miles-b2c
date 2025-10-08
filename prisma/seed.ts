import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("Admin@123456", 12);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@trekkingmiles.com" },
    update: {},
    create: {
      email: "admin@trekkingmiles.com",
      name: "Admin User",
      password: adminPassword,
      role: Role.ADMIN,
      emailVerified: new Date(),
    },
  });

  console.log("Created admin user:", admin.email);

  // Create service provider user
  const spPassword = await bcrypt.hash("ServiceProvider@123", 12);
  
  const serviceProvider = await prisma.user.upsert({
    where: { email: "provider@trekkingmiles.com" },
    update: {},
    create: {
      email: "provider@trekkingmiles.com",
      name: "Service Provider",
      password: spPassword,
      role: Role.SERVICEPROVIDER,
      emailVerified: new Date(),
    },
  });

  console.log("Created service provider:", serviceProvider.email);

  // Create regular user
  const userPassword = await bcrypt.hash("User@123456", 12);
  
  const user = await prisma.user.upsert({
    where: { email: "user@trekkingmiles.com" },
    update: {},
    create: {
      email: "user@trekkingmiles.com",
      name: "Regular User",
      password: userPassword,
      role: Role.USER,
      emailVerified: new Date(),
    },
  });

  console.log("Created regular user:", user.email);

  // Create sample destinations
  const destinations = [
    {
      name: "Thailand",
      image: "/thailand.png",
      description: "Discover Thailand's perfect blend of ancient traditions and modern attractions. From the bustling streets of Bangkok to the tranquil beaches of Phuket and the lush mountains of Chiang Mai, Thailand offers diverse experiences for every traveler.",
      highlights: ["Bangkok Temples", "Phuket Beaches", "Chiang Mai Mountains"],
      rating: 4.9,
      price: "From ₹14,500 per person",
    },
    {
      name: "Goa",
      image: "/goa.png",
      description: "Experience the perfect beach getaway in Goa, where golden sands meet the Arabian Sea. Known for its Portuguese heritage, vibrant nightlife, and water sports, Goa offers a unique blend of relaxation and adventure.",
      highlights: ["Beach Paradise", "Colonial Heritage", "Water Sports"],
      rating: 4.8,
      price: "From ₹4,999 per person",
    },
    {
      name: "Kerala",
      image: "/kerala.png",
      description: "Welcome to 'God's Own Country', where emerald backwaters, spice-scented hills, and palm-fringed beaches create a serene paradise. Cruise on traditional houseboats through tranquil backwaters.",
      highlights: ["Backwater Cruises", "Spice Gardens", "Hill Stations"],
      rating: 4.9,
      price: "From ₹7,999 per person",
    },
    {
      name: "Vietnam",
      image: "/vietnam.png",
      description: "Journey through Vietnam's breathtaking landscapes, from the limestone karsts of Halong Bay to the terraced rice fields of Sapa. Experience the vibrant street food scene and rich history.",
      highlights: ["Halong Bay", "Ho Chi Minh City", "Sapa Mountains"],
      rating: 4.7,
      price: "From ₹4,599 per person",
    },
    {
      name: "Bali",
      image: "/bali.png",
      description: "Discover the Island of the Gods, where spiritual traditions meet natural beauty. From the cultural heart of Ubud to stunning beaches and volcanic landscapes.",
      highlights: ["Ubud Culture", "Beach Clubs", "Volcano Treks"],
      rating: 4.8,
      price: "From ₹10,999 per person",
    },
    {
      name: "Nepal",
      image: "/nepal.png",
      description: "Experience the majesty of the Himalayas in Nepal, home to eight of the world's highest peaks. Trek to Everest Base Camp and explore ancient Buddhist monasteries.",
      highlights: ["Everest Base Camp", "Annapurna Circuit", "Kathmandu Valley"],
      rating: 4.9,
      price: "From ₹12,999 per person",
    },
  ];

  for (const dest of destinations) {
    await prisma.destination.create({
      data: dest,
    });
  }
  console.log("Created sample destinations");

  // Create sample events
  const events = [
    {
      name: "Day out program in Kumbalangi",
      image: "/images/kumba.png",
      date: "October 4, 2025",
      duration: "1 Day",
      location: "Kumbalangi, Kochi, Kerala",
      meetingPoint: "Kochi to Kochi",
      price: "From ₹2,500 per person",
      description: "Experience the serene backwaters and authentic village life of India's first model fishing village.",
    },
    {
      name: "Goa Girls Only",
      image: "/images/goa.png",
      date: "October 17, 2025",
      duration: "2 Night 3 Days",
      location: "North Goa, South Goa",
      meetingPoint: "Madgaon to Madgaon",
      price: "From ₹5,999 per person",
      description: "An exclusive girls-only beach getaway with water sports and sunset parties in South Goa.",
    },
    {
      name: "Kolukkumalai",
      image: "/images/koluku.png",
      date: "October 11, 2025",
      duration: "1 Night 2 Days",
      meetingPoint: "kochi to kochi",
      price: "From ₹3,600 per person",
      location: "Munnar, Kerala",
      description: "Girls only camping at Suryanelli,Munnar with Kolukkumalai sunrise trek.",
    },
  ];

  for (const event of events) {
    await prisma.event.create({
      data: event,
    });
  }
  console.log("Created sample events");

  // Create sample treks
  const treks = [
    {
      name: "Gaumukh Tapovan Trek",
      image: "/images/i1.png",
      date: "October 15, 2025",
      duration: "7 Nights 8 Days",
      distance: "40 km",
      price: "₹16,200",
      meetingPoint: "Dehradun to Dehradun",
      description: "Trek to the Gaumukh Glacier and Tapovan meadow, the source of the River Ganges.",
    },
    {
      name: "Annapurna Base Camp Trek",
      image: "/images/i2.png",
      date: "October 10, 2025",
      duration: "8 Nights 9 Days ",
      distance: "70 km",
      price: "₹30,000",
      meetingPoint: "Pokhara to Pokhara",
      description: "Breathtaking mountain views, cultural immersion, and the rewarding experience."
    },
    {
      name: "Bali Pass Trek",
      image: "/images/i3.png",
      date: "October 18, 2025",
      duration: "7 Nights 8 Days",
      distance: "56 km",
      price: "₹21,500",
      meetingPoint: "Dehradun to Dehradun",
      description: "Chasing high altitudes and epic views in the Himalayas.",
    },
  ];

  for (const trek of treks) {
    await prisma.trek.create({
      data: trek,
    });
  }
  console.log("Created sample treks");

  console.log("\nSeeding completed!");
  console.log("\nTest Credentials:");
  console.log("==================");
  console.log("Admin:");
  console.log("  Email: admin@trekkingmiles.com");
  console.log("  Password: Admin@123456");
  console.log("\nService Provider:");
  console.log("  Email: provider@trekkingmiles.com");
  console.log("  Password: ServiceProvider@123");
  console.log("\nUser:");
  console.log("  Email: user@trekkingmiles.com");
  console.log("  Password: User@123456");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
