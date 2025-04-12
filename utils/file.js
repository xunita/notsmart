export const imageToBase64 = (file, callback) => {
  if (!file) return;
  // Check if the file type is an image
  if (file.type && file.type.startsWith("image/")) {
    // It's an image, proceed with reading it
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      callback({
        success: true,
        base64: reader.result, // Remove the data URL prefix
      }); // Base64 string
    reader.onerror = (error) => callback({ success: false, error });
    return {
      image: true,
    };
  } else {
    return {
      image: false,
    };
  }
};
