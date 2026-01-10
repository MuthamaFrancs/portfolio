//const viewButtons = document.querySelectorAll('.view-btn');
//  const modals = document.querySelectorAll('.project-modal');
//
//  viewButtons.forEach((btn, index) => {
//    const modal = modals[index];
//    const closeModal = modal.querySelector('.close-modal');
//
//    // Open modal
//    btn.addEventListener('click', () => modal.classList.remove('hidden'));
//
//    // Close modal
//    closeModal.addEventListener('click', () => modal.classList.add('hidden'));
//
//    // Close when clicking outside modal content
//    window.addEventListener('click', (e) => {
//      if (e.target === modal) modal.classList.add('hidden');
//    });
//  });

  import { profileData, projects } from './data.js';

// 1. Update Profile Info
document.querySelectorAll('.dynamic-name').forEach(el => el.textContent = profileData.name);
document.getElementById('dynamic-bio').textContent = profileData.bio;
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Render Projects Automatically
const projectContainer = document.getElementById('projects-grid');

projects.forEach(project => {
  const cardHTML = `
    <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div class="h-48 bg-gray-200 overflow-hidden">
        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
      </div>
      <div class="p-6">
        <h3 class="font-bold text-lg text-neutral-800 mb-2">${project.title}</h3>
        <p class="text-gray-600 text-sm mb-4 line-clamp-3">${project.description}</p>
        <div class="flex flex-wrap gap-2 mb-6">
          ${project.tech.map(t => `<span class="px-2 py-1 bg-gray-100 text-xs rounded-md">${t}</span>`).join('')}
        </div>
        <button onclick="openProjectModal(${project.id})" class="text-primary font-bold text-sm hover:underline">View Details &rarr;</button>
      </div>
    </div>
  `;
  projectContainer.innerHTML += cardHTML;
});

// 3. Make the Modal Function (Global Scope)
window.openProjectModal = (id) => {
  const project = projects.find(p => p.id === id);
  if (!project) return;
  
  // Assuming you have the modal HTML structure from my previous response
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-desc').textContent = project.description;
  document.getElementById('modal-img').src = project.image;
  document.getElementById('modal-link').href = project.link;
  
  // Show Modal
  document.getElementById('project-modal').classList.remove('hidden');
};