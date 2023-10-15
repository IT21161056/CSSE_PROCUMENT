const Order = require("../models/Order.model");
const Site = require("../models/Site.model");
const Supplier = require("../models/Supplier.model");

//Get Placed Orders For Each Supplier
const getPlacedOrdersForEachSupplier = async (req, res) => {
  try {
    const orderList = await Order.find({ supplierID: req.params.id });

    if (!orderList) {
      return res.send("No orders at this time!");
    }
    res.json(orderList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Order List By Order Id
const getOrderProductListByOrderId = async (req, res) => {
  const { itemName } = req.body;
  const userList = await Order.find({});
  try {
    const orderList = await Order.findById(req.params.orderid)
      .select("productList")
      .populate({
        path: "productList",
        populate: {
          path: "product",
        },
      });
    res.json(orderList.productList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Order List By Site Id
const getOrderListBySiteId = async (req, res) => {
  try {
    const orderList = await Order.find({
      site: req.params.siteid,
      isDraft: false,
    })
      .populate({
        path: "productList",
        populate: {
          path: "product",
        },
      })
      .populate({
        path: "site",
      })
      .populate({
        path: "supplier",
      });
    res.json(orderList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Order List By Site Id
const getDraftOrderListBySiteId = async (req, res) => {
  try {
    const orderList = await Order.find({
      site: req.params.siteid,
      isDraft: true,
    })
      .populate({
        path: "productList",
        populate: {
          path: "product",
        },
      })
      .populate({
        path: "site",
      })
      .populate({
        path: "supplier",
      });
    res.json(orderList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Delivery List By Site Id
const getDeliveryListByOrderId = async (req, res) => {
  try {
    const orderList = await Order.findById(req.params.orderid).populate({
      path: "deliveryList",
      populate: {
        path: "productList",
        populate: {
          path: "product",
        },
      },
    });
    res.json(orderList.deliveryList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Order details
const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("site");
    if (!order) {
      return res.send("No order found!");
    }
    res.json(order);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Order List
const getOrderList = async (req, res) => {
  try {
    const orderList = await Order.find().populate("site");

    if (!orderList) {
      return res.send("No orders!");
    }
    res.json(orderList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//approve or disapprove Order by Manager
const approvedOrDisapprovedOrderByManager = async (req, res) => {
  const { approvalStatus } = req.body;
  let status = "pending";

  if (approvalStatus) {
    status = "requisition";
  }

  try {
    await Order.findByIdAndUpdate(req.params.orderid).then((existingOrder) => {
      existingOrder.approvalStatus = approvalStatus;
      existingOrder.status = status;
      existingOrder.save().then((updatedOrder) => {
        res.json(updatedOrder);
      });
    });
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//Place Order by Procurement Officer
const placedOrderByProcurementOfficer = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.orderid).then((existingOrder) => {
      existingOrder.status = "placed";
      existingOrder.save().then((updatedOrder) => {
        res.json(updatedOrder);
      });
    });
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//Accepted Order by suppiler
const acceptOrderBySuppiler = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.orderid).then((existingOrder) => {
      existingOrder.status = "accepted";
      existingOrder.save().then((updatedOrder) => {
        res.json(updatedOrder);
      });
    });
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//Unaccepted Order by suppiler
const unacceptOrderBySuppiler = async (req, res) => {
  const { comment } = req.body;
  try {
    await Order.findByIdAndUpdate(req.params.orderid).then((existingOrder) => {
      existingOrder.status = "unaccepted";
      existingOrder.comment = comment;
      existingOrder.save().then((updatedOrder) => {
        res.json(updatedOrder);
      });
    });
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//add Order by Site Manager
const addOrderBySiteManager = async (req, res) => {
  const { placedDate, requiredDate, productList, totalPrice } = req.body;
  const isDraft = true;
  const approvalStatus = false;
  const isRestricted = false;
  const status = "waiting";
  const site = await Site.findById(req.params.id);

  if (!site) return res.send("Some Data fields are not found!");

  try {
    const order = new Order({
      isDraft,
      placedDate,
      requiredDate,
      approvalStatus,
      isRestricted,
      productList,
      status,
      totalPrice,
      site: req.params.id,
    });

    const newOrder = await order.save();

    site.orderList.unshift(newOrder._id);

    for (let i = 0; i < productList.length; i++) {
      await Supplier.findByIdAndUpdate({
        _id: productList[i].supplier,
      }).then((sup) => {
        sup.orderList.unshift({
          product: productList[i].product,
          site: site._id,
          quantity: productList[i].qnty,
          requiredDate: requiredDate,
          orderRef: newOrder._id,
          supplierName: productList[i].supplierName,
        });
        sup.save();
      });
    }

    res.json({ message: "successful!" });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

//Confirm Order by Site Manager
const comfirmOrderBySiteManager = async (req, res) => {
  try {
    let totalOrderPrice = 0;
    let restrictedStatus = false;
    let approvalStatus = true;
    let status = "requisition";

    await Order.findById(req.params.orderid).then((orderObject) => {
      orderObject.productList.map((singleOrderProduct) => {
        OrderProduct.findById(singleOrderProduct._id).then((orderProduct) => {
          totalOrderPrice = totalOrderPrice + orderProduct.opPrice;

          Product.findById(orderProduct.product._id).then((product) => {
            if (product.isRestricted) {
              restrictedStatus = true;
              status = "pending";
            }
          });
        });
      });
    });

    await Order.findByIdAndUpdate(req.params.orderid).then((existingOrder) => {
      if (totalOrderPrice > 100000 || restrictedStatus) {
        approvalStatus = false;
        status = "pending";
      }

      existingOrder.approvalStatus = approvalStatus;
      existingOrder.totalPrice = totalOrderPrice;
      existingOrder.status = status;
      existingOrder.isDraft = false;
      existingOrder.save().then((updatedOrder) => {
        res.json(updatedOrder);
      });
    });
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//Update product price in Order by Supplier
const updateProductPriceInOrderBySupplier = async (req, res) => {
  const { newPrice } = req.body;
  try {
    await OrderProduct.findByIdAndUpdate(req.params.orderproductid).then(
      (existingOrderProduct) => {
        existingOrderProduct.opPrice = newPrice * existingOrderProduct.qty;
        existingOrderProduct.save();
      }
    );

    await Order.findByIdAndUpdate(req.params.orderid).then(
      async (existingOrder) => {
        let newTotalPrice = 0;
        existingOrder.productList.forEach((singleOrderProduct) => {
          OrderProduct.findById(singleOrderProduct._id).then((orderProduct) => {
            newTotalPrice = newTotalPrice + orderProduct.opPrice;
            existingOrder.totalPrice = newTotalPrice;
          });
        });
        await existingOrder.save().then((updatedOrder) => {
          res.json(updatedOrder);
        });
      }
    );
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//Closed Order after delivery completed by site manager
const closeOrderAfterDeliveryCompletedBySiteManager = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.orderid).then(
      async (existingOrder) => {
        existingOrder.status = "completed";
        await existingOrder.save().then((updatedOrder) => {
          res.json(updatedOrder);
        });
      }
    );
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  getPlacedOrdersForEachSupplier,
  getOrderDetails,
  getOrderList,
  addOrderBySiteManager,
  comfirmOrderBySiteManager,
  approvedOrDisapprovedOrderByManager,
  placedOrderByProcurementOfficer,
  acceptOrderBySuppiler,
  unacceptOrderBySuppiler,
  updateProductPriceInOrderBySupplier,
  closeOrderAfterDeliveryCompletedBySiteManager,
  getOrderListBySiteId,
  getOrderProductListByOrderId,
  getDeliveryListByOrderId,
  getDraftOrderListBySiteId,
};
