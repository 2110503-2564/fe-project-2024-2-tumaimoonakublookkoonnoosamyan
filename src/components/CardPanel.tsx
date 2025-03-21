'use client'
import Card from "./Card";
import { useReducer } from "react";
import Link from "next/link";

export default function CardPanel() {

  const cardReducer = (
    massageList: Map<string, number>,
    action: { type: string; massageName: string; rating?: number }
  ) => {
    const newMassageList = new Map(massageList);
    switch (action.type) {
      case "add":
        newMassageList.set(action.massageName, action.rating ?? 0);
        return newMassageList;
      case "remove":
        newMassageList.delete(action.massageName);
        return newMassageList;
      default:
        return massageList;
    }
  };

  const [massageList, dispatch] = useReducer(cardReducer, new Map<string, number>([
    ["The Bloom Pavilion", 0],
    ["Spark Space", 0],
    ["The Grand Table", 0]
  ]));

  const mockVenueRepo = [
    {vid:'001', massageName: "The Bloom Pavilion", imgSrc: "/img/bloom.jpg" },
    {vid:'002', massageName: "Spark Space", imgSrc: "/img/sparkspace.jpg" },
    {vid:'003', massageName: "The Grand Table", imgSrc: "/img/thammasat.jpg" }
  ];

  return (
    <div>
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "space-around",
          gap: "20px"
        }}
      >
        {mockVenueRepo.map((venueItem) => (
          <Link href={`/venue/${venueItem.vid}`} className="w-1/5">
            <Card
              key={venueItem.massageName}
              massageName={venueItem.massageName}
              imgSrc={venueItem.imgSrc}
              onChange={(venue: string, Rating: number) =>
                dispatch({ type: "add", massageName: venue, rating: Rating })
              }
            />
          </Link>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        {Array.from(massageList).map(([massageName, rating]) => (
          <div
            data-testid={massageName}
            key={massageName}
            onClick={() => {dispatch({ type: 'remove', massageName: massageName })}}>
            {massageName} Rating: {rating}
          </div>
        ))}
      </div>
    </div>
  );
}