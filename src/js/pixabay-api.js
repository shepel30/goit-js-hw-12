import axios from "axios";

export async function fetchImages(query,page) {


    const BASE_URL = "https://pixabay.com/api/";

const response = await axios.get(BASE_URL,{
  params: {

    key: "43104791-fccc42375971f64c47e678deb",
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    page,
    per_page: 15,
  }
})

    return response.data
}