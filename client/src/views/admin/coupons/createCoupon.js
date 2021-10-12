import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { createCoupon, getCoupons } from "../../../api/coupon";

const initialState = {
  name: "",
  code: "",
};

const CreateCoupon = () => {
  const [coupon, setCoupon] = useState(initialState);
  const [allCoupons, setAllCoupons] = useState([]);

  useEffect(() => {
    handleFetchCoupons();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, code } = coupon;
    createCoupon(name, code)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle fetch all coupons
  const handleFetchCoupons = () => {
    getCoupons()
      .then((res) => {
        setAllCoupons(res.data.coupons);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle coupon update
  const handleCouponUpdate = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Create Coupon</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => handleChange(e)}
            value={coupon.name}
            autoFocus
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Discount %</label>
          <input
            type="text"
            className="form-control"
            value={coupon.code}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <button className="btn btn-outline-primary">Save</button>
      </form>

      {allCoupons.map((coupon) => (
        <div key={coupon._id}>
          <h3>{coupon.name}</h3>
          <p>{coupon.code}</p>
          // Edit coupon form and button
          <Button variant="contained" color="primary" onClick={() => {}}>
            Edit
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CreateCoupon;
