const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadPhotos = (chooser, preview) => {
  chooser.addEventListener('change', () => {
    const file = chooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
};

export { uploadPhotos };
