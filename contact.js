document.addEventListener('DOMContentLoaded', function () {
    // תפריט נייד
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.onclick = function () {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        };
    }

    // --- מודאל צור קשר עם prompt לשם ---
    const openBtn = document.getElementById('openContact');
    const modal = document.getElementById('contactModal');
    const closeBtn = document.getElementById('closeContact');
    const nameField = document.getElementById('hiddenNameField');
    const modalHeader = document.getElementById('modalHeader');

    if (openBtn && modal && closeBtn && nameField && modalHeader) {
        openBtn.addEventListener('click', () => {
            let username = prompt("מה השם שלך?");
            if (username && username.trim()) {
                modalHeader.textContent = "שלום " + username + "! אנא השאר/י פרטי קשר";
                nameField.value = username;
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            } else if (username !== null) {
                alert("לא הזנת שם! נסה/י שוב.");
            }
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        });

        // סגירה בלחיצה מחוץ לחלון
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }

    // הדגמה אינטראקטיבית
    const jsDemoBtn = document.getElementById("jsDemoBtn");
    const jsDemoContent = document.getElementById("jsDemoContent");
    if (jsDemoBtn && jsDemoContent) {
        jsDemoBtn.onclick = function () {
            let name = prompt("מה השם שלך?");
            if (!name || name.trim() === "") {
                name = "אורח/ת";
                alert("לא הוזן שם. הוגדרת כאורח/ת");
            } else {
                alert("ברוך/ה הבא/ה, " + name + "!");
            }

            const meals = [
                { name: "מרק עדשים", calories: 120 },
                { name: "סלט קינואה", calories: 180 },
                { name: "עוגת גבינה", calories: 320 }
            ];
            let healthyCount = 0;
            let listHtml = "<ol class='text-right pr-6'>";
            for (let i = 0; i < meals.length; i++) {
                if (meals[i].name.includes("סלט")) {
                    healthyCount++;
                    listHtml += `<li class="text-emerald-600 font-bold">${meals[i].name} (מנה בריאה!)</li>`;
                } else {
                    listHtml += `<li>${meals[i].name}</li>`;
                }
            }
            listHtml += "</ol>";

            function getMessage(n) {
                return n > 0 ? "כל הכבוד, יש לנו מנות בריאות!" : "אנחנו צריכים להוסיף עוד מנות בריאות...";
            }

            jsDemoContent.innerHTML =
                `<h3 class="text-xl font-bold mb-2">תודה על השתתפותך, ${name}!</h3>
                <div class="mb-4">אלו המנות שלנו:</div>
                ${listHtml}
                <div class="mt-4">${getMessage(healthyCount)}</div>
                <div class="mt-6">
                    <span class="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-lg font-bold">
                    סוגי הפלט בהם השתמשנו: prompt, alert, innerHTML, document.write
                    </span>
                </div>
                <div class="mt-3 text-xs text-gray-400">פלט document.write מוצג בחלון חדש לפי דרישת הפרויקט</div>`;
        };
    }

    // *** כאן הפונקציה שלך ל־document.write ***
    window.showMealCalories = function () {
        const meals = [
            { name: "מרק עדשים", calories: 120 },
            { name: "סלט קינואה", calories: 180 },
            { name: "עוגת גבינה", calories: 320 }
        ];
        const selected = document.getElementById('mealSelect').value;
        const meal = meals[selected];

        // פותח דף חדש עם document.write בלבד (לא מוחק את האתר שלך!)
        const w = window.open('', '_blank');
        w.document.write(`
            <body style="font-family:Heebo,sans-serif;direction:rtl;background:#ecfdf5">
            <div style="margin:2em;text-align:center">
                <h2 style="color:#047857">ערך קלורי למנה</h2>
                <p style="font-size:1.3em"><b>${meal.name}</b></p>
                <p style="font-size:1.1em">מכילה <span style="color:#047857;font-weight:bold">${meal.calories} קק"ל</span></p>
                <p style="font-size:0.9em;color:#666">פלט זה נוצר באמצעות document.write לפי דרישות הפרויקט</p>
            </div>
            </body>
        `);
    };

    // חיבור גם לכפתור (אם לא השתמשת ב־onclick ישיר)
    const caloriesBtn = document.getElementById('caloriesBtn');
    if (caloriesBtn) {
        caloriesBtn.onclick = window.showMealCalories;
    }
});