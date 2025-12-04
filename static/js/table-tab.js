// static/js/table-tab.js

// 第一层 tabs（Dataset）
// const tabBtns = document.querySelectorAll(".tab-button");
// const tabContents = document.querySelectorAll(".tab-content");

// tabBtns.forEach(btn => {
//     btn.addEventListener("click", () => {
//         const target = btn.dataset.tab;

//         tabBtns.forEach(b => b.classList.remove("active"));
//         btn.classList.add("active");

//         tabContents.forEach(c => c.classList.toggle("active", c.id === target));
//     });
// });

// // 第二层 tabs（Weights）
// const subBtns = document.querySelectorAll(".subtab-button");
// const subContents = document.querySelectorAll(".subtab-content");

// subBtns.forEach(btn => {
//     btn.addEventListener("click", () => {
//         const target = btn.dataset.subtab;

//         const parent = btn.closest(".tab-content");  

//         parent.querySelectorAll(".subtab-button").forEach(b => b.classList.remove("active"));
//         btn.classList.add("active");

//         parent.querySelectorAll(".subtab-content").forEach(c => {
//             c.classList.toggle("active", c.id === target);
//         });
//     });
// });

document.querySelectorAll(".tabs-wrapper").forEach(wrapper => {
    const tabBtns = wrapper.querySelectorAll(".tab-button");
    const tabContents = wrapper.querySelectorAll(".tab-content");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            tabContents.forEach(c => c.classList.toggle("active", c.id === target));
        });
    });
});

const subBtns = document.querySelectorAll(".subtab-button");
const subContents = document.querySelectorAll(".subtab-content");

subBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.subtab;

        const parent = btn.closest(".tab-content");  

        parent.querySelectorAll(".subtab-button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        parent.querySelectorAll(".subtab-content").forEach(c => {
            c.classList.toggle("active", c.id === target);
        });
    });
});
