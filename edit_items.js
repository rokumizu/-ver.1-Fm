document.addEventListener("DOMContentLoaded", () => {
    const itemList = document.getElementById("item-list");
    const form = document.getElementById("item-form");
    const addButton = document.getElementById("add-item");
  
    // 食材1つの入力行を生成
    function createItemRow(item = {}) {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <input type="text" placeholder="名前" value="${item.name || ""}" />
        <input type="number" placeholder="kcal/g" value="${item.kcal || 0}" step="0.01" />
        <input type="number" placeholder="P/g" value="${item.p || 0}" step="0.01" />
        <input type="number" placeholder="F/g" value="${item.f || 0}" step="0.01" />
        <input type="number" placeholder="C/g" value="${item.c || 0}" step="0.01" />
        <button type="button" class="remove">削除</button>
      `;
      div.querySelector(".remove").addEventListener("click", () => {
        div.remove();
      });
      itemList.appendChild(div);
    }
  
    // 保存されたデータの読み込み
    const saved = JSON.parse(localStorage.getItem("foodItems") || "[]");
    saved.forEach(createItemRow);
  
    // 新しい行の追加
    addButton.addEventListener("click", () => createItemRow());
  
    // フォームの保存処理
    form.addEventListener("submit", e => {
      e.preventDefault();
      const items = [];
      itemList.querySelectorAll(".card").forEach(card => {
        const inputs = card.querySelectorAll("input");
        const [name, kcal, p, f, c] = [...inputs].map(input => input.value);
        if (name.trim()) {
          items.push({
            name: name.trim(),
            kcal: parseFloat(kcal),
            p: parseFloat(p),
            f: parseFloat(f),
            c: parseFloat(c)
          });
        }
      });
      localStorage.setItem("foodItems", JSON.stringify(items));
      alert("保存しました！");
    });
  });
  