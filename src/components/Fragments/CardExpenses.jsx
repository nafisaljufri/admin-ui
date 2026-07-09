import React from "react";
import Card from "../Elements/Card";
import Icon from "../Elements/Icon";

const categoryIconMap = {
  housing: <Icon.House />,
  food: <Icon.Food />,
  transportation: <Icon.Transport />,
  entertainment: <Icon.Gamepad />,
  shopping: <Icon.Shopping />,
  others: <Icon.Other />,
};

const detailMap = {
  housing: ["House Rent", "Parking"],
  food: ["Grocery", "Restaurant Bill"],
  transportation: ["Taxi Fare", "Metro Card Bill"],
  entertainment: ["Movie Ticket", "iTunes"],
  shopping: ["Shirt", "Jeans"],
  others: ["Donation", "Gift"],
};

function CardExpenses({ data }) {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {data.map((item) => (
        <Card
          key={item.category}
          desc={
            <>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <div className="bg-special-bg p-3 rounded-lg text-gray-02">
                    {categoryIconMap[item.category]}
                  </div>

                  <div>
                    <div className="capitalize text-gray-02">
                      {item.category}
                    </div>

                    <div className="font-bold text-xl">${item.amount}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <span className="text-gray-02">{item.percentage}%</span>

                    {item.percentage >= 15 ? (
                      <Icon.ArrowUp className="text-red-500" />
                    ) : (
                      <Icon.ArrowDown className="text-green-500" />
                    )}
                  </div>
                </div>
              </div>

              <hr className="my-3 border-gray-200" />

              {detailMap[item.category].map((detail) => (
                <div key={detail} className="flex justify-between py-2">
                  <span>{detail}</span>

                  <span className="text-gray-03">17 May 2023</span>
                </div>
              ))}
            </>
          }
        />
      ))}
    </div>
  );
}

export default CardExpenses;
