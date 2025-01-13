import { request } from '../../api/request';
import { openModal } from '../../components/modalesResuesta/modalesRespuesta';
import './profile.css';

export const createProfilePage = async () => {
  const pageContainer = document.querySelector('.page-container');
  pageContainer.innerHTML = '';

  const profileContainer = document.createElement('div');
  profileContainer.classList.add('profile-container');

  const userId = localStorage.getItem('userId');
  const userData = await request(`/auth/${userId}`, 'GET');

  // Contenedor principal Bento
  const bentoGrid = document.createElement('div');
  bentoGrid.classList.add('bento-grid');

  // Sección de imagen de perfil
  const imageChangeContainer = document.createElement('div');
  imageChangeContainer.style.gridColumn = 'span 2';
  imageChangeContainer.style.gridRow = 'span 1';
  imageChangeContainer.classList.add('bento-item', 'avatar-container');
  const avatarImage = document.createElement('img');
  avatarImage.src = userData.img || 'usuario-avatar.webp';

  const avatarInput = document.createElement('input');
  avatarInput.id = 'img';
  avatarInput.name = 'img';
  avatarInput.type = 'file';
  avatarInput.accept = 'image/*';
  avatarInput.style.display = 'none';

  const avatarLabel = document.createElement('label');
  avatarLabel.setAttribute('for', 'img');
  avatarLabel.textContent = 'Cambiar imagen';
  avatarLabel.classList.add('file-upload-label');

  imageChangeContainer.append(avatarImage, avatarInput, avatarLabel);

  // Sección de Nombre
  const nameContainer = document.createElement('div');
  nameContainer.classList.add('bento-item');
  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Nombre:';
  const nameInput = document.createElement('input');
  nameInput.classList.add('profile-input');
  nameInput.type = 'text';
  nameInput.name = 'userName';
  nameInput.value = userData.userName || '';
  nameContainer.append(nameLabel, nameInput);

  // Sección de Teléfono
  const phoneContainer = document.createElement('div');
  phoneContainer.classList.add('bento-item');
  const phoneLabel = document.createElement('label');
  phoneLabel.textContent = 'Teléfono:';
  const phoneInput = document.createElement('input');
  phoneInput.classList.add('profile-input');
  phoneInput.type = 'tel';
  phoneInput.name = 'phone';
  phoneInput.value = userData.phone || '';
  phoneContainer.append(phoneLabel, phoneInput);

  const newPasswordContainer = document.createElement('div');
newPasswordContainer.classList.add('bento-item');
const newPasswordLabel = document.createElement('label');
newPasswordLabel.textContent = 'Nueva contraseña:';
const newPasswordInput = document.createElement('input');
newPasswordInput.classList.add('profile-input');
newPasswordInput.type = 'password';
newPasswordInput.name = 'newPassword';
newPasswordInput.value = ''; // Campo vacío para nueva contraseña
newPasswordContainer.append(newPasswordLabel, newPasswordInput);

// Sección de Confirmar Contraseña
const confirmPasswordContainer = document.createElement('div');
confirmPasswordContainer.classList.add('bento-item');
const confirmPasswordLabel = document.createElement('label');
confirmPasswordLabel.textContent = 'Confirmar contraseña:';
const confirmPasswordInput = document.createElement('input');
confirmPasswordInput.classList.add('profile-input');
confirmPasswordInput.type = 'password';
confirmPasswordInput.name = 'confirmPassword';
confirmPasswordInput.value = ''; // Campo vacío para confirmación
confirmPasswordContainer.append(confirmPasswordLabel, confirmPasswordInput);

  // Botón para editar perfil
  const editButtonContainer = document.createElement('div');
  editButtonContainer.style.gridColumn = 'span 2';
  editButtonContainer.style.gridRow = 'span 1';
  const editButton = document.createElement('button');
  editButton.textContent = 'Editar perfil';
  editButton.classList.add('edit-profile-button');
  editButtonContainer.appendChild(editButton);

  // Añadir todos los elementos al grid Bento
  bentoGrid.append(imageChangeContainer, nameContainer, phoneContainer, newPasswordContainer, confirmPasswordContainer, editButtonContainer);
  profileContainer.appendChild(bentoGrid);
  pageContainer.appendChild(profileContainer);


  editButton.addEventListener('click', async () => {
    const formData = new FormData();
    formData.append('userName', nameInput.value);
    formData.append('phone', phoneInput.value);
  
    if (newPasswordInput.value !== confirmPasswordInput.value) {
      openModal('error', '¡Vaya!', 'Las contraseñas no coinciden');
      return;
    }
  
    if (newPasswordInput.value) {
      formData.append('password', newPasswordInput.value);
    }
  
    if (avatarInput.files.length > 0) {
      formData.append('img', avatarInput.files[0]);
    }
  
    const token = localStorage.getItem('authToken');
  
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const data = await request(`/auth/${userId}`, 'PATCH', formData, headers);
      console.log(data);
      openModal('success', '¡Bien hecho!', 'Tu perfil se ha editado correctamente');
    } catch (error) {
      console.error(error);
      openModal('error', '¡Vaya!', 'Ha habido un error al editar tu perfil');
    }
  });
  
};
