document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("dynamic-inputs");
  const results = document.getElementById("results");
  const totalCal = document.getElementById("totalCal");
  const totalP = document.getElementById("totalP");
  const totalF = document.getElementById("totalF");
  const totalC = document.getElementById("totalC");

  const items = JSON.parse(localStorage.getItem("foodItems") || "[]");

  function createRow(item) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <label>${item.name} (${item.kcal} kcal/g)</label>
      <input type="number" data-name="${item.name}" data-cal="${item.kcal}" data-p="${item.p}" data-f="${item.f}" data-c="${item.c}" step="0.1">
      <div class="result"></div>
    `;
    container.appendChild(div);
  }

  items.forEach(createRow);

  function update() {
    let cal = 0, p = 0, f = 0, c = 0;
    container.querySelectorAll("input").forEach(input => {
      const g = parseFloat(input.value) || 0;
      const kcal = parseFloat(input.dataset.cal);
      const pr = parseFloat(input.dataset.p);
      const fa = parseFloat(input.dataset.f);
      const ca = parseFloat(input.dataset.c);
      const result = input.nextElementSibling;

      const kcalTotal = g * kcal;
      const pTotal = g * pr;
      const fTotal = g * fa;
      const cTotal = g * ca;

      result.textContent = `→ ${kcalTotal.toFixed(2)} kcal｜P:${pTotal.toFixed(2)}g F:${fTotal.toFixed(2)}g C:${cTotal.toFixed(2)}g`;

      cal += kcalTotal;
      p += pTotal;
      f += fTotal;
      c += cTotal;
    });

    totalCal.textContent = `総カロリー: ${cal.toFixed(2)} kcal`;
    totalP.textContent = `タンパク質: ${p.toFixed(2)} g`;
    totalF.textContent = `脂質: ${f.toFixed(2)} g`;
    totalC.textContent = `炭水化物: ${c.toFixed(2)} g`;
    results.style.display = "block";
  }

  container.addEventListener("input", update);
});
