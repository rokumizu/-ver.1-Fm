document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const weightEl = document.getElementById("weight");
    const fatPercentEl = document.getElementById("fatPercent");
  
    if (localStorage.getItem("weight")) weightEl.value = localStorage.getItem("weight");
    if (localStorage.getItem("fatPercent")) fatPercentEl.value = localStorage.getItem("fatPercent");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const weight = parseFloat(weightEl.value);
      const activity = parseFloat(document.getElementById("activity").value);
      const goal = parseFloat(document.getElementById("goal").value);
      const fatPercent = parseFloat(fatPercentEl.value);
  
      localStorage.setItem("weight", weight);
      localStorage.setItem("fatPercent", fatPercent);
  
      const bmr = weight * 22;
      const tdee = bmr * activity;
      const intake = tdee - goal;
  
      const proteinMin = weight * 1.5;
      const proteinMax = weight * 2.0;
      const proteinAvg = (proteinMin + proteinMax) / 2;
      const proteinKcal = proteinAvg * 4;
  
      const fatKcal = intake * (fatPercent / 100);
      const fatGram = fatKcal / 9;
  
      const carbKcal = intake - proteinKcal - fatKcal;
      const carbGram = carbKcal / 4;
  
      document.getElementById("results").style.display = "block";
      document.getElementById("bmr").textContent = `基礎代謝：${bmr.toFixed(2)} kcal`;
      document.getElementById("tdee").textContent = `活動代謝：${tdee.toFixed(2)} kcal`;
      document.getElementById("intake").textContent = `目標摂取カロリー：${intake.toFixed(2)} kcal`;
      document.getElementById("protein").textContent = `タンパク質：${proteinAvg.toFixed(2)} g（${proteinKcal.toFixed(2)} kcal）`;
      document.getElementById("fat").textContent = `脂質：${fatGram.toFixed(2)} g（${fatKcal.toFixed(2)} kcal）`;
      document.getElementById("carb").textContent = `炭水化物：${carbGram.toFixed(2)} g（${carbKcal.toFixed(2)} kcal）`;
    });
  });
  