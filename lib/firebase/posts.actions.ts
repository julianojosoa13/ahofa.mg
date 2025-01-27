import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

// Define types for the post data and image array
export interface PostData {
  userId: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
}

const createPost = async (
  post: PostData,
  images: string[]
): Promise<string> => {
  const { userId, title, description, price, location, category } = post;
  const postId = firestore().collection("posts").doc().id; // Generate a unique post ID
  const createdAt = firestore.FieldValue.serverTimestamp();
  const isActive = true;
  const isVerified = false;

  try {
    // Step 1: Upload images to Firebase Storage and get their URLs
    const imageUrls: string[] = await Promise.all(
      images.map(async (image, index) => {
        const imageRef = storage().ref(`posts/${postId}/image_${index}`);
        await imageRef.putFile(image); // Upload file
        return await imageRef.getDownloadURL(); // Get download URL
      })
    );

    // Step 2: Add the post document to Firestore
    await firestore().collection("posts").doc(postId).set({
      userId,
      title,
      description,
      price,
      location,
      category,
      images: imageUrls,
      createdAt,
      updatedAt: createdAt,
      isActive,
      isVerified,
    });

    console.log("Post created successfully with ID:", postId);
    return postId;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
