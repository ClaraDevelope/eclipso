import './searchAndFilter.css';

export const SearchAndFilterComponent = (onSearch, onFilterChange, tags) => {
  const handleSearch = (e) => {
    if (e.type === 'blur' || e.key === 'Enter') {
      onSearch(e.target.value);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  let themeOptionsVisible = false;
  const toggleThemeOptions = () => {
    themeOptionsVisible = !themeOptionsVisible;
    themeOptionsDiv.style.display = themeOptionsVisible ? 'flex' : 'none';
  };

  let costSliderVisible = false;
  const toggleCostSlider = () => {
    costSliderVisible = !costSliderVisible;
    costSliderDiv.style.display = costSliderVisible ? 'block' : 'none';
  };

  const handleCostChange = (e) => {
    const costValue = document.getElementById('costValue');
    costValue.innerText = e.target.value;
    onFilterChange('priceRange', [0, parseInt(e.target.value)]);
  };

  const container = document.createElement('div');
  container.classList.add('search-filter-container');

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('search-bar');
  searchInput.placeholder = 'Busca eventos...';
  searchInput.addEventListener('blur', handleSearch);
  searchInput.addEventListener('keypress', handleSearch);

  const filtersDiv = document.createElement('div');
  filtersDiv.classList.add('filters');

  const themeButton = document.createElement('button');
  themeButton.classList.add('theme');
  themeButton.innerText = 'Filtra por temática';
  themeButton.addEventListener('click', toggleThemeOptions);

  const themeOptionsDiv = document.createElement('div');
  themeOptionsDiv.classList.add('theme-options');
  themeOptionsDiv.style.display = 'none';

  tags.forEach((tag) => {
    const tagButton = document.createElement('button');
    tagButton.classList.add('theme-option');
    tagButton.innerText = tag;
    tagButton.addEventListener('click', () => onFilterChange('tags', tag));
    themeOptionsDiv.appendChild(tagButton);
  });

  const costButton = document.createElement('button');
  costButton.classList.add('cost');
  costButton.innerText = 'Filtra por coste';
  costButton.addEventListener('click', toggleCostSlider);

  const costSliderDiv = document.createElement('div');
  costSliderDiv.classList.add('cost-slider');
  costSliderDiv.style.display = 'none';

  const costSlider = document.createElement('input');
  costSlider.type = 'range';
  costSlider.min = 0;
  costSlider.max = 1000;
  costSlider.value = 1000;
  costSlider.classList.add('slider');
  costSlider.addEventListener('input', handleCostChange);

  const costLabel = document.createElement('label');
  costLabel.innerHTML = `Coste: <span id="costValue">1000</span>`;

  costSliderDiv.appendChild(costSlider);
  costSliderDiv.appendChild(costLabel);

  container.appendChild(searchInput);
  filtersDiv.appendChild(themeButton);
  filtersDiv.appendChild(themeOptionsDiv);
  filtersDiv.appendChild(costButton);
  filtersDiv.appendChild(costSliderDiv);
  container.appendChild(filtersDiv);

  return container;
};






