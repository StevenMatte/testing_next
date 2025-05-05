// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const movies = [
  {
    title: "Shawshanks Redemption",
    year: 2010,
    image: "https://m.media-amazon.com/images/I/51zUbui+gbL._AC_.jpg",
    description: "A man imprisoned for a crime he didn't commit forms a lasting bond with a fellow inmate.",
  },
  {
    title: "Interstellar",
    year: 2014,
    image: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
    description: "A group of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    title: "The Matrix",
    year: 1999,
    image: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
    description: "A hacker discovers the world is a simulation and joins a rebellion to overthrow its controllers.",
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    image: "https://m.media-amazon.com/images/I/51Qvs9i5a%2BL._AC_.jpg",
    description: "A young hobbit sets out on a journey to destroy a powerful ring and save Middle-earth.",
  },
  {
    title: "F.R.I.E.N.D.S",
    year: 2015,
    image: "https://m.media-amazon.com/images/I/91-aGBy562L._AC_UY327_FMwebp_QL65_.jpg",
    description: "Follows the personal and professional lives of six twenty to thirty-something friends living in Manhattan.",
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    image: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
    description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in tales of violence and redemption.",
  },
];

async function main() {
  await prisma.movies.createMany({ data: movies });
  console.log("✅ Seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
