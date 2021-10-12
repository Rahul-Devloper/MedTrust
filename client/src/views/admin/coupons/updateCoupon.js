import React from "react";

const updateCoupon = () => {
  return (
    <div>
      <h1>Create Coupon</h1>
      <form onSubmit={handleUpdate}>
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
    </div>
  );
};

export default updateCoupon;
