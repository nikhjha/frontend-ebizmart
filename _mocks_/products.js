import { FacebookRounded } from "@mui/icons-material";
import faker from "faker";
import { sample } from "lodash";
// utils
import { mockImgAvatar, mockImgProduct } from "../component/utility/mockImages";

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  "Nike Air Force 1 NDESTRUKT",
  "Nike Space Hippie 04",
  "Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear",
  "Nike Blazer Low 77 Vintage",
  "Nike ZoomX SuperRep Surge",
  "Zoom Freak 2",
  "Nike Air Max Zephyr",
  "Jordan Delta",
  "Air Jordan XXXV PF",
  "Nike Waffle Racer Crater",
  "Kyrie 7 EP Sisterhood",
  "Nike Air Zoom BB NXT",
  "Nike Air Force 1 07 LX",
  "Nike Air Force 1 Shadow SE",
  "Nike Air Zoom Tempo NEXT%",
  "Nike DBreak-Type",
  "Nike Air Max Up",
  "Nike Air Max 270 React ENG",
  "NikeCourt Royale",
  "Nike Air Zoom Pegasus 37 Premium",
  "Nike Air Zoom SuperRep",
  "NikeCourt Royale",
  "Nike React Art3mis",
  "Nike React Infinity Run Flyknit A.I.R. Chaz Bear",
];
const PRODUCT_COLOR = [
  "#00AB55",
  "#000000",
  "#FFFFFF",
  "#FFC0CB",
  "#FF4842",
  "#1890FF",
  "#94D82D",
  "#FFC107",
];

// ----------------------------------------------------------------------

const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    _id: faker.datatype.uuid(),
    images: [mockImgProduct(setIndex)],
    productName: PRODUCT_NAME[index],
    brand: PRODUCT_NAME[index].split(" ")[0],
    mrp: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    discountPrice:
      setIndex % 3
        ? null
        : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    status: sample(["sale", "new", "", ""]),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh praesent tristique magna sit amet purus gravida quis blandit. Curabitur gravida arcu ac tortor dignissim convallis aenean et. Nec dui nunc mattis enim ut tellus elementum. Tincidunt arcu non sodales neque sodales ut etiam. Massa enim nec dui nunc mattis enim. Sed sed risus pretium quam. Tortor vitae purus faucibus ornare suspendisse sed. Amet mauris commodo quis imperdiet massa. ",
    howToUse:
      "Et leo duis ut diam. Velit aliquet sagittis id consectetur. Porta non pulvinar neque laoreet suspendisse interdum. Vulputate sapien nec sagittis aliquam malesuada bibendum. Diam donec adipiscing tristique risus nec. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique.",
    nutritionalFacts:
      "Magna fringilla urna porttitor rhoncus. Est placerat in egestas erat imperdiet sed euismod nisi. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi. Nulla pellentesque dignissim enim sit amet. Accumsan lacus vel facilisis volutpat. Neque aliquam vestibulum morbi blandit cursus risus at ultrices mi. Enim sit amet venenatis urna cursus eget nunc scelerisque. Eget nulla facilisi etiam dignissim. Erat nam at lectus urna duis convallis. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Massa eget egestas purus viverra accumsan. Quisque sagittis purus sit amet volutpat consequat mauris. ",
    rating: faker.datatype.number({ min: 1, max: 5, precision: 1 }),
    numberOfReviews: faker.datatype.number({ min: 10, max: 25, precision: 1 }),
    numberOfRating: faker.datatype.number({ min: 50, max: 100, precision: 1 }),
    isValidated: Math.random() > 0.5,
    vendor: {
      logo: mockImgAvatar(
        faker.datatype.number({ min: 1, max: 20, precision: 1 })
      ),
      _id: "kkkk",
      firstName: "First",
      lastName: "last",
      companyName: "Company Name",
      isValidated: Math.random() > 0.5,
      city : "pune"
    },
  };
});

export const getProduct = (id) => {
  return {
    id: id,
    images: [mockImgProduct(1)],
    productName: PRODUCT_NAME[0],
    mrp: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    discountPrice: faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    status: sample(["sale", "new", "", ""]),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh praesent tristique magna sit amet purus gravida quis blandit. Curabitur gravida arcu ac tortor dignissim convallis aenean et. Nec dui nunc mattis enim ut tellus elementum. Tincidunt arcu non sodales neque sodales ut etiam. Massa enim nec dui nunc mattis enim. Sed sed risus pretium quam. Tortor vitae purus faucibus ornare suspendisse sed. Amet mauris commodo quis imperdiet massa. ",
    isValidated: false,
    brand: "Gucci",
    howToUse:
      "Et leo duis ut diam. Velit aliquet sagittis id consectetur. Porta non pulvinar neque laoreet suspendisse interdum. Vulputate sapien nec sagittis aliquam malesuada bibendum. Diam donec adipiscing tristique risus nec. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique.",
    nutritionalFacts:
      "Magna fringilla urna porttitor rhoncus. Est placerat in egestas erat imperdiet sed euismod nisi. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi. Nulla pellentesque dignissim enim sit amet. Accumsan lacus vel facilisis volutpat. Neque aliquam vestibulum morbi blandit cursus risus at ultrices mi. Enim sit amet venenatis urna cursus eget nunc scelerisque. Eget nulla facilisi etiam dignissim. Erat nam at lectus urna duis convallis. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Massa eget egestas purus viverra accumsan. Quisque sagittis purus sit amet volutpat consequat mauris. ",
    rating: 4.5,
    numberOfReviews: 40,
    numberOfRating: 10,
  };
};

const getProducts = () => {
  return products;
};

export default getProducts;
