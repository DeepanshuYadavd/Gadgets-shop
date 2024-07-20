const ObjectId = require("mongodb").ObjectId;
const id= new ObjectId();
const reviewData = [
  {
    comment:
      "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    rating: 5,
    user: { _id: id, name: "John Doe" },
  },
  {
    comment:
      "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    rating: 5,
    user: { _id: id, name: "John Doe" },
  },
  {
    comment:
      "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    rating: 5,
    user: { _id: id, name: "John Doe" },
  },
  {
    comment:
      "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    rating: 4,
    user: { _id: id, name: "John Doe" },
  },
  {
    comment:
      "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    rating: 3,
    user: { _id: id, name: "John Doe" },
  },
];

module.exports = reviewData;
