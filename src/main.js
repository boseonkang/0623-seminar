import Swal from 'sweetalert2';

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById('warning-button');
  button.addEventListener('click', () => {
    Swal.fire({
      title: '⚠️ I Said Do Not Click!',
      text: 'You were warned...',
      icon: 'warning',
      confirmButtonText: 'Sorry 😓',
      background: '#e3f2fd',
      color: '#0d47a1',
      confirmButtonColor: '#64b5f6',
    });
  });
});