d = document;

const moreProject = d.getElementById('more-project');
const projectItems = d.getElementById('project-items');
let toggleViewProjectBool = false;

moreProject.addEventListener("click", ()=>{
    toggleViewProjectBool = !toggleViewProjectBool;

    if (toggleViewProjectBool)  {

        projectItems.classList.add('project__items--full-view');
        moreProject.innerHTML="Colapsar";
    }

    if (!toggleViewProjectBool) {
        projectItems.classList.remove('project__items--full-view');
        moreProject.innerHTML="Ver Mas";
    }
});


