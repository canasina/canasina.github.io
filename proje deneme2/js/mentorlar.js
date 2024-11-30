document.querySelectorAll('.rating').forEach(rating => {
    const stars = rating.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
      // Click event to set or reset the rating
      star.addEventListener('click', () => {
        if (star.classList.contains('selected')) {
          // If the star is already selected, clear all selected stars
          stars.forEach(s => s.classList.remove('selected'));
        } else {
          // Otherwise, select the clicked star and all the previous ones
          stars.forEach((s, i) => {
            if (i <= index) {
              s.classList.add('selected');
            } else {
              s.classList.remove('selected');
            }
          });
        }
      });
  
      // Mouseover event for hovering effect
      star.addEventListener('mouseover', () => {
        stars.forEach((s, i) => {
          if (i <= index) {
            s.classList.add('hover');
          } else {
            s.classList.remove('hover');
          }
        });
      });
  
      // Mouseout event to remove the hovering effect
      star.addEventListener('mouseout', () => {
        stars.forEach(s => s.classList.remove('hover'));
      });
    });
  });
  