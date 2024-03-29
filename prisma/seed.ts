import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });

    await prisma.ticketType.createMany({
      data: [
        {
          name: "presencialComHotel",
          price: 60000,
          includesHotel: true,
          isRemote: false
        },
        {
          name: "presencialSemHotel",
          price: 25000,
          includesHotel: false,
          isRemote: false
        },
        {
          name: "online",
          price: 10000,
          includesHotel: false,
          isRemote: true
        }
      ]
    })

    await prisma.hotel.createMany({
      data: [
        {
          name: "Ocean Palace Resort",
          image: "https://viajandocomamalarosa.com.br/wp-content/uploads/2020/05/Ocean-Palace.jpg"
        },
        {
          name: "Atlantis Hotel",
          image: "https://media-cdn.tripadvisor.com/media/photo-s/23/b2/2e/64/atlantis-the-palm.jpg"
        },
        {
          name: "Bellagio Hotel",
          image: "https://media-cdn.tripadvisor.com/media/photo-s/1c/8a/e0/b9/bellagio-las-vegas.jpg"
        }
      ]
    })

    const hotels = await prisma.hotel.findMany({})

    hotels.map(async (hotel) => {
      for(let i=1; i<13; i++){
        await prisma.room.create({
          data:{
            name: (i).toString(),
            capacity: Math.ceil(Math.random()*3),
            hotelId: hotel.id
          }
        })
      }
    })

    await prisma.day.createMany({
      data: [
        {
          day: "Sexta",
          date: "22/10"
        },
        {
          day: "Sábado",
          date: "23/10"
        },
        {
          day: "Domingo",
          date: "24/10"
        }
      ]
    })

    await prisma.activity.createMany({
      data: [
        {
          name: "Minecraft: Montando o PC ideal",
          dayId: 1,
          place: "Auditório Principal",
          start: 9,
          end: 10,
          vacancies: 30
        },
        {
          name: "Lol: Montando o PC ideal",
          dayId: 1,
          place: "Auditório Principal",
          start: 10,
          end: 11,
          vacancies: 30
        },
        {
          name: "CS GO: Montando o PC ideal",
          dayId: 1,
          place: "Auditório Principal",
          start: 13,
          end: 14,
          vacancies: 30
        },
        {
          name: "Aula de Ninjutsu",
          dayId: 1,
          place: "Auditório Lateral",
          start: 9,
          end: 10,
          vacancies: 22
        },
        {
          name: "Aula de Genjutsu",
          dayId: 1,
          place: "Auditório Lateral",
          start: 10,
          end: 11,
          vacancies: 22
        },
        {
          name: "Telecurso 2000",
          dayId: 1,
          place: "Sala de Workshop",
          start: 9,
          end: 10,
          vacancies: 18
        },
        {
          name: "Minecraft: Montando o PC ideal",
          dayId: 2,
          place: "Auditório Principal",
          start: 9,
          end: 10,
          vacancies: 30
        },
        {
          name: "Lol: Montando o PC ideal",
          dayId: 2,
          place: "Auditório Principal",
          start: 10,
          end: 11,
          vacancies: 30
        },
        {
          name: "Aula de Ninjutsu",
          dayId: 2,
          place: "Auditório Lateral",
          start: 9,
          end: 10,
          vacancies: 22
        },
        {
          name: "Telecurso 2000",
          dayId: 2,
          place: "Sala de Workshop",
          start: 9,
          end: 10,
          vacancies: 18
        },
        {
          name: "Minecraft: Montando o PC ideal",
          dayId: 3,
          place: "Auditório Principal",
          start: 9,
          end: 10,
          vacancies: 30
        },
      ]
    })
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
