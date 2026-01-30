document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("table-body");
  const thead = document.getElementById("table-header");
  if (!tbody || !thead) return;

  const datasetMap = {
    "daily": "DailyDialogue",
    "meld": "Meld",
    "imeocap": "Imeocap",
    "emorynlp": "Emorynlp"
  };

  const metricMap = {
    "SpeechBERTScore": "BERT",
    "PESQ": "PESQ",
  };

  Papa.parse("./static/csv/result.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,

    complete: function(results) {
      const data = results.data;

      const datasets = [...new Set(data.map(r => r.dataset))];
      const metrics = ["SpeechBERTScore", "PESQ"];
      let methods = [...new Set(data.map(r => r.method))];

      // 不显示 SourceData
      methods = methods.filter(m => m !== "SourceData");

      // 1️⃣ 表头第一行（dataset）
      const tr1 = document.createElement("tr");
      tr1.innerHTML = `<th rowspan='2' style="border-top:2px solid black; border-bottom:2px solid black;">Method</th>` +
        datasets.map(ds => `<th colspan='${metrics.length}' style="border-top:2px solid black; border-bottom:2px solid black;">${datasetMap[ds] || ds}</th>`).join("");
      thead.appendChild(tr1);

      // 2️⃣ 表头第二行（metric）
      const tr2 = document.createElement("tr");
      tr2.innerHTML = datasets.map(ds => 
        metrics.map(m => `<th style="border-bottom:2px solid black;">${metricMap[m] || m}</th>`).join("")
      ).join("");
      thead.appendChild(tr2);

      // 3️⃣ 计算每列最大值
      const colMax = {}; // key: dataset+metric
      datasets.forEach(ds => {
        metrics.forEach(m => {
          const vals = data.filter(r => r.dataset===ds && methods.includes(r.method))
                           .map(r => r[m]);
          colMax[ds + "_" + m] = Math.max(...vals);
        });
      });

      // 4️⃣ tbody
      methods.forEach((method, idx) => {
        const tr = document.createElement("tr");
        const isLast = idx === methods.length - 1;

        tr.innerHTML = `<td style="font-weight:bold; ${isLast ? 'border-bottom:2px solid black;' : ''}">${method}</td>` +
          datasets.map(ds => {
            const row = data.find(r => r.dataset===ds && r.method===method);
            if(!row) return metrics.map(_ => `<td style="${isLast ? 'border-bottom:2px solid black;' : ''}">-</td>`).join("");

            return metrics.map(m => {
              const isMax = row[m] === colMax[ds + "_" + m];
              return `<td style="${isLast ? 'border-bottom:2px solid black;' : ''}; font-weight:${isMax?'bold':'normal'}">${typeof row[m]==="number"?row[m].toFixed(2):row[m]}</td>`;
            }).join("");
          }).join("");

        tbody.appendChild(tr);
      });
    },

    error: function(err) {
      console.error("CSV load failed:", err);
    }
  });
});
