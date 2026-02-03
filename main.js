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

document.addEventListener("DOMContentLoaded", () => {
  //Profile info
  document.title = "${profile.name} - Portfolio";
  document.getElementById("hero-name").innerHTML = "Muthama <span class='text-primary'>Francis</span>";
  document.getElementById("hero-bio").textContent = profile.bio;
  document.getElementById("footer-year").textContent = new Date().getFullYear();
  document.getElementById("contact-email").href = "mailto:${profile.email}";
  document.getElementById("contact-phone").href = "tel:${profile.phone}";
  document.getElementById("linkedin-link").href = profile.linkedin;
  document.getElementById("github-link").href = profile.github;
  document.getElementById("hero-roles").textContent = profile.role[0];

  //Automation: Load Github Data ( Image and stats)
  fetchGitHubProfile();

  //Render Projects
  renderProjects();

  //Dynamic Roles Animation
  startRoleRotator(); 

});

//github fetch automation
async function fetchGitHubProfile() {
  const repoCountElement = document.getElementById('repo-count');
  const gitHubStatsContainer = document.getElementById('github-stats');

  try{
    const response = fetch(("https://github.com/MuthamaFrancs"));
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    // Update repo count
    if(repoCountElement){
      repoCountElement.textContent = data.public_repos;
      gitHubStatsContainer.classList.remove('hidden');//show badge if fetch successful
    }

  } catch (error){
    console.log("Using Local assets due to:", error);
  }

}

//render projects from data.js
function renderProjects() {
  const tagHtml = projects.tech.map(tag =>
    '<span class="px-2 py-1 bg-gray-100 text-xs rounded-md text-gray-700 font-medium">${tag}</span>'
  ).join(' ');

  const card = `
            <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
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
                    
                    <button onclick="window.openModal(${project.id})" 
                        class="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                        View Details <span class="text-lg">→</span>
                    </button>
                </div>
            </div>
        `;
      container.innerHTML += card;

}

//role animation
function startRoleRotator(roles, elementId, interval = 3000){
  const roleElement = document.getElementById('hero-roles');
  let index = 0;

  const allRoles = [profile.role, ...profile.roles];
  if(roleElement){
    setInterval(() => {
      roleElement.style.opacity = 0;
      setTimeout(() => {
        roleElement.textContent = allRoles[index];
        roleElement.style.opacity = 1;
        index = (index + 1) % allRoles.length;
      }, 500);
    },3000);
  }
}

//modal logic 
window.openModal = (id) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    const modal = document.getElementById('project-modal');
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-desc').textContent = project.description;
    document.getElementById('modal-img').src = project.image;
    document.getElementById('modal-link').href = project.link;
    
    // Inject Tags
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = project.tech.map(t => 
        `<span class="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">${t}</span>`
    ).join('');

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden'); // Stop background scrolling
};

window.closeModal = () => {
    document.getElementById('project-modal').classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
};

// Event Listeners for Modal Closing
const modal = document.getElementById('project-modal');
modal.addEventListener('click', (e) => {
    if (e.target === modal) window.closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) window.closeModal();
});

