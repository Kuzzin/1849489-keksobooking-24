const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const houseChooser = document.querySelector('.ad-form__upload input[type=file]');
const housePreview = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

//Я не понимаю логику с добавлением фото жилья, в html для превью нет img, я типа должен его сам создать?
//Прошу помочь и объяснить, как его сделать... Пока нет ни отображения - ничего.
houseChooser.addEventListener('change', () => {
  const file = houseChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    housePreview.src = URL.createObjectURL(file);
  }
});

//Скорее вссего верхние 2 обработчика можно объединить в одну функцию, шаблон ниже подготовил...

// const uploadPhotos = (chooser, preview) => {
//   chooser.addEventListener('change', () => {
//     const file = chooser.files[0];
//     const fileName = file.name.toLowerCase();
//     const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
//     if (matches) {
//       preview.src = URL.createObjectURL(file);
//     }
//   });
// };

