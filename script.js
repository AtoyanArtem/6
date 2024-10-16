document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.getElementById('quantity');
    const typeRadio = document.querySelectorAll('input[name="type"]');
    const optionSelect = document.getElementById('option');
    const propertyCheckbox = document.getElementById('property');
    const resultDiv = document.getElementById('result');
  
    const prices = {
      1: 100,
      2: 200,
      3: 300,
    };
  
    const options = {
      2: [
        { value: 1, price: 50 },
        { value: 2, price: 100 },
      ],
    };
  
    const properties = {
      3: {
        value: 1,
        price: 50,
      },
    };
  
    let currentType = null;
    let currentOption = null;
    let currentProperty = null;
  
    const calculateCost = (e) => {
      e.preventDefault();
  
      const quantity = quantityInput.value;
  
      if (!quantity || isNaN(quantity)) {
        alert('Некорректное значение количества');
        return;
      }
  
      let cost = prices[currentType];
  
      if (currentType === 2 && currentOption) {
        cost += options[currentType][currentOption - 1].price;
      }
  
      if (currentType === 3 && currentProperty) {
        cost += properties[currentType].price;
      }
  
      const totalCost = quantity * cost;
      resultDiv.innerHTML = `Стоимость услуги: ${totalCost} руб.`;
    };
  
    const updateOptions = (type) => {
      optionSelect.disabled = type !== 2;
  
      if (type === 2) {
        optionSelect.innerHTML = '';
  
        options[type].forEach((option) => {
          const optionElement = document.createElement('option');
          optionElement.value = option.value;
          optionElement.innerHTML = option.name;
  
          optionSelect.appendChild(optionElement);
        });
      }
    };
  
    const updateProperties = (type) => {
      propertyCheckbox.disabled = type !== 3;
  
      if (type === 3) {
        propertyCheckbox.checked = false;
      }
    };
  
    const updateForm = (e) => {
      currentType = e.target.value;
  
      updateOptions(currentType);
      updateProperties(currentType);
    };
  
    const updateOption = (e) => {
      currentOption = e.target.value;
    };
  
    const updateProperty = (e) => {
      currentProperty = e.target.checked;
    };
  
    typeRadio.forEach((radio) => {
      radio.addEventListener('change', updateForm);
    });
  
    optionSelect.addEventListener('change', updateOption);
  
    propertyCheckbox.addEventListener('change', updateProperty);
  
    const form = document.querySelector('form');
    form.addEventListener('submit', calculateCost);
  });
  