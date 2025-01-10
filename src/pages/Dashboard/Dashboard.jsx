import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { productPagination, productCount } from "../../apis/Api";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const limit = 10; // Number of products per page

  useEffect(() => {
    fetchProductCount();
    fetchProducts(page, searchQuery, sortOrder);
  }, [page, searchQuery, sortOrder]);

  const fetchProducts = (page, searchQuery, sortOrder) => {
    productPagination(page, limit, searchQuery, sortOrder)
      .then((res) => {
        setProducts(res.data.products); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchProductCount = () => {
    productCount()
      .then((res) => {
        setTotalPages(Math.ceil(res.data.productCount / limit));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePagination = (pageNum) => {
    setPage(pageNum);
  };

  const handleSearch = () => {
    setPage(1);
    fetchProducts(1, searchQuery, sortOrder);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setPage(1);
    fetchProducts(1, searchQuery, order);
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      {/* Carousel */}
      <div id="carouselExampleCaptions" className="carousel slide mt-4" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://cdn.shopify.com/s/files/1/0507/2096/4799/files/69538118_1155314721525528_580174988481396736_o_e27c6c1b-1157-48f4-9a58-62d088f9692d.jpg?v=1617184893" className="d-block w-100" alt="Appliance 1" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Big Sale on Appliances</h5>
              <p>Don't miss out on our special discounts.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://d1pjg4o0tbonat.cloudfront.net/content/dam/midea-aem/gulf/kv3.jpg/jcr:content/renditions/cq5dam.web.5000.5000.jpeg" className="d-block w-100" alt="Appliance 2" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Best Prices Guaranteed</h5>
              <p>Get the best deals on top appliances.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://png.pngtree.com/background/20210711/original/pngtree-taobao-e-commerce-appliances-promotion-poster-banner-picture-image_1084957.jpg" className="d-block w-100" alt="Appliance 3" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Top Quality Appliances</h5>
              <p>Shop now for the latest and greatest in home appliances.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-container mt-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
        />
        <button onClick={handleSearch} className="btn btn-primary mt-2">Search</button>
      </div>

      {/* Product Cards */}
      <h2 className="mt-4 text-primary">Available Products</h2>
      <div className="row row-cols-1 row-cols-md-5 g-3">
        {products.map((singleProduct) => (
          <div className="col" key={singleProduct._id}> {/* Ensure the key is unique */}
            <ProductCard productInformation={singleProduct} color={'green'} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-container mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePagination(1)}>First</button>
            </li>
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePagination(page - 1)}>Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePagination(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePagination(page + 1)}>Next</button>
            </li>
            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePagination(totalPages)}>Last</button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sort Buttons */}
      <div className="sort-container mt-4">
        <button onClick={() => handleSort('asc')} className={`btn btn-outline-primary ${sortOrder === 'asc' ? 'active' : ''}`}>Price: Low to High</button>
        <button onClick={() => handleSort('desc')} className={`btn btn-outline-primary ${sortOrder === 'desc' ? 'active' : ''}`}>Price: High to Low</button>
      </div>
      <Footer/>
    </div>
  );
};

export default Dashboard;
