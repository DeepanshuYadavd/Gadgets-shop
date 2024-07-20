const imageValidation = (images) => {
  //  console.log(images)
  let imageTable = [];
  if (Array.isArray(images)) {
    imageTable = images;
  } else {
    imageTable.push(images);
  }
  // file count validation:
  if (imageTable.length > 3) {
    return {
      error: "upload only 3 images at once",
    };
  }

  for (let image of imageTable) {
    // file size validation:
    if (image.size > 1048576) {
      return {
        error: "size is too large(should be less than 1 mb)",
      };
    }
    // file format validation:
    const filetypes = /jpeg|jpg|png/; //regular expression
    const mimetype = filetypes.test(image.mimetype);
    if(!mimetype){
      return {
        error:"incorrect format (should be in jpg,jpeg,png)"
      }
    }
  }
  return {error:false}
};
module.exports = imageValidation;
