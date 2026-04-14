document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('mosaico-galeria');
    const sourceElement = document.getElementById('lista-fotos-local');
    const btnLoadMore = document.getElementById('btn-load-more');
    const btnShowLess = document.getElementById('btn-show-less');
    const backToTop = document.getElementById('backToTop');
    
    if (grid && sourceElement) {
        const sourceData = sourceElement.children;
        const allData = Array.from(sourceData).map(el => ({
            img: el.getAttribute('data-img'),
            title: el.getAttribute('data-title'),
            desc: el.getAttribute('data-desc'),
            cat: el.getAttribute('data-cat')
        }));

        let itemsDisplayed = 0;
        const itemsPerLoad = 8; 

        function applyMasonry() {
            if (window.innerWidth <= 768) { 
                grid.style.height = 'auto'; 
                return; 
            }
            const items = grid.querySelectorAll('.gallery-item');
            const columnCount = 4;
            const gutter = 20;
            const containerWidth = grid.offsetWidth;
            const itemWidth = (containerWidth - (gutter * (columnCount - 1))) / columnCount;
            const columnHeights = new Array(columnCount).fill(0);

            items.forEach(item => {
                if (item.style.display === 'none') return;
                item.style.width = `${itemWidth}px`;
                const minIndex = columnHeights.indexOf(Math.min(...columnHeights));
                item.style.left = `${minIndex * (itemWidth + gutter)}px`;
                item.style.top = `${columnHeights[minIndex]}px`;
                columnHeights[minIndex] += item.offsetHeight + gutter;
            });
            grid.style.height = `${Math.max(...columnHeights)}px`;
        }

        function loadItems() {
            const remaining = allData.length - itemsDisplayed;
            const toLoad = Math.min(remaining, itemsPerLoad);
            
            for (let i = 0; i < toLoad; i++) {
                const index = itemsDisplayed + i;
                if(!allData[index].img) continue;
                
                const item = document.createElement('div');
                item.className = `gallery-item ${allData[index].cat}`;
                item.innerHTML = `
                    <div class="item-frame"><img src="${allData[index].img}" alt="${allData[index].title}"></div>
                    <div class="item-info">
                        <h3>${allData[index].title}</h3>
                        <p>${allData[index].desc}</p>
                    </div>`;
                grid.appendChild(item);
                
                item.querySelector('img').onload = applyMasonry;
                setTimeout(() => item.classList.add('show'), i * 100);
            }
            itemsDisplayed += toLoad;
            
            btnLoadMore.style.display = itemsDisplayed >= allData.length ? 'none' : 'block';
            btnShowLess.style.display = itemsDisplayed > itemsPerLoad ? 'block' : 'none';
            setTimeout(applyMasonry, 600);
        }

        btnShowLess.addEventListener('click', () => {
            const items = Array.from(grid.querySelectorAll('.gallery-item'));
            items.slice(itemsPerLoad).forEach(item => item.remove());
            itemsDisplayed = itemsPerLoad;
            btnLoadMore.style.display = 'block';
            btnShowLess.style.display = 'none';
            window.scrollTo({ top: grid.offsetTop - 100, behavior: 'smooth' });
            setTimeout(applyMasonry, 300);
        });

        btnLoadMore.addEventListener('click', loadItems);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) backToTop.classList.add('active');
            else backToTop.classList.remove('active');
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        loadItems();
        window.addEventListener('resize', applyMasonry);

        document.querySelectorAll('.filter-btn').forEach(fBtn => {
            fBtn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                fBtn.classList.add('active');
                const cat = fBtn.dataset.filter;
                grid.querySelectorAll('.gallery-item').forEach(item => {
                    if (cat === 'all' || item.classList.contains(cat)) {
                        item.style.display = 'flex';
                        setTimeout(() => item.style.opacity = '1', 10);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
                setTimeout(applyMasonry, 350);
            });
        });
    }
});