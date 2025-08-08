function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thanks for reaching out, Neeraj will get back to you soon!");
});

const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      ${task.text}
      <div class="task-buttons">
        <button onclick="toggleTask(${index})">✔️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addTask(text) {
  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text !== "") {
    addTask(text);
    taskInput.value = "";
  }
});

renderTasks();

const products = [
  { name: "Laptop", category: "electronics", price: 75000, rating: 4.0 },
  { name: "T-Shirt", category: "clothing", price: 500, rating: 2.5 },
  { name: "Smartphone", category: "electronics", price: 30000, rating: 4.5 },
  { name: "Monsoon Memories", category: "books", price: 350, rating: 3.5 },
  { name: "Jeans", category: "clothing", price: 1200, rating: 4.0 },
  { name: "Headphones", category: "electronics", price: 2500, rating: 4.5 },
  { name: "Who Will Cry When You Die", category: "books", price: 200, rating: 3.0 },
  { name: "Hoodie", category: "clothing", price: 2000, rating: 4.5 },
  { name: "It Ends With Us", category: "books", price: 175, rating: 5.0 },
  { name: "Lower", category: "clothing", price: 300, rating: 3. },
  { name: "Smartwatch", category: "electronics", price: 3000, rating: 4.0 },
  { name: "Atomic Habits", category: "books", price: 400, rating: 4.5},
  { name: "Sneakers", category: "clothing", price: 3500, rating: 4.0 },
  { name: "Washing Machine", category: "electronics", price: 35000, rating: 4.0},
  { name: "The Alchemist", category: "books", price: 600, rating: 3.0},
  { name: "Refrigerator", category: "electronics", price: 30000, rating: 5.0},
  { name: "Rich Dad Poor Dad", category: "books", price:100, rating:3.5},
  { name: "Jacket", category: "clothing", price:600, rating: 2.0},
  { name: "Air Conditioner", category: "electronics", price: 45000, rating: 3.5},
  {name: "Indian Polity", category: "books", price:285, rating:2.0}
];

const productList = document.getElementById("product-list");
const categoryFilter = document.getElementById("category-filter");
const sortOptions = document.getElementById("sort-options");

function renderProducts(filteredProducts) {
  productList.innerHTML = "";

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: ₹${product.price}</p>
      <p>Rating: ⭐ ${product.rating}</p>
    `;
    productList.appendChild(card);
  });
}

function applyFilters() {
  const selectedCategory = categoryFilter.value;
  const selectedSort = sortOptions.value;

  let filtered = selectedCategory === "all"
    ? [...products]
    : products.filter(p => p.category === selectedCategory);

  switch (selectedSort) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "name-asc":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  renderProducts(filtered);
}

categoryFilter.addEventListener("change", applyFilters);
sortOptions.addEventListener("change", applyFilters);
renderProducts(products);