const viewButtons = document.querySelectorAll('.view-btn');
  const modals = document.querySelectorAll('.project-modal');

  viewButtons.forEach((btn, index) => {
    const modal = modals[index];
    const closeModal = modal.querySelector('.close-modal');

    // Open modal
    btn.addEventListener('click', () => modal.classList.remove('hidden'));

    // Close modal
    closeModal.addEventListener('click', () => modal.classList.add('hidden'));

    // Close when clicking outside modal content
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  });