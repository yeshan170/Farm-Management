// Sample data
let crops = [
    { name: 'Wheat', stage: 'Growing', health: 85 },
    { name: 'Corn', stage: 'Seedling', health: 92 },
    { name: 'Soybeans', stage: 'Harvesting', health: 78 },
];

let inventory = [
    { name: 'Seeds', quantity: 500, unit: 'kg' },
    { name: 'Fertilizer', quantity: 1000, unit: 'kg' },
    { name: 'Pesticides', quantity: 200, unit: 'L' },
];

// DOM elements
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section');
const cropList = document.getElementById('crop-list');
const inventoryList = document.getElementById('inventory-list');
const cropGrid = document.getElementById('crop-grid');
const inventoryBody = document.getElementById('inventory-body');
const addCropBtn = document.getElementById('add-crop-btn');
const addItemBtn = document.getElementById('add-item-btn');

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const targetId = link.getAttribute('href').slice(1);
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });
    });
});

// Update dashboard
function updateDashboard() {
    // Update weather (simulated)
    document.getElementById('temperature').textContent = `Temperature: ${Math.floor(Math.random() * 15 + 15)}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${Math.floor(Math.random() * 30 + 50)}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${Math.floor(Math.random() * 20 + 5)} km/h`;

    // Update crop summary
    cropList.innerHTML = '';
    crops.forEach(crop => {
        const li = document.createElement('li');
        li.textContent = `${crop.name}: ${crop.stage} (Health: ${crop.health}%)`;
        cropList.appendChild(li);
    });

    // Update inventory summary
    inventoryList.innerHTML = '';
    inventory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name}: ${item.quantity} ${item.unit}`;
        inventoryList.appendChild(li);
    });
}

// Update crop management
function updateCropManagement() {
    cropGrid.innerHTML = '';
    crops.forEach(crop => {
        const cropCard = document.createElement('div');
        cropCard.classList.add('card');
        cropCard.innerHTML = `
            <h3>${crop.name}</h3>
            <p>Stage: ${crop.stage}</p>
            <p>Health: ${crop.health}%</p>
            <button onclick="removeCrop('${crop.name}')">Remove</button>
        `;
        cropGrid.appendChild(cropCard);
    });
}

// Update inventory management
function updateInventory() {
    inventoryBody.innerHTML = '';
    inventory.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.unit}</td>
            <td><button onclick="removeInventoryItem('${item.name}')">Remove</button></td>
        `;
        inventoryBody.appendChild(row);
    });
}

// Add new crop
addCropBtn.addEventListener('click', () => {
    const name = document.getElementById('crop-name').value;
    const stage = document.getElementById('crop-stage').value;
    const health = document.getElementById('crop-health').value;

    if (name && stage && health) {
        crops.push({ name, stage, health: parseInt(health) });
        updateDashboard();
        updateCropManagement();
        document.getElementById('crop-name').value = '';
        document.getElementById('crop-stage').value = '';
        document.getElementById('crop-health').value = '';
    }
});

// Add new inventory item
addItemBtn.addEventListener('click', () => {
    const name = document.getElementById('item-name').value;
    const quantity = document.getElementById('item-quantity').value;
    const unit = document.getElementById('item-unit').value;

    if (name && quantity && unit) {
        inventory.push({ name, quantity: parseInt(quantity), unit });
        updateDashboard();
        updateInventory();
        document.getElementById('item-name').value = '';
        document.getElementById('item-quantity').value = '';
        document.getElementById('item-unit').value = '';
    }
});

// Remove crop
function removeCrop(cropName) {
    crops = crops.filter(crop => crop.name !== cropName);
    updateDashboard();
    updateCropManagement();
}

// Remove inventory item
function removeInventoryItem(itemName) {
    inventory = inventory.filter(item => item.name !== itemName);
    updateDashboard();
    updateInventory();
}

// Initial update
updateDashboard();
updateCropManagement();
updateInventory();

// Simulated real-time updates
setInterval(updateDashboard, 5000);