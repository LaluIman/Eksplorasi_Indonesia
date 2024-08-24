function searchWikipedia() {
    const query = document.getElementById('search-input').value;
    const apiUrl = `https://id.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}+Indonesia&format=json&origin=*`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const results = document.getElementById('results');
        results.innerHTML = '';
  
        if (data.query.search.length === 0) {
          results.innerHTML = '<p>Tidak ada hasil yang ditemukan.</p>';
        } else {
          data.query.search.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            const imageUrl = `https://id.wikipedia.org/w/api.php?action=query&titles=${item.title}&prop=pageimages&pithumbsize=100&format=json&origin=*`;
            fetch(imageUrl)
              .then(response => response.json())
              .then(imageData => {
                const imageUrl = imageData.query.pages[Object.keys(imageData.query.pages)[0]].thumbnail.source;
                const wikipediaUrl = `https://id.wikipedia.org/wiki/${item.title.replace(/\s+/g, '_')}`;
                resultItem.innerHTML = `
                  <img src="${imageUrl}" alt="${item.title}" />
                  <h3>${item.title}</h3>
                  <p>${item.snippet}</p>
                  <button><a href="${wikipediaUrl}" target="_blank">Baca lebih lanjut di Wikipedia</a></button>
                `;
                results.appendChild(resultItem);
              })
              .catch(error => {
                console.error('Error fetching image:', error);
                const wikipediaUrl = `https://id.wikipedia.org/wiki/${item.title.replace(/\s+/g, '_')}`;
                resultItem.innerHTML = `
                  <h3>${item.title}</h3>
                  <p>${item.snippet}</p>
                  <button><a href="${wikipediaUrl}" target="_blank">Baca lebih lanjut di Wikipedia</a></button>
                `;
                results.appendChild(resultItem);
              });
          });
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        const results = document.getElementById('results');
        results.innerHTML = '<p>Terjadi kesalahan saat mengambil data.</p>';
      });
  }