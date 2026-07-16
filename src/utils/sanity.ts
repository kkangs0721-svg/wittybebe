import { createClient } from "@sanity/client";
import { mockProducts, Product } from "@/data/mockData";

let projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dummy-project-id";

// Ensure projectId only contains alphanumeric characters and dashes to prevent client initialization crashes
if (!/^[a-z0-9-]+$/i.test(projectId) || projectId === "your_sanity_project_id") {
  projectId = "dummy-project-id";
}

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-16";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // true for fast edge-cache reads in production
});

// Fetch products from Sanity CMS with fallback
export async function fetchSanityProducts(): Promise<Product[]> {
  // If the project ID is placeholder, load mock database immediately
  if (projectId === "your_sanity_project_id" || projectId === "placeholder-id") {
    return mockProducts;
  }

  try {
    const query = `*[_type == "product"] {
      "id": _id,
      name,
      englishName,
      price,
      originalPrice,
      "image": image.asset->url,
      "hoverImage": hoverImage.asset->url,
      category,
      isNew,
      isBest,
      description,
      sizes,
      "detailImages": detailImages[].asset->url,
      reviews[] {
        id,
        author,
        rating,
        date,
        content,
        sizePurchased
      },
      qna[] {
        id,
        author,
        date,
        question,
        answer,
        isPrivate
      }
    }`;
    
    const products = await sanityClient.fetch<Product[]>(query);
    
    if (!products || products.length === 0) {
      console.warn("Sanity query returned empty. Falling back to local mock data.");
      return mockProducts;
    }
    
    return products;
  } catch (error) {
    console.error("Failed to fetch products from Sanity, falling back to local mock data:", error);
    return mockProducts;
  }
}
