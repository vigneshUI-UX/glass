// 3D Tilt Parallax Effect on Center Card
const centerCard = document.getElementById('card-center');

centerCard.addEventListener('mousemove', (e) => {
  const rect = centerCard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Calculate tilt angle (-15deg to 15deg)
  const rotateX = ((y - centerY) / centerY) * -15;
  const rotateY = ((x - centerX) / centerX) * 15;

  centerCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
});

centerCard.addEventListener('mouseleave', () => {
  centerCard.style.transition = 'transform 0.5s ease-out';
  centerCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
});

centerCard.addEventListener('mouseenter', () => {
  centerCard.style.transition = 'transform 0.1s ease-out';
});