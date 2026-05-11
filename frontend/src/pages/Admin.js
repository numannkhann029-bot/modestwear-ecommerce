import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("abaya");

  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
  };

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:5000/api/products");
    setProducts(data);
  };

  // TEMP ORDERS
  const fetchOrders = () => {
    setOrders([
      { id: 1, user: "Ali", total: 1200, date: "2026-03-20" },
      { id: 2, user: "Sara", total: 2200, date: "2026-03-21" },
      { id: 3, user: "John", total: 900, date: "2026-03-21" },
    ]);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setImage(editingProduct.image);
      setDescription(editingProduct.description);
      setCategory(editingProduct.category || "abaya");
    }
  }, [editingProduct]);

  // ADD / UPDATE
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!user?.isAdmin) return alert("Only admin ❌");

      const productData = {
        name,
        price: Number(price),
        image,
        description,
        category,
      };

      if (editingProduct) {
        await axios.put(
          `http://localhost:5000/api/products/${editingProduct._id}`,
          productData,
          config
        );
        setEditingProduct(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          productData,
          config
        );
      }

      setName("");
      setPrice("");
      setImage("");
      setDescription("");
      setCategory("abaya");

      fetchProducts();
    } catch {
      alert("Error ❌");
    }
  };

  // DELETE
  const deleteHandler = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/products/${id}`,
      config
    );
    fetchProducts();
  };

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div style={styles.wrapper}>
      
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Admin</h2>
        <p style={styles.menu}>Dashboard</p>
        <p style={styles.menu}>Products</p>
        <p style={styles.menu}>Orders</p>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        <h2 style={styles.title}>Dashboard</h2>

        {/* STATS */}
        <div style={styles.stats}>
          <div style={styles.cardBlue}>
            <h2>{products.length}</h2>
            <p>Products</p>
          </div>

          <div style={styles.cardGreen}>
            <h2>{orders.length}</h2>
            <p>Orders</p>
          </div>

          <div style={styles.cardOrange}>
            <h2>₹{totalRevenue}</h2>
            <p>Revenue</p>
          </div>
        </div>

        {/* FORM */}
        <div style={styles.section}>
          <h3>Add / Edit Product</h3>

          <form onSubmit={submitHandler} style={styles.form}>
            <input style={styles.input} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input style={styles.input} placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input style={styles.input} placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
            <input style={styles.input} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <select style={styles.input} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="abaya">Watches</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
            </select>

            <button style={styles.addBtn}>
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>

        {/* PRODUCTS */}
        <div style={styles.section}>
          <h3>Products</h3>

          <div style={styles.grid}>
            {products.map((p) => (
              <div key={p._id} style={styles.productCard}>
                <img src={p.image} alt="" style={styles.img} />
                <h4>{p.name}</h4>
                <p>₹{p.price}</p>

                <div style={styles.btnRow}>
                  <button onClick={() => setEditingProduct(p)} style={styles.edit}>
                    Edit
                  </button>
                  <button onClick={() => deleteHandler(p._id)} style={styles.delete}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ORDERS TABLE */}
        <div style={styles.section}>
          <h3>Orders</h3>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.user}</td>
                    <td>₹{o.total}</td>
                    <td>{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Admin;

/* 🎨 STYLES */
const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "Arial",
  },

  sidebar: {
    width: "220px",
    background: "#1e293b",
    color: "#fff",
    padding: "20px",
  },

  logo: {
    marginBottom: "30px",
  },

  menu: {
    margin: "10px 0",
    cursor: "pointer",
    opacity: 0.8,
  },

  main: {
    flex: 1,
    padding: "30px",
  },

  title: {
    marginBottom: "20px",
  },

  stats: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },

  cardBlue: {
    flex: 1,
    background: "#dbeafe",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },

  cardGreen: {
    flex: 1,
    background: "#dcfce7",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },

  cardOrange: {
    flex: 1,
    background: "#ffedd5",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },

  section: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },

  addBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
  },

  productCard: {
    background: "#fff",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #eee",
  },

  img: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  btnRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  edit: {
    flex: 1,
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "6px",
    borderRadius: "5px",
  },

  delete: {
    flex: 1,
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px",
    borderRadius: "5px",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
  },

};