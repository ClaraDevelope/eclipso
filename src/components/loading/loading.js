import './loading.css';

// ? ESTARÍA BIEN HACER UN SKELETON DE CADA PÁGINA (ES UN POCO ROLLO PERO AL MENOS EL DE LA LANDING PODRÍA ESTAR BIEN, SÓLO SERÍA EL TÍTULO Y LAS CAJAS DEL GRID)
// export const createLandingSkeleton = () => {
//   let skeletonContainer = document.getElementById('skeleton-container');
//   if (!skeletonContainer) {
//     skeletonContainer = document.createElement('div');
//     skeletonContainer.id = 'skeleton-container';
//     skeletonContainer.classList.add('skeleton-container');

//   }
// }
export const createSkeleton = () => {
  const app = document.getElementById('app');

  let skeletonContainer = document.getElementById('skeleton-container');
  if (!skeletonContainer) {
    skeletonContainer = document.createElement('div');
    skeletonContainer.id = 'skeleton-container'; 
    skeletonContainer.classList.add('skeleton-container');
    
    for (let i = 0; i < 5; i++) {
      const skeletonItem = document.createElement('div');
      skeletonItem.classList.add('skeleton-loader');

      if (i === 0) {
        skeletonItem.classList.add('skeleton-avatar');
        skeletonItem.style.width = '50px';
        skeletonItem.style.height = '50px';
      } else if (i === 1) {
        skeletonItem.classList.add('skeleton-image');
        skeletonItem.style.width = '100%';
        skeletonItem.style.height = '200px';
      } else {
        skeletonItem.style.width = i % 2 === 0 ? '80%' : '60%';
        skeletonItem.style.height = '20px';
      }

      skeletonContainer.appendChild(skeletonItem);
    }

    app.appendChild(skeletonContainer);
  }
};

export const removeSkeleton = () => {
  const skeletonContainer = document.getElementById('skeleton-container');
  if (skeletonContainer) {
    skeletonContainer.remove();
  }
};

