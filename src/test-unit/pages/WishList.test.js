import { render, screen } from "@testing-library/react";
//import WishList from "../../pages/WishList";
import { act } from "react-dom/test-utils";
//import axios from "axios";

/*
afterEach(() => {
    axios.get.mockClear();
});
*/
test("test wishlist with books", async () => {

    /*
  const userWishListResponse = [
    {
      id: 10,
      user_id: 30,
      book_id: 12,
      title: "The Lord Of The Rings: The Fellowship Of The Ring",
      number_of_page: 423,
      genre: 2,
      publisher: 2,
      author: 10,
      price: 19.99,
      image: "lotr1.PNG",
      newness: 0,
      release_date: 2012,
      img_directory: "fantasy",
      image_big: "lotr1_big.PNG",
      book_description:
        'In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell into the hands of Bilbo Baggins, as told in "The Hobbit." In a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as his elderly cousin Bilbo entrusts the Ring to his care. Frodo must leave his home and make a perilous journey across Middle-earth to the Cracks of Doom, to destroy the Ring and foil the Dark Lord in his evil purpose.',
      author_name: "J.R.R. Tolkien",
      author_description: null,
    },
  ];

  axios.get = jest.fn(
    () => Promise.resolve({data: userWishListResponse})
  )

  await act(async () => render(<WishList/>));
  const linkElement = screen.getByText("The Lord Of The Rings: The Fellowship Of The Ring");
  expect(linkElement).toBeInTheDocument();
    */
});
