// 星空背景生成函数（所有页面复用）
function createStars() {
  const starsContainer = document.getElementById('stars-container');
  if (!starsContainer) return; // 避免重复创建

  const starCount = 200; // 星星数量
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    // 随机位置、大小、亮度
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const opacity = Math.random() * 0.8 + 0.2;
    
    star.style.cssText = `
      position: absolute;
      top: ${y}%;
      left: ${x}%;
      width: ${size}px;
      height: ${size}px;
      background-color: white;
      border-radius: 50%;
      opacity: ${opacity};
      animation: twinkle ${Math.random() * 3 + 2}s infinite alternate;
    `;
    starsContainer.appendChild(star);
  }
}

// 暴露给其他页面调用
window.createStars = createStars;