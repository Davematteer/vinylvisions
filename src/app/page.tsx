import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from "next/image"

interface Cover {
  id: number,
  title: string,
  artist: string,
  type: string,
  image: string,
  price: number
}

const getCovers = async () => {
  try {
    const res = await fetch("http://localhost:5000/covers");
    console.log(res.body)
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const covers = await getCovers();

  return (
    <div>
      <h1>Yo</h1>
      <div className="grid grid-cols-3 gap-8">
        {covers.map((cover: Cover) => (
          <Card key={cover.id}>
            <CardHeader>
              <div>
                <CardTitle>{cover.title}</CardTitle>
                <CardDescription>{cover.type}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Image
                src={cover.image}
                alt="album cover"
                width={300}
                height={300}
              />
            </CardContent>
            <CardFooter>
              <button>Click me</button>
              <p>{cover.price}</p>
            </CardFooter>
          </Card>
        )
        )}
      </div>
    </div>
  )
}
