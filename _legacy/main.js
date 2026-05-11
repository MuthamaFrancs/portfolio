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

import { profile, projects } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  // Profile info (safe DOM updates)
  document.title = `${profile.name} - Portfolio`;

  const heroName = document.getElementById('hero-name');
  if (heroName) heroName.innerHTML = `Muthama <span class="text-primary">Francis</span>`;

  const heroBio = document.getElementById('hero-bio');
  if (heroBio) heroBio.textContent = profile.bio;

  const footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  const contactEmail = document.getElementById('contact-email');
  if (contactEmail) contactEmail.href = `mailto:${profile.email}`;

  const contactPhone = document.getElementById('contact-phone');
  if (contactPhone) contactPhone.href = `tel:${profile.phone}`;

  const linkedinLink = document.getElementById('linkedin-link');
  if (linkedinLink) linkedinLink.href = profile.linkedin;

  const githubLink = document.getElementById('github-link');
  if (githubLink) githubLink.href = profile.github;

  const heroRoles = document.getElementById('hero-roles');
  if (heroRoles) heroRoles.textContent = Array.isArray(profile.roles) ? profile.roles[0] : profile.role;

  // Automation: Load Github Data (image + stats) — use GitHub API
  fetchGitHubProfile();

  // Render Projects into the #projectList container
  renderProjects();

  // Dynamic Roles Animation
  startRoleRotator();
});

// github fetch automation
async function fetchGitHubProfile() {
  const repoCountElement = document.getElementById('repo-count');
  const gitHubStatsContainer = document.getElementById('github-stats');

  try {
    const response = await fetch(`https://api.github.com/users/${profile.githubUsername}`);
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    if (repoCountElement && data && typeof data.public_repos !== 'undefined') {
      repoCountElement.textContent = data.public_repos;
      if (gitHubStatsContainer) gitHubStatsContainer.classList.remove('hidden');
    }
  } catch (error) {
    // Fail silently — keep using local data
    // console.warn('Using local assets due to:', error);
  }
}

// render projects from data.js
function renderProjects() {
  const container = document.getElementById('projectList');
  if (!container) return;

  projects.forEach(project => {
    const tagsHtml = project.tech.map(tag =>
      `<span class="px-2 py-1 bg-gray-100 text-xs rounded-md text-gray-700 font-medium">${tag}</span>`
    ).join(' ');

    const card = `
      <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group mb-6">
        <div class="h-48 bg-gray-200 overflow-hidden relative">
          <img src="${project.image}"
               onerror="this.src='https://placehold.co/600x400?text=No+Image'"
               alt="${project.title}"
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        </div>
        <div class="p-6">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-bold text-lg text-neutral-800">${project.title}</h3>
            <span class="text-[10px] uppercase tracking-wider text-primary border border-primary/20 px-2 py-0.5 rounded-full">${project.category}</span>
          </div>
          <p class="text-gray-600 text-sm mb-4 line-clamp-2">${project.description}</p>
          <div class="flex flex-wrap gap-2 mb-6">
            ${tagsHtml}
          </div>
          <button data-project-id="${project.id}" class="open-project text-primary font-bold text-sm hover:underline flex items-center gap-1">
            View Details <span class="text-lg">→</span>
          </button>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', card);
  });

  // attach click listeners to open modal buttons
  document.querySelectorAll('.open-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = Number(btn.getAttribute('data-project-id'));
      window.openModal(id);
    });
  });
}

// role animation
function startRoleRotator(interval = 3000) {
  const roleElement = document.getElementById('hero-roles');
  if (!roleElement) return;

  const allRoles = [profile.role].concat(Array.isArray(profile.roles) ? profile.roles : []);
  let index = 0;

  setInterval(() => {
    roleElement.style.opacity = 0;
    setTimeout(() => {
      roleElement.textContent = allRoles[index];
      roleElement.style.opacity = 1;
      index = (index + 1) % allRoles.length;
    }, 400);
  }, interval);
}

// modal logic
window.openModal = (id) => {
  const project = projects.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const titleEl = document.getElementById('modal-title');
  const descEl = document.getElementById('modal-desc');
  const imgEl = document.getElementById('modal-img');
  const linkEl = document.getElementById('modal-link');
  const tagsContainer = document.getElementById('modal-tags');

  if (titleEl) titleEl.textContent = project.title;
  if (descEl) descEl.textContent = project.description;
  if (imgEl) imgEl.src = project.image;
  if (linkEl) linkEl.href = project.link;
  if (tagsContainer) tagsContainer.innerHTML = project.tech.map(t => `<span class="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">${t}</span>`).join('');

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
};

window.closeModal = () => {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
};

// Event Listeners for Modal Closing (safe guards)
const modalEl = document.getElementById('project-modal');
if (modalEl) {
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) window.closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') window.closeModal();
});

